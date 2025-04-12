const db = require("../config/db");

exports.getCourses = async ({ category, instructor, level, price, page = 1, limit = 10 }) => {
  let baseQuery = `
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    LEFT JOIN images img ON c.thumbnail_ID = img.image_ID
    WHERE 1=1
  `;
  const queryParams = [];

  if (category) {
    baseQuery += " AND c.category = ?";
    queryParams.push(category);
  }

  if (instructor) {
    baseQuery += " AND ui.name = ?";
    queryParams.push(instructor);
  }

  if (level) {
    baseQuery += " AND c.level = ?";
    queryParams.push(level);
  }

  if (price) {
    if (price === "under30") {
      baseQuery += " AND c.price < 30";
    } else if (price === "30to50") {
      baseQuery += " AND c.price BETWEEN 30 AND 50";
    } else if (price === "above50") {
      baseQuery += " AND c.price > 50";
    }
  }

  const coursesQuery = `
    SELECT 
      c.course_ID AS courseID,
      c.title,
      c.category,
      c.description AS summary,
      CONCAT(c.duration, ' weeks') AS duration,
      c.level,
      c.price,
      CASE 
        WHEN img.image_path IS NULL THEN '/images/default-course-thumbnail.jpg'
        WHEN img.image_path LIKE '/public/%' THEN SUBSTRING(img.image_path, 8) 
        WHEN img.image_path LIKE '/%' THEN SUBSTRING(img.image_path, 2)
        ELSE img.image_path
      END AS thumbnailUrl,
      ui.name AS instructor,
      FLOOR(RAND() * 100 + 50) as students,
      20 AS lessons
    ${baseQuery}
    ORDER BY c.course_ID DESC
    LIMIT ? OFFSET ?
  `;
  const coursesQueryParams = [...queryParams, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)];
  const [courses] = await db.query(coursesQuery, coursesQueryParams);

  const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
  const [countResult] = await db.query(countQuery, queryParams);
  const total = countResult[0].total;

  return {
    courses,
    totalPages: Math.ceil(total / limit),
  };
};

exports.getFilters = async () => {
  const [categories] = await db.query(`
    SELECT category, COUNT(*) AS count
    FROM courses
    GROUP BY category
    ORDER BY count DESC
  `);

  const [instructors] = await db.query(`
    SELECT ui.name AS instructor, COUNT(*) AS count
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    GROUP BY ui.name
    ORDER BY count DESC
  `);

  return { categories, instructors };
};

// Sửa hàm ensureDefaultImage để đảm bảo đường dẫn ảnh nhất quán
async function ensureDefaultImage() {
  const [existingImage] = await db.query('SELECT image_ID FROM images WHERE image_ID = 1');
  if (!existingImage || existingImage.length === 0) {
    await db.query(
      'INSERT INTO images (image_ID, image_path, image_type) VALUES (?, ?, ?)',
      [1, '/images/default-course-thumbnail.jpg', 'thumbnail']
    );
  }
  return 1; // Return the default image ID
}

exports.createCourse = async (courseData) => {
  const {
    instructor_ID,
    title,
    description,
    category,
    price,
    duration,
    level,
    weeks = []
  } = courseData;

  // Ensure we have a default image and get its ID
  const thumbnail_ID = await ensureDefaultImage();

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Insert course with the default thumbnail
    const [courseResult] = await connection.execute(
      'INSERT INTO courses (instructor_ID, title, description, category, thumbnail_ID, price, duration, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [instructor_ID, title, description, category, thumbnail_ID, price, duration, level]
    );
    const courseId = courseResult.insertId;

    // Insert weeks and videos if provided
    for (const [weekIndex, week] of weeks.entries()) {
      const [weekResult] = await connection.execute(
        'INSERT INTO weeks (course_ID, week_number, title) VALUES (?, ?, ?)',
        [courseId, weekIndex + 1, week.title]
      );
      const weekId = weekResult.insertId;

      if (week.videos && week.videos.length > 0) {
        for (const [videoIndex, video] of week.videos.entries()) {
          try {
            // Check if the videos table has resource_type and order_index columns
            const [columns] = await connection.query(`
              SELECT COUNT(*) as count FROM information_schema.columns 
              WHERE table_name = 'videos' AND column_name = 'resource_type' AND table_schema = DATABASE()
            `);
            
            if (columns[0].count > 0) {
              await connection.execute(
                'INSERT INTO videos (week_ID, title, url, resource_type, order_index) VALUES (?, ?, ?, ?, ?)',
                [weekId, video.title, video.url, 'video', videoIndex + 1]
              );
            } else {
              await connection.execute(
                'INSERT INTO videos (week_ID, title, url) VALUES (?, ?, ?)',
                [weekId, video.title, video.url]
              );
            }
          } catch (error) {
            console.error("Error inserting video:", error);
            // Fallback to simpler query if the first one fails
            await connection.execute(
              'INSERT INTO videos (week_ID, title, url) VALUES (?, ?, ?)',
              [weekId, video.title, video.url]
            );
          }
        }
      }
    }

    await connection.commit();
    connection.release();
    return courseId;
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
};

