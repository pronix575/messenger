const { Schema, model, Types } = require('mongoose')

const scehma = new Schema({
    
    name: {
        type: String,
        required: true
    },
    
    email: { 
        type: String, 
        required: true, 
        unique: true
    },

    shortid: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    chats: [{
        type: Types.ObjectId,
        ref: 'Chat'
    }],

    avatar: { type: String},

    requests: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = model('User', scehma)