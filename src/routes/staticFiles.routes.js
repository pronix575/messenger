const {Router} = require('express')
const multer = require('multer')
const router = Router()

const storage = require('../storage/storage')


const upload = multer({ storage })

router.post('/avatar', upload.single('avatar'), (req, res, next) => {
    const file = req.file;
    const meta = req.body;
    console.log(req.file)
    
    res.status(200).json({ meta, file })
});

module.exports = router