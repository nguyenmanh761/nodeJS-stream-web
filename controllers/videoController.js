const Video = require("../models/video");
const User = require("../models/user");
const fs = require("fs");


const videoController = {

  create : async (req, res) => {
    try {
      const { videoname, description, username } = req.body;
      const { filename, path } = req.file;
  
      const video = new Video({
        videoname,
        username,
        description,
        filename,
        filepath: path,
      });
  
      await video.save();
  
      res.json({ message: 'Video uploaded successfully', video });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const videos = await Video.find();
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params; // Lấy id từ đường dẫn
    try {
      // Tìm video theo id
      const existingUser = await Video.findById(id);

      if (!existingUser) {
        return res.status(404).json({ message: "Video not found" });
      }

      if ("id" in req.body) {
        return res.status(400).json({ message: "Cannot update id" });
      }

      // Cập nhật thông tin video
      const updatedVideo = await Video.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(updatedVideo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteVideo = await Video.findByIdAndDelete(id);
      if (deleteVideo) {
        res.status(200).json({ message: "Video deleted successfully" });
      } else {
        res.status(404).json({ message: "Video not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


};

module.exports = videoController;
