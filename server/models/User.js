const mongoose = require('mongoose');

const { Schema }  = mongoose;
const userSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: false
        },
        password: {
            type: String,
            // required: true,
        },
        img: {
            type: String,
        },
        subScribers: {
            type: Number,
            default: 0,
        }, 
        subScribedUsers: {
            type: [String],
        },
        fromGoogle: {
            type: Boolean,
            default: false
        }
    },{
       timestamps: true
      }
    );

module.exports =  mongoose.model('User',userSchema)