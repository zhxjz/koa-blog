const Router = require("koa-router");
// 路由
const router = new Router();

// 引入数据模型
const Hwk = require('../../models/Hwk');

/**
 * @route GET api/hwk/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test",async ctx=>{
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.status=200;
    ctx.body={msg:'homework test page。。'};
})

/**
 * @route POST api/hwk/add
 * @desc 添加接口地址
 * @access 接口是公开的
 */
router.post("/add",async ctx =>{
    // 存储到数据库
        const newHwk = new Hwk({
            title: ctx.request.body.title,
            author: ctx.request.body.author,
            pa1: ctx.request.body.pa1,
            num1: ctx.request.body.num1,
            pa2: ctx.request.body.pa2,
            num2: ctx.request.body.num2,
            lis: ctx.request.body.lis
        });
        // 存储到数据库
        await newHwk.save().then(hwk=>{
            ctx.set("Access-Control-Allow-Credentials", true);
            ctx.body={status:"Success",newHwk:hwk};
        }).
        catch(err=>{
            console.log(err);
        });
    }
);

/**
 * @route GET api/hwk/list
 * @desc 列表接口地址
 * @access 接口是公开的
 */
router.get("/list",async ctx =>{
    await Hwk.find().then(tes=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={status:"Success",hwklist:tes};
    }).
    catch(err=>{
        console.log(err);
    });
}
);

/**
 * find one paper by id
 * @route GET api/hwk/list
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/list/:id",async ctx =>{
    await Hwk.findOne({"_id":ctx.params.id}).
    then(test=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={status:"Success",hwk:test};
    }).
    catch(err=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={status:"Error",err:err};
    });
}
);

/**
 * delete one paper by id
 * @route GET api/listes/del
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/del/:id",async ctx =>{
    await Hwk.deleteOne({"_id":ctx.params.id}).
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