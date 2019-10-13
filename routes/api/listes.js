const Router = require("koa-router");
// 路由
const router = new Router();

// 引入数据模型
const LisTes = require('../../models/LisTes');

/**
 * just a test
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
 * add a test
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
            org:ctx.request.body.org,
            tag:ctx.request.body.tag
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
 * all list
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
 * level4 list
 * @route GET api/listes/level4
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/level4",async ctx =>{
    await LisTes.find({ 
        tag:"level4"
     }).
    then(tes=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={status:"Success",tests:tes};
    }).
    catch(err=>{
        console.log(err);
    });
}
);

/**
 * level6 list
 * @route GET api/listes/level6
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/level6",async ctx =>{
    await LisTes.find({ 
        tag:"level6"
     }).
    then(tes=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={status:"Success",tests:tes};
    }).
    catch(err=>{
        console.log(err);
    });
}
);

/**
 * find one paper by id
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