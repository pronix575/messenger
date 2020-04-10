const { Schema, model, Types } = require('mongoose')

const scehma = new Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },

    users: [{
        type: Types.ObjectId,
        ref: 'User'
    }],

    creator: {
        type: Types.ObjectId,
        ref: 'User'
    },

    messages: [{
        text: {
            type: String,
            required: true
        },

        createdDate: {
            type: Date,
            required: true
        },

        viewed: {
            type: Boolean,
            required: true
        },

        creator: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },

        media: [{
            type: String,

        }]
    }]
})

module.exports = model('Chat', scehma)