exports.getCourseById = async (courseId) => {
  const query = `
      SELECT 
          c.course_ID AS courseID,
          c.title,
          c.description,
          c.category,
          c.price,
          c.duration,
          c.level,
          CASE 
            WHEN img.image_path IS NULL THEN '/images/default-course-thumbnail.jpg'
            WHEN img.image_path LIKE '/public/%' THEN SUBSTRING(img.image_path, 8) 
            WHEN img.image_path LIKE '/%' THEN SUBSTRING(img.image_path, 2)
            ELSE img.image_path
          END AS thumbnailUrl,
          ui.name AS author,
          FLOOR(RAND() * 100 + 50) as students,
          20 as lessons,
          5 as quizzes
      FROM courses c
      JOIN user_auth ua ON c.instructor_ID = ua.user_ID
      JOIN user_info ui ON ua.user_ID = ui.user_ID
      LEFT JOIN images img ON c.thumbnail_ID = img.image_ID
      WHERE c.course_ID = ?
  `;

  const [courseDetails] = await db.query(query, [courseId]);
  if (!courseDetails.length) return null;

  // Get course weeks, videos, and lectures
  const resourcesQuery = `
      SELECT 
          w.week_ID, 
          w.title as week_title, 
          w.week_number,
          'video' as type,
          v.video_ID as resource_id,
          v.title as resource_title, 
          v.url,
          NULL as content,
          COALESCE(v.order_index, 0) as order_index
      FROM weeks w
      LEFT JOIN videos v ON v.week_ID = w.week_ID
      WHERE w.course_ID = ? AND v.video_ID IS NOT NULL
      
      UNION ALL
      
      SELECT 
          w.week_ID, 
          w.title as week_title, 
          w.week_number,
          'text' as type,
          l.lecture_ID as resource_id,
          l.title as resource_title, 
          NULL as url,
          l.content,
          l.order_index
      FROM weeks w
      JOIN lectures l ON l.week_ID = w.week_ID
      WHERE w.course_ID = ?
      
      ORDER BY week_number, order_index
  `;
  
  const [resources] = await db.query(resourcesQuery, [courseId, courseId]);
  console.log("Resources fetched:", resources); // Debugging

  // Transform weeks data
  const curriculum = [];
  let currentWeek = null;

  resources.forEach(row => {
    // If this is a new week or the first row
    if (!currentWeek || currentWeek.week_ID !== row.week_ID) {
      currentWeek = {
        week_ID: row.week_ID,
        title: row.week_title,
        week_number: row.week_number,
        resources: []
      };
      curriculum.push(currentWeek);
    }

    // Add resource if it exists
    if (row.resource_title) {
      currentWeek.resources.push({
        id: row.resource_id,
        title: row.resource_title,
        type: row.type,
        url: row.url,
        content: row.content,
        isLocked: false // Default to unlocked
      });
    }
  });

  return {
    ...courseDetails[0],
    tabs: {
      Overview: courseDetails[0].description,
      Curriculum: curriculum,
      Reviews: [], // You can implement reviews later
      Instructor: {
        name: courseDetails[0].author,
        bio: "Instructor bio", // You can add this to your database later
        totalStudents: courseDetails[0].students,
        totalCourses: 1, // You can get this from database later
        iconUrl: "", // You can add instructor avatar later
        socials: {
          facebook: "https://facebook.com/",
          pinterest: "https://pinterest.com/",
          twitter: "https://twitter.com/",
          instagram: "https://instagram.com/",
          youtube: "https://youtube.com/"
        } // Added default social links
      }
    }
  };
};

