const {Router} = require('express')
const multer = require('multer')
const router = Router()
const auth = require('../middleware/auth.middleware')
const storage = require('../storage/storage')
const User = require('../models/User')

const upload = multer({ storage })

router.post('/avatar', auth, upload.single('avatar'), async (req, res, next) => {

    try {

        const user = await User.findById(req.headers.userid)
        
        user.avatar = req.file.filename
        user.save()
        
        console.log(req.file.filename)
        

    } catch (e) {
        
        console.warn(e)
        res.status(500).json({ message: "server error" })
    }

    const file = req.file;
    const meta = req.body;

    res.status(200).json({ meta, file })
});

module.exports = router