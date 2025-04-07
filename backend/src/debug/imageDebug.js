const fs = require('fs');
const path = require('path');

// Function to check if paths exist
function checkPaths() {
  const paths = [
    '../public',
    '../public/images',
  ];
  
  console.log('Checking paths for images:');
  
  paths.forEach(relativePath => {
    const fullPath = path.join(__dirname, relativePath);
    try {
      const stats = fs.statSync(fullPath);
      console.log(`✓ ${fullPath} exists and is a ${stats.isDirectory() ? 'directory' : 'file'}`);
      
      if (stats.isDirectory()) {
        const files = fs.readdirSync(fullPath);
        console.log(`  Contains ${files.length} files/directories:`);
        files.forEach(file => {
          const filePath = path.join(fullPath, file);
          const fileStats = fs.statSync(filePath);
          console.log(`  - ${file} (${fileStats.isDirectory() ? 'directory' : 'file'})`);
        });
      }
    } catch (err) {
      console.error(`✗ ${fullPath} does not exist or is not accessible:`, err.message);
    }
  });
}

checkPaths();
console.log('\nHow to fix image issues:');
console.log('1. Make sure the public/images directory exists in the backend folder');
console.log('2. Ensure there are image files in the directory');
console.log('3. Check that image_path in the database matches actual filenames');
console.log('4. Verify that the server is properly serving static files');

// Export this function so it can be imported and used elsewhere if needed
module.exports = { checkPaths };
