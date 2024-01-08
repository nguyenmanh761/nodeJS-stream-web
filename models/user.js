const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        maxlength: [20, "username must be at most 20 character!"],
        minlength: [6,"Username must be at least 6 character!"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
            message: 'Invalid email format'
        }
    },
    fullname: {
        type: String,
        required: true
    },
    admin: { type: Boolean, default: false},
    favoritelist:[{type: Schema.Types.ObjectId, ref: 'User'}],
    // Thêm trường để lưu trữ danh sách người dùng đang theo dõi
    following: [{type: Schema.Types.ObjectId, ref: 'User' }],

    // Thêm trường để lưu trữ danh sách người dùng đang theo dõi nguoi dung hien tai
    followed: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    
},{timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports = User;