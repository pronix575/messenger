const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const shortid = require('shortid')

const { 
    
        ALREADY_EXIST, 
        INVALID_DATA, 
        SOMETHING_WRONG, 
        CREATED, 
        INPUT_CORRECT_EMAIL, 
        INPUT_PASSWORD, 
        UNCORRECT_DATA, 
        UNCORRECT_PASSWORD,
        NOT_FOUND
    
    } = require('../event types/types')


// /api/auth/register
router.post(
  '/register',
  [
    check('name', 'Minimum name length 6 characters')
      .isLength({ min: 3 }),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimum password length 6 characters')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration',
                type: INVALID_DATA
            })
        }

        const {email, password, name} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'This user already exists', type: ALREADY_EXIST })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const code = shortid.generate()

        const user = new User({ name, email, password: hashedPassword, shortid: code })

        await user.save()

        res.status(201).json({ message: 'User created', type: CREATED })

        } catch (e) {

            console.warn(e)
            res.status(500).json({ message: 'Something wrong, try again later', SOMETHING_WRONG })
        }
    }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', INPUT_CORRECT_EMAIL).normalizeEmail().isEmail(),
    check('password', INPUT_PASSWORD).exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data at login',
          type: UNCORRECT_DATA
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'User is not found', type: NOT_FOUND })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password, try again', type: UNCORRECT_PASSWORD })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id, shortid: user.shortid, name: user.name, email: user.email })

    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again later', SOMETHING_WRONG })
    }
  }
)


module.exports = router