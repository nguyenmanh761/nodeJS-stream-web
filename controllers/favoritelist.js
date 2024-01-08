
const Video = require('../models/video');
const create = (username) => {
    try{
        const newFavoriteList = new FavoriteList({ username });
        newFavoriteList.save();
    }
    catch(error){
        console.log("Có lỗi trong quá trình tạo danh sách ưa thích: ", error);
    }

}

const insert = async (req ,res) => {
    try{
        const {username} = req.params;
        const favoriteList = await FavoriteList.findOne({username});
        const id = req.body.id;
        const check = await FavoriteList.findOne({'videos.$.$soid': id })
        console.log(check);
        if(check){
            res.status(404).json("Đã có trong danh sách yêu thích");
        }
        favoriteList.videos.push(id);
        favoriteList.save();
        res.status(201).json(favoriteList);
    }catch(error){
        console.log("Có lỗi trong quá trình thêm video ưa thích: ", error);
    }
}

const deleteVideoFromFavoriteList = async (req, res)=>{
    try{
        const {username} = req.params;
    }catch(error){
        console.log('Lỗi trong quá trình xóa!', error);
    }
}

module.exports = {
    insert,
    create,
    deleteVideoFromFavoriteList
}