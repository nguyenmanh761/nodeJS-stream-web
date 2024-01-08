const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    videoid: {type: String, require: true},
    videoname: { type: String, required: true },
    username: { type: String, required: true },
    datetime: { type: Date, default: Date.now},
    text: { type: String, required: true, unique: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;