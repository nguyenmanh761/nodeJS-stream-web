const User = require('../models/user');
const FavoriteList = require('./favoritelist');
const bcrypt = require('bcrypt');
const userController = {
  create: async (req, res) => {
    try {
      const { username, fullname, email, password, admin } = req.body;
      console.log(req.body);
      // const check = await User.findOne({ username, email });
      // if (!check) {
      //   res.status(500).json("User va email da ton tai! ")
      //   return;
      // }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({ 
        username, 
        fullname, 
        email, 
        password, 
        admin:admin||false
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
      FavoriteList.create(username);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {

      res.status(500).json({ message: error.message });
    }
  },

  getByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(500).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    const { username } = req.params; // Lấy username từ đường dẫn

    try {
      // if ('username' in req.body) {
      //   return res.status(400).json({ message: 'Cannot update username' });
      // }
      // Tìm người dùng theo username
      const existingUser = await User.findOne({ username });

      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }


      // Cập nhật thông tin người dùng
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    // TODO: Thêm logic xóa người dùng dựa vào username
    try {
      const { username } = req.body.username;
      const deletedUser = await User.findOneAndDelete({ username });
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
//ham tim kiem gan dung theo username
//const user = await User.find({ username: { $regex: username, $options: 'i' } });

module.exports = userController;
