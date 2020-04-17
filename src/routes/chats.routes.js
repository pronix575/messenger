const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const Chat = require('../models/Chat')
const shortid = require('shortid')

const userFilter = { name: 1, email: 1, shortid: 1, avatar: 1, _id: 0 }

router.get('/all', auth, async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.user.userId })

        const chats = await Chat.find({ _id: user.chats }, { _id: 0, messages: { $slice: -1 } })
        const result = []
        
        for (const chat of chats) {

            const interlocutor = chat.users.filter(u => u.toString() !== user.id.toString() )
            
            chat.users = await User.find({ _id: interlocutor }, userFilter)

            result.push( chat )
        }

        res.json(result)

    } catch (e) {

        console.warn(e)
        res.status(500).json({ message: "Server error" })

    } 
})

router.post('/start_chatting', auth, async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.user.userId })
        //companion
        const interlocutor = await User.findOne({ shortid: req.body.shortid })
        
        const chatCandidate = await Chat.find({
            "$and": [
                { users: user.id },
                { users: interlocutor.id }
            ] 
        })

        if ( user._id.toString() === interlocutor._id.toString() ) {
            return res.json({ message: "It's impossible" })
        }

        if ( chatCandidate.length === 0 ) {

            const code = shortid.generate()
            
            const users = ( user._id.toString() != interlocutor._id.toString() ) ? [ user._id, interlocutor._id ] : [ user._id ]

            const new_chat = new Chat({
                shortid: code,
                creator: user._id,
                users
            })
            

            user.chats.push(new_chat._id)
            interlocutor.chats.push(new_chat._id)

            try {

                await new_chat.save()
            } catch (e) {
                console.warn(e)
            }

            user.save()
            if ( user._id !== interlocutor._id ) {

                interlocutor.save()
            }

            return res.json(new_chat)
        } 


        res.json(chatCandidate[0])

    } catch (e) {

        console.warn(e)
        res.status(500).json({ message: "Server error" })

    }
})

module.exports = router