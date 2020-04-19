const socketio = require('socket.io')
const User = require('../models/User')
const Chat = require('../models/Chat')
const jwt = require('jsonwebtoken')
const config = require('config')
const userFilter = { name: 1, email: 1, shortid: 1, avatar: 1, _id: 0 }

let users = []
const deleteUser = (id, users) => users.filter(user => user.sid !== id)
const decode = token => jwt.verify(token, config.get('jwtSecret'))


const startChatSocket = (http) => {

    const io = socketio(http)

    io.on('connection', socket => {

        socket.on('setOnline', async ({ token }) => {

            try {
                const { userId } = decode(token) 

                users.push({
                    sid: socket.id,
                    userid: userId
                })

                const user = await User.findOne({ _id: userId })
                user.online = true
                user.save()

            } catch (e) {
                // console.warn(e)
            }
        })

        socket.on('sendMessage', async ({ text, token, shortid, date, to_id }) => {
            try {

                const { userId } = decode(token) 
                const user_from = await User.findOne({ _id: userId })
                const user_to = await User.findOne({ shortid: to_id })

                const chat = await Chat.findOne({ shortid })

                const new_message = {
                    text,
                    createdDate: date,
                    viewed: false,
                    creator: userId
                }
                
                chat.messages.unshift(new_message)
                
                try {
                    console.log({chat, msgs: chat.messages})
                    chat.save()
                } catch (e) {
                    console.warn(e)
                }
                
                const from = users.find(user => user.userid === user_from.id)
            
                const message = chat.messages[0]
                
                
                
                if (user_to) {
                    const to = users.find(user => user.userid === user_to.id)
                    
                    if (to) {
                        io.sockets.connected[to.sid].emit('newMessage', {
                            shortid: chat.shortid,
                            message: message
                        })
                    }
                }
                
                console.log(message)

                io.sockets.connected[from.sid].emit('newMessage', {
                    shortid: chat.shortid,
                    message: message
                })

            } catch (e) {
                console.warn(e)
            }
        })
        
        socket.on('disconnect', async () => {

            try {
                // console.log(users, socket.id)

                const user = await User.findOne({ _id: users.find(user => user.sid === socket.id).userid })
                user.online = false
                user.save()

                users = deleteUser(socket.id, users)

            } catch (e) {
                console.warn(e)
            }
        })


    })
}

// const log = () => setInterval(() => console.log(users, new Date()), 5000)
// log()

module.exports = startChatSocket