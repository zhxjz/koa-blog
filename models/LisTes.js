const mongoose =require("mongoose");
const schema = mongoose.Schema;
// 实例化数据模板
const LisTesSchema = new schema({
    title:{
        type:String,
        default:'无标题'
    },
    author:{
        type:String
    },
    ques:{
        type:[]
    },
    ans:{
        type:[String]
    },
    lis:{
        type:String
    },
    org:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    tag:{
        type:String
    },
    words:{
        type:[String]
    }
});

module.exports = LisTes = mongoose.model("listes",LisTesSchema);