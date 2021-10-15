// import mongoose from 'mongoose';
const mongooseConfig = require('../config/database.config');
const { Schema } = mongooseConfig;

console.log(mongooseConfig.connection.readyState);

const userSchema = new Schema({
    full_name:  { 
        type: String, 
        // required: [true, "Full Name is required"] }, // String is shorthand for {type: String}
    },
    email: {
        type: String,
        // validate: [true, "Please fill a valid email address"],
        index: {unique: true}
    },
    password: {
        type: String,
        // required: [true,  'Password is required']
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongooseConfig.model('userModel', userSchema);