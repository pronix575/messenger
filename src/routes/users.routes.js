const { Router } = require('express')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/auth.middleware')
const { DOES_NOT_EXIST, SUCCESS, FAILED } = require("../event types/types")

router.get('/all', auth, async (req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1, shortid: 1, avatar: 1 })

        if (users) {

            const usersDataSet = users

            res.json(usersDataSet)

        } else {
            res.json({ message: "No users", type: DOES_NOT_EXIST })
        }
    
    } catch (e) {

        res.status(500).json({ message: 'server error' })
    }
})

router.get('/id/:shortid', auth, async (req, res) => {
    try {
        const user = await User.findOne({ shortid: req.params.shortid }, { name: 1, email: 1, shortid: 1, avatar: 1 })

        if (user) {

            res.json(user)
        
        } else {
            res.json({ message: "No such user", type: DOES_NOT_EXIST })
        }
    
    } catch (e) {
        console.warn(e)

        res.status(500).json({ message: 'server error' })
    }
})

router.get('/email/:email', auth, async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.params.email }, { name: 1, email: 1, shortid: 1, avatar: 1 })

        if (user) {

            res.json(user)
        
        } else {
            res.json({ message: "No such user", type: DOES_NOT_EXIST })
        }

    } catch (e) {
        console.warn(e)
    }
})

router.get('/name/:name', auth, async (req, res) => {
    try {
        
        const user = await User.find({
            name: {
                "$regex": req.params.name,
                "$options": "i" 
            }
        })

        if (user) {

            res.json(user)
        
        } else {
            res.json({ message: "No such user", type: DOES_NOT_EXIST }, { name: 1, email: 1, shortid: 1, avatar: 1 })
        }

    } catch (e) {
        console.warn(e)

        res.status(500).json({ message: "Server error" })
    }
})


router.post('/create_new_request', auth, async (req, res) => {
    try {

        const from = await User.findOne({ _id: req.user.userId })
        const to = await User.findOne({ shortid: req.body.shortid })

        if (to && from ) { 
            console.log(to.requests.incoming)

            let tr = false
            to.requests.incoming.forEach(req => {
                if (req.toString() === from._id.toString()) {
                    tr = true
                }

            })

            if (tr) {
                return res.json({ message: "Already exist" })
            } else if (req.user.userId == to._id) {
                return res.json({ message: "It is you" })
            } else {

                from.requests.from.push(to._id)
                to.requests.incoming.push(from._id)

                from.save()
                to.save()

                return res.json({ user: {
                    name: to.name,
                    email: to.email,
                    shortid: to.shortid,
                    avatar: to.avatar
                }, type: SUCCESS })
            }
        }

        return res.json({ message: "Not exist" })
    
    } catch (e) {
        console.warn(e)

        res.status(500).json({ message: "Server error", type: FAILED })
    }
})

router.get('/incoming_requests', auth, async (req, res) => {
    try {
    
        const user = await User.findOne({ _id: req.user.userId })

        const reqs = await User.findOne({ "_id": user.requests.incoming }, { name: 1, email: 1, shortid: 1, avatar: 1 }) 
        
        if (reqs) {
            return res.json(reqs)
        }

        res.json({ message: 'No incoming requests' })

    } catch (e) {
        console.warn(e)

        res.status(500).json({ message: "Server error", type: FAILED })
    }
})

router.get('/from_requests', auth, async (req, res) => {
    try {
    
        const user = await User.findOne({ _id: req.user.userId })

        const reqs = await User.findOne({ "_id": user.requests.from }, { name: 1, email: 1, shortid: 1, avatar: 1 }) 
        
        console.log(reqs)
        if (reqs) {
            return res.json(reqs)
        }
        res.json({ message: 'No requests' })

    } catch (e) {
        console.warn(e)

        res.status(500).json({ message: "Server error", type: FAILED })

    }
})

router.post('/add_to_friends', auth, async (req, res) => {
    try {

        const user = await User.findById({ _id: req.user.userId })
        const friend = await User.findOne({ shortid: req.body.shortid })

        const match = user.requests.incoming.includes(friend.id)

        let isAlreadyFriends = false
        
        friend.friends.forEach(id => {
            if (id.toString === user.id) {
                isAlreadyFriends = true
            }
        })

        if (match && !isAlreadyFriends) {
            user.friends.push(friend._id)
            friend.friends.push(user.id)

            user.requests.incoming = user.requests.incoming.filter(item => item.toString() !== friend.id.toString())
            friend.requests.from = friend.requests.from.filter(item => item.toString() !== user.id.toString())

            user.save()
            friend.save()

            return res.json({ match })
        
        } else {

            return res.json({ message: "you don't have rules on the action", match: false })
        }

    } catch (e) {
        console.warn(e)

        res.status(500).json({ message: "Server error" })
    }
})

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user.userId, { name: 1, shortid: 1 })
    res.json({ user })
})

router.get('/friends', auth, async (req, res) => {
    
    try {
        const user = await User.findOne({ id: req.user.userId })

        const users = await User.find({ id: user.friends })

        res.json({ friends: users })

    } catch (e) {
        console.warn(e)

        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router