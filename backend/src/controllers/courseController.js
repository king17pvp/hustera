const courseService = require("../services/courseService");

// Get all courses with optional filtering and search
exports.getCourses = async (req, res) => {
    try {
        const { category, instructor, level, price, page, limit } = req.query;
        const results = await courseService.getCourses({
            category,
            instructor,
            level,
            price,
            page,
            limit,
        });
        res.json({
            success: true,
            courses: results.courses,
            totalPages: results.totalPages,
        });
    } catch (error) {
        console.error("Error in course controller:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get filter options
exports.getFilters = async (req, res) => {
    try {
        const filters = await courseService.getFilters();
        res.json({ success: true, ...filters });
    } catch (error) {
        console.error("Error in getting filters:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const courseData = req.body;
        
        // Debug logs
        console.log("🟢 Create Course Request:");
        console.log("User from token:", JSON.stringify(req.user, null, 2));
        console.log("Course Data:", JSON.stringify(courseData, null, 2));
        
        // Basic validation
        if (!courseData.title || !courseData.description || !courseData.category || 
            !courseData.price || !courseData.duration || !courseData.level) {
            return res.status(400).json({
                success: false,
                message: "Missing required course fields"
            });
        }

        // IMPORTANT: Check user object format and adjust if needed
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        
        // Extract user_ID from token payload, supporting multiple formats
        let instructorId = null;
        if (req.user.user_ID) {
            instructorId = req.user.user_ID;
        } else if (req.user.id) {
            instructorId = req.user.id;
        } else if (req.user.userId) {
            instructorId = req.user.userId;
        } else {
            // If no ID is found, generate an error with details
            console.error("❌ No user ID found in token. Token payload:", req.user);
            return res.status(401).json({
                success: false,
                message: "User ID not found in authentication token"
            });
        }
        
        courseData.instructor_ID = instructorId;
        console.log("🟢 Assigned instructor_ID:", courseData.instructor_ID);

        const courseId = await courseService.createCourse(courseData);
        console.log("🟢 Course created with ID:", courseId);
        
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            courseId
        });
    } catch (error) {
        console.error("❌ Error in creating course:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await courseService.getCourseById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.json({ success: true, course });
    } catch (error) {
        console.error("Error in getting course by id:", error);
        // Return a more user-friendly error
        res.status(500).json({ 
            success: false, 
            message: "Unable to retrieve course details. Please try again later." 
        });
    }
};

exports.createLecture = async (req, res) => {
  try {
    const { weekId, title, content, orderIndex } = req.body;
    
    if (!weekId || !title || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for lecture"
      });
    }

    const lectureId = await courseService.createLecture(
      weekId, 
      title, 
      content,
      orderIndex || 1
    );
    
    res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lectureId
    });
  } catch (error) {
    console.error("Error creating lecture:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLectureById = async (req, res) => {
  try {
    const lectureId = req.params.id;
    const lecture = await courseService.getLectureById(lectureId);
    
    if (!lecture) {
      return res.status(404).json({ success: false, message: "Lecture not found" });
    }
    
    res.json({ success: true, lecture });
  } catch (error) {
    console.error("Error getting lecture:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const { rating, review } = req.body;
    const reviewerId = req.user.user_ID;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Valid rating between 1 and 5 is required"
      });
    }

    const result = await courseService.addReview({
      courseId,
      reviewerId,
      rating,
      review
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      stats: result.stats,
      averageRating: result.averageRating
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const result = await courseService.getCourseReviews(courseId);
    
    res.json({ 
      success: true, 
      reviews: result.reviews, 
      stats: result.stats,
      averageRating: result.averageRating 
    });
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
