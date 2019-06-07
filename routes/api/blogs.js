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
            ctx.body={success:true,blog:blog};
        }).
        catch(err=>{
            console.log(err);
        });
    }
//}
);
/**
 * @route GET api/blogs/list
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.get("/list",async ctx =>{
        await Blogs.find().then(blog=>{
            ctx.body={success:true,blog:blog};
        }).
        catch(err=>{
            console.log(err);
        });
    }
//}
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
        ctx.body={success:true,blog:data}
    })
    .catch(err=>{
        console.log(err);
    })
})

// /**
//  * @route LOGIN api/users/login
//  * @desc 登录接口地址 返回token
//  * @access 接口是公开的
//  */
// router.post('/login',async ctx=>{
//     //查询
//     const findResult = await User.find({email:ctx.request.body.email});
//     const user = findResult[0];
//     const password = ctx.request.body.password;
    
//     // 没查到
//     if(findResult.length ==0 ){
//         ctx.status = 404;
//         ctx.body = {email:'用户不存在'}
//     }
//     // 查到
//     else{
//         // 验证密码
//         var result = await bcrypt.compareSync(password,user.password);

//         // 验证通过
//         if(result){

//             // 返回token
//             const payload = {id:user.id,name:user.name};
//             const token = jwt.sign(payload,keys.secretOrKey,{expiresIn:3600});

//             ctx.status=200;
//             ctx.body={success:true,
//             token:"Bearer " + token };
//         }
//         else{
//             ctx.status=400;
//             ctx.body={password:'密码错误'};
//         }
//     }
// })

module.exports = router.routes();