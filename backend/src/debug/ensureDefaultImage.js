const fs = require('fs');
const path = require('path');
const https = require('https');
const db = require("../config/db");

async function ensureDefaultImage() {
  try {
    console.log('Checking for default image in database...');
    // Kiểm tra trong database
    const [existingImage] = await db.query('SELECT image_ID, image_path FROM images WHERE image_ID = 1');
    
    if (!existingImage || existingImage.length === 0) {
      console.log('Default image not found in database, creating it...');
      await db.query(
        'INSERT INTO images (image_ID, image_path, image_type) VALUES (?, ?, ?)',
        [1, '/images/default-course-thumbnail.jpg', 'thumbnail']
      );
      console.log('Default image record created in database');
    } else {
      console.log('Default image found in database:', existingImage[0]);
    }

    // Kiểm tra tệp ảnh vật lý
    const publicDir = path.join(__dirname, '../../public');
    const imagesDir = path.join(publicDir, 'images');
    const defaultImagePath = path.join(imagesDir, 'default-course-thumbnail.jpg');
    
    console.log('Checking directories...');
    // Tạo thư mục nếu cần
    if (!fs.existsSync(publicDir)) {
      console.log(`Creating directory: ${publicDir}`);
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    if (!fs.existsSync(imagesDir)) {
      console.log(`Creating directory: ${imagesDir}`);
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Kiểm tra và tạo tệp ảnh
    if (!fs.existsSync(defaultImagePath)) {
      console.log(`Default image not found at ${defaultImagePath}, creating it...`);
      
      // Tải ảnh từ URL
      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(defaultImagePath);
        https.get('https://via.placeholder.com/800x500.jpg?text=Default+Course+Thumbnail', function(response) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log('Default image downloaded and saved successfully!');
            resolve();
          });
        }).on('error', function(err) {
          fs.unlink(defaultImagePath, () => {});
          console.error('Error downloading default image:', err.message);
          reject(err);
        });
      });
    } else {
      console.log(`Default image exists at path: ${defaultImagePath}`);
    }
    
    console.log('Default image check completed successfully');
    return true;
  } catch (error) {
    console.error('Error ensuring default image:', error);
    return false;
  }
}

// Chạy hàm và thoát
ensureDefaultImage()
  .then(() => {
    console.log('Script completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Script failed:', err);
    process.exit(1);
  });
