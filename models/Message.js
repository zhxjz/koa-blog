const mongoose =require("mongoose");
const Schema = mongoose.Schema;
/*
*为每个用户独立添加一个集合，用来存储所有的消息
*/
var messageSchema = new Schema({
    authorname: String,
	messagelist: [{
		reusername: String, //评论用户name
		blogid: String, //博客的id
		blogname: String, //博客的name
		content: String,  //评论内容
		actiontype: {type:Number,default:1},  //1表示喜欢, 2表示评论, 值为3表示回复
		status: Number, //0表示未查看, 1表示已查看
		date: {type:Date,default:Date.now}
	}]
});

module.exports = Message = mongoose.model("message",messageSchema);