// Thêm hàm để tạo bài giảng dạng văn bản
exports.createLecture = async (weekId, title, content, orderIndex) => {
  const [result] = await db.query(
    'INSERT INTO lectures (week_ID, title, content, order_index) VALUES (?, ?, ?, ?)',
    [weekId, title, content, orderIndex]
  );
  return result.insertId;
};

// Thêm hàm để lấy nội dung bài giảng văn bản theo ID
exports.getLectureById = async (lectureId) => {
  const [lectures] = await db.query(
    'SELECT lecture_ID, week_ID, title, content FROM lectures WHERE lecture_ID = ?',
    [lectureId]
  );
  return lectures.length > 0 ? lectures[0] : null;
};

exports.addReview = async ({ courseId, reviewerId, rating, review }) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Add the review
    await connection.execute(
      'INSERT INTO course_reviews (course_ID, reviewer_ID, rating, review) VALUES (?, ?, ?, ?)',
      [courseId, reviewerId, rating, review]
    );

    // Get updated statistics after adding review
    const [stats] = await connection.query(`
      SELECT 
        rating,
        COUNT(*) as count,
        COUNT(*) * 100.0 / (SELECT COUNT(*) FROM course_reviews WHERE course_ID = ?) as percentage
      FROM course_reviews
      WHERE course_ID = ?
      GROUP BY rating
      ORDER BY rating DESC
    `, [courseId, courseId]);

    await connection.commit();

    const avgRating = stats.reduce((acc, curr) => 
      acc + (curr.rating * curr.count), 0) / 
      stats.reduce((acc, curr) => acc + curr.count, 0);

    return { stats, averageRating: avgRating };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.getCourseReviews = async (courseId) => {
  // Get all reviews for the course
  // const [reviews] = await db.query(`
  //   SELECT 
  //     r.*,
  //     ui.name as reviewer_name,
  //   FROM course_reviews r
  //   JOIN user_info ui ON r.reviewer_ID = ui.user_ID
  //   WHERE r.course_ID = ?
  //   ORDER BY r.rated_at DESC
  // `, [courseId]);
  // const [reviews] = await db.query(`
  //   SELECT 
  //     r.* 
  //   FROM course_reviews r
  //   WHERE r.course_ID = ?
  //   ORDER BY r.rated_at DESC
  // `, [courseId]);    

  const [reviews] = await db.query(`
    SELECT 
      r.*, 
      ua.email
    FROM course_reviews r
    JOIN user_auth ua ON r.reviewer_ID = ua.user_ID
    WHERE r.course_ID = ?
    ORDER BY r.rated_at DESC
  `, [courseId]);

  console.log(reviews);
  
  

  // Get rating statistics
  const [ratingStats] = await db.query(`
    SELECT 
      rating,
      COUNT(*) as count,
      COUNT(*) * 100.0 / (SELECT COUNT(*) FROM course_reviews WHERE course_ID = ?) as percentage
    FROM course_reviews
    WHERE course_ID = ?
    GROUP BY rating
    ORDER BY rating DESC
  `, [courseId, courseId]);

  console.log({reviews, ratingStats});
  

  // If no reviews yet, provide default stats
  if (!ratingStats.length) {
    ratingStats = [
      { rating: 5, count: 1, percentage: 20 },
      { rating: 4, count: 1, percentage: 20 },
      { rating: 3, count: 1, percentage: 20 },
      { rating: 2, count: 1, percentage: 20 },
      { rating: 1, count: 1, percentage: 20 }
    ];
  }

  // Calculate average rating
  const avgRating = ratingStats.reduce((acc, curr) => 
    acc + (curr.rating * curr.count), 0) / 
    ratingStats.reduce((acc, curr) => acc + curr.count, 0);

  return { 
    reviews, 
    stats: ratingStats,
    averageRating: avgRating 
  };
};
