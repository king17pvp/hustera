const homepageModel = require('../models/homepageModel');

exports.fetchCategories = async () => {
  try {
    // Get raw categories data from the model
    const categoriesData = await homepageModel.fetchCategories();
    
    // Map database results to expected format with icons
    const categoryIcons = {
      'art-&-creativity': 'icons/art_design.png',
      'computer-science': 'icons/development.png',
      'communication': 'icons/communication.png',
      'media-studies': 'icons/videography.png',
      'sociology': 'icons/photography.png',
      'marketing': 'icons/marketing.png',
      'linguistic': 'icons/contentwriting.png',
      'finance': 'icons/finance.png',
      'physics': 'icons/science.png',
      'graphic-design': 'icons/network.png'
    };

    // Filter to only include supported categories (those with icons)
    const filteredCategories = categoriesData.filter(row => 
      Object.keys(categoryIcons).includes(row.category)
    );

    // Transform database results to match expected format
    const categories = filteredCategories.map(row => {
      return {
        iconPath: categoryIcons[row.category],
        title: row.category,
        courseCount: row.courseCount || 0
      };
    });

    // Ensure all icons categories are represented (even if no courses exist for them)
    Object.keys(categoryIcons).forEach(category => {
      const exists = categories.some(item => item.title === category);
      if (!exists) {
        categories.push({
          iconPath: categoryIcons[category],
          title: category,
          courseCount: 0
        });
      }
    });

    return categories;
  } catch (error) {
    console.error('Service error fetching categories:', error);
    throw error; // Re-throw for controller to handle
  }
};

exports.fetchCourses = async () => {
  try {
    const popularCoursesData = await homepageModel.fetchCourses();
    
    // Transform database results to match expected format
    const popularCourses = popularCoursesData.map(course => {
      return {
        courseId: course.courseID,
        thumbnail: course.thumbnail,
        thumbnailUrl: course.thumbnailUrl,
        category: course.category,
        title: course.title,
        author: course.instructor,
        duration: course.duration,
        students: course.studentCount || 0,
        price: course.price,
        level: course.level,
        description: course.summary
      };
    });
    
    return popularCourses;
  } catch (error) {
    console.error('Service error fetching popular courses:', error);
    throw error; // Re-throw for controller to handle
  }
};

exports.fetchThreads = async () => {
  try {
    const popularThreads = await homepageModel.fetchThreads();
    return popularThreads;
  } catch (error) {
    console.error('Service error fetching popular threads:', error);
    throw error; // Re-throw for controller to handle
  }
};
