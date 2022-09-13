const mongoose = require('mongoose');

const { Schema }  = mongoose;
const commentSchema = new Schema({
        userId: {
            type: String,
            required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

    }, { timestamps: true });

module.exports =  mongoose.model('Comment',commentSchema)