const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'files/',
    
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${ Math.random() * 100000000000000000 + file.originalname}`);
        console.log(file)
    },
});
  

module.exports = storage