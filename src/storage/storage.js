const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'files/',
    
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
  

module.exports = storage