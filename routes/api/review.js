const Router = require("koa-router");
// 路由
const router = new Router();
// 引入数据模型
const Review = require('../../models/Review');
const Message = require('../../models/Message');
const Blog = require('../../models/Blogs')

/**
 * @route GET api/review/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test",async ctx=>{
    ctx.status=200;
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.body={msg:'review test page。。'};
})

/**
 * @route GET api/review/list
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/list/:id",async ctx=>{
    // console.log(ctx.params.id);
    await Review.findOne({blogid:ctx.params.id}).then(
    review=>{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={success:true,review:review};
    }
    ).
    catch(err=>{
        console.log(err);
    });
})

/**
 * @route POST api/review/addone
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/addone',async ctx=>{
    console.log('here');
    let blogid=ctx.request.body.blogid;
    let hostname = ctx.request.body.hostname;
    let hostcontent = ctx.request.body.hostcontent;
    let ok = await Review.findOne({blogid:blogid});
    // console.log(ok);
    if(!ok){
        let newreview = new Review ({
            blogid:blogid,
            reviewlist:[{
                hostname:hostname,
                hostcontent:hostcontent
            }]
        });
        await newreview.save().then(
            data=>{
                ctx.set("Access-Control-Allow-Credentials", true);
                ctx.body=data;
        }).then(
            await addmessage(blogid,hostname,hostcontent)
        )
    }
    else{
        let reviewlist = ok.reviewlist;
        let item = {
            hostname:hostname,
            hostcontent:hostcontent
        };
        reviewlist.push(item);
        await Review.update({blogid:blogid},{reviewlist:reviewlist})
        .then (data=>{
            ctx.set("Access-Control-Allow-Credentials", true);
            ctx.body=data;
        }).then(
            await addmessage(blogid,hostname,hostcontent)
        )
    }
})

/**
 * @route POST api/review/replyreply
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/replyreply',async ctx=>{
    let blogid=ctx.request.body.blogid;//博客id
    let hostid=ctx.request.body.hostid;//评论楼id
    let oldname=ctx.request.body.oldname;//层主名字
    let curname=ctx.request.body.curname;//新回复主人名字
    let curcontent=ctx.request.body.curcontent;//新回复内容

    let ok = await Review.findOne({blogid:blogid});
    if(ok){
        let newreply = {
            oldname:oldname,
            curname:curname,
            curcontent:curcontent,
        };
        for( var i = 0;i<ok.reviewlist.length;i++){
            if(ok.reviewlist[i]._id==hostid){
                ok.reviewlist[i].reviewitem.push(newreply);
                await ok.save(ok.reviewlist[i]._id)
                .then(data=>{
                    ctx.set("Access-Control-Allow-Credentials", true);
                    ctx.body=data;
                })
                .then(
                    await addmessage2(blogid,oldname,curname,curcontent)
                )
                break;
            }
        }
    }
    else{
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.body={message:'sth wrong--'};
    }
})
 module.exports = router.routes();
 async function addmessage(blogid,nowname,curcontent){
    let blog = await Blog.findOne({_id:blogid});
    let ok = await Message.findOne({authorname:blog.author});
    let newmessage = {
            reusername:nowname,
            blogid:blogid,
		    blogname: blog.title, //博客的name
		    content: curcontent,  //评论内容
		    actiontype: 1,
		    status: 0 //0表示未查看, 1表示已查看
        };
    if(ok){    
        ok.messagelist.push(newmessage);
        await ok.save();
    }
    else{
        ok = new Message({authorname:blog.author});
        ok.messagelist.push(newmessage);
        await ok.save();
    }
 }

 async function addmessage2(blogid,oldname,nowname,curcontent){
    let blog = await Blog.findOne({_id:blogid});
    let ok = await Message.findOne({authorname:oldname});
    let newmessage = {
            reusername:nowname,
            blogid:blogid,
		    blogname: blog.title, //博客的name
		    content: curcontent,  //评论内容
		    actiontype: 1,
		    status: 0 //0表示未查看, 1表示已查看
        };
    if(ok){    
        ok.messagelist.push(newmessage);
        await ok.save();
    }
    else{
        ok = new Message({authorname:oldname});
        ok.messagelist.push(newmessage);
        await ok.save();
    }
 }