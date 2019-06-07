const mongoose =require("mongoose");
const schema = mongoose.Schema;
// 实例化数据模板
const BlogSchema = new schema({
    title:{
        type:String,
        default:'无标题'
    },
    content:{
        type:String,
    },
    categories:{
        type:[String]
    },
    hidename:{
        type:Boolean
    },
    author:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = User = mongoose.model("blogs",BlogSchema);