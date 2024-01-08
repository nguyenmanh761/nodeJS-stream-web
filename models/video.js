const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new mongoose.Schema({
  videoname: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, required: true},
  filepath: {type: String},
  countviews: {type: Number, default: 0},
  countlikes: {type: Number, default: 0},
  datetime: {type: Date, default: Date.now}
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;