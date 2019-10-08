const Router = require("koa-router");
// 路由
const router = new Router();

// 引入数据模型
const LisTes = require('../../models/LisTes');

/**
 * @route GET api/listes/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test",async ctx=>{
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.status=200;
    ctx.body={msg:'listen test page。。'};
})

/**
 * @route POST api/listes/add
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post("/add",async ctx =>{
    // 存储到数据库
        const newTes = new LisTes({
            title: ctx.request.body.title,
            author: ctx.request.body.author,
            ques:ctx.request.body.ques,
            ans:ctx.request.body.ans,
            lis:ctx.request.body.lis,
            org:ctx.request.body.org
        });
        // 存储到数据库
        await newTes.save().then(tes=>{
            ctx.set("Access-Control-Allow-Credentials", true);
            ctx.body={status:"Success",listes:tes};
        }).
        catch(err=>{
            ctx.set("Access-Control-Allow-Credentials", true);
            ctx.body={status:"Error",err:err};
        });
    }
);

/**
 * @route GET api/listes/list
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/list",async ctx =>{
    await LisTes.find().then(tes=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={status:"Success",tests:tes};
    }).
    catch(err=>{
        console.log(err);
    });
}
);


/**
 * @route GET api/listes/list
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/list/:id",async ctx =>{
    await LisTes.findOne({"_id":ctx.params.id}).
    then(test=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={status:"Success",test:test};
    }).
    catch(err=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={status:"Error",err:err};
    });
}
);

module.exports = router.routes();