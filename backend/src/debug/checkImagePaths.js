const db = require("../config/db");
const fs = require('fs');
const path = require('path');

async function checkImagePaths() {
  try {
    console.log('Checking database image records...');
    const [images] = await db.query('SELECT image_ID, image_path, image_type FROM images');
    
    console.log(`Found ${images.length} image records in the database`);
    
    const publicDir = path.join(__dirname, '../../public');
    console.log(`Public directory: ${publicDir}`);
    
    if (!fs.existsSync(publicDir)) {
      console.log('ERROR: Public directory does not exist! Creating it...');
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const imagesDir = path.join(publicDir, 'images');
    console.log(`Images directory: ${imagesDir}`);
    
    if (!fs.existsSync(imagesDir)) {
      console.log('ERROR: Images directory does not exist! Creating it...');
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Create a default image if none exists
    const defaultImagePath = path.join(imagesDir, 'default-course-thumbnail.jpg');
    if (!fs.existsSync(defaultImagePath)) {
      console.log('Creating a default image file...');
      
      // Download a simple image from a URL
      const https = require('https');
      const file = fs.createWriteStream(defaultImagePath);
      
      https.get('https://via.placeholder.com/800x500.jpg?text=Default+Course+Thumbnail', function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close();
          console.log('Default image created successfully');
        });
      }).on('error', function(err) {
        fs.unlink(defaultImagePath);
        console.error('Error downloading default image:', err.message);
      });
    }
    
    // Check each image path in the database
    images.forEach(image => {
      console.log(`Checking image ID ${image.image_ID}: ${image.image_path}`);
      
      // Extract the filename from the path
      let imagePath = image.image_path;
      if (imagePath.startsWith('/public/')) {
        imagePath = imagePath.substring(8); // Remove /public/ prefix
      } else if (imagePath.startsWith('/')) {
        imagePath = imagePath.substring(1); // Remove leading slash
      }
      
      const fullPath = path.join(publicDir, imagePath);
      
      if (fs.existsSync(fullPath)) {
        console.log(`✓ Image file exists: ${fullPath}`);
      } else {
        console.log(`✗ Image file MISSING: ${fullPath}`);
      }
    });
    
    console.log('\nImportant paths to check:');
    console.log('- Backend server.js looks for static files in:', publicDir);
    console.log('- Database expects image paths relative to the backend root or with /public/ prefix');
    console.log('- Frontend appends http://localhost:5000 to the image paths from the database');
    
  } catch (error) {
    console.error('Error checking image paths:', error);
  }
}

// Run the function
checkImagePaths();
