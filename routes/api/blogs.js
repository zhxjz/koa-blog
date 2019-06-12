const Router = require("koa-router");
// 路由
const router = new Router();

// 引入数据模型
const Blogs = require('../../models/Blogs');


/**
 * @route GET api/blogs/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test",async ctx=>{
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.status=200;
    ctx.body={msg:'test page。。'};
})


/**
 * @route POST api/blogs/add
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post("/add",async ctx =>{
    // 存储到数据库
        const newBlog = new Blogs({
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            categories: ctx.request.body.categories,
            hidename:ctx.request.body.hidename,
            author: ctx.request.body.author
        });
        // 存储到数据库
        await newBlog.save().then(blog=>{
            ctx.set("Access-Control-Allow-Credentials", true);
            ctx.body={success:true,blog:blog};
        }).
        catch(err=>{
            console.log(err);
        });
    }
//}
);
/**
 * @route POST api/blogs/del
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/del',async ctx=>{
    var nowid = ctx.request.body.del_blogid;
    await Blogs.findByIdAndRemove(nowid).then(mes=>{
        console.log(mes);
        ctx.body={success:true};
    })
    .catch(err=>{
        console.log(err)
    })
})

/**
 * @route GET api/blogs/list
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/list",async ctx =>{
        await Blogs.find().then(blog=>{
            ctx.set("Access-Control-Allow-Credentials", true);
            ctx.body={success:true,blog:blog};
        }).
        catch(err=>{
            console.log(err);
        });
    }
//}
);

/**
 * @route GET api/blogs/mylist
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/mylist/:id",async ctx =>{
    await Blogs.find({author:ctx.params.id}).then(blog=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={success:true,blog:blog};
    }).
    catch(err=>{
        console.log(err);
    });
}
);

/**
 * @route GET api/blogs/findone/id
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/findone/:id",async ctx=>{
    // console.log(ctx.params.id);
    await Blogs.findById(ctx.params.id)
    .then(data=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={success:true,blog:data}
    })
    .catch(err=>{
        console.log(err);
    })
})

/**
 * @route GET api/blogs/edit/id
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post("/edit",async ctx=>{
    let id=ctx.request.body._id;
    await Blogs.findOneAndUpdate(id,{
        title:ctx.request.body.title,
        content:ctx.request.body.title,
        categories: ctx.request.body.categories,
        hidename:ctx.request.body.hidename,
        author: ctx.request.body.author
    })
    .then(data=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={success:true}
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router.routes();