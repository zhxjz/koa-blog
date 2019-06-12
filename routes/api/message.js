const Router = require("koa-router");
// 路由
const router = new Router();
// 引入数据模型
const Message = require('../../models/Message');

/**
 * @route GET api/message/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test",async ctx=>{
    ctx.status=200;
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.body={msg:'message test page。。'};
})

/**
 * @route GET api/message/list
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/list/:id",async ctx=>{
    // console.log(ctx.params.id);
    await Message.findOne({authorname:ctx.params.id}).then(
    mes=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={success:true,message:mes.messagelist};
    }
    ).
    catch(err=>{
        console.log(err);
    });
})
/**
 * @route POST api/message/hasread/authorname/messageitem
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.post("/hasread/:id/:id2",async ctx=>{
    // console.log(ctx.params.id);
    let ok = await Message.findOne({authorname:ctx.params.id});
    // console.log(ok);
    for( var i = 0;i<ok.messagelist.length;i++){
        if(ctx.params.id2 == ok.messagelist[i]._id){
            ok.messagelist[i].status=1;
            await ok.save();
            break;
        }
    }
})

module.exports = router.routes();