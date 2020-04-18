const socketio = require('socket.io')
const User = require('../models/User')
const Chat = require('../models/Chat')
const jwt = require('jsonwebtoken')
const config = require('config')

let users = []
const deleteUser = (id, users) => users.filter(user => user.sid !== id)
const decode = token => jwt.verify(token, config.get('jwtSecret'))


const startChatSocket = (http) => {

    const io = socketio(http)

    io.on('connection', socket => {

        socket.on('setOnline', async ({ token }) => {
            // console.log('user online')

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
                console.warn(e)
            }
        })

        socket.on('sendMessage', async ({ message, token, shortid, text, date }) => {
            try {

                const chat = await Chat.findOne({ shortid })

            } catch (e) {

            }
        })
        
        socket.on('disconnect', async () => {
            // console.log('user disconnected');

            try {


                console.log(users, socket.id)

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

// const log = () => setInterval(() => console.log(users, new Date()), 10000)

// log()

module.exports = startChatSocket