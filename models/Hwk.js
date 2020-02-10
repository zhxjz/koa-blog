const mongoose =require("mongoose");
const schema = mongoose.Schema;
// 实例化数据模板
const HwkSchema = new schema({
    title:{
        type:String,
        default:'无标题'
    },
    author:{
        type:String
    },
    pa1:{
        type:String
    },
    num1:{
        type:Number
    },
    pa2:{
        type:String
    },
    num2:{
        type:Number
    },
    lis:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Hwk = mongoose.model("hwks",HwkSchema);