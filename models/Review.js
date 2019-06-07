const mongoose =require("mongoose");
const schema = mongoose.Schema;
// 实例化数据模板
const reviewSchema = new schema({
    blogid: String,  //文章id
    reviewlist: [{
        hostname: String,  //楼主name
        hostcontent: String, //楼主评论内容
        date:{              //楼主评论时间
            type:Date,
            default:Date.now
        },
        //针对楼主的评论
        reviewitem:[{
            oldname: String, //评论者name
            curname: String, //回复者name
            curcontent: String, //评论内容
            date:{
                type:Date,
                default:Date.now
            }
        }]
    }]
});

module.exports = Review = mongoose.model("reviews",reviewSchema);