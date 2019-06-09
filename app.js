const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');

const app = new koa();
const router = new Router();
app.use(bodyParser());

// 引入
const blogs = require("./routes/api/blogs")
const review = require('./routes/api/review')

// 路由
router.get("/",async ctx=>{
    ctx.body={msg:'Hello mlslp!'};
});

// 连接数据库
const db = require("./config/keys").mongoURI;
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(()=>{
        console.log('Mongodb connect SUCCESSFULLY')
    })
    .catch (err =>{
        console.log(err);
    });
// 配置路由地址localhost:5000/api/users
router.use('/api/blogs',blogs);
router.use('/api/review',review);


app.use(cors({
    origin: function (ctx) {
        return "*";
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
app.use(cors());

// 配置路由
app.use(router.routes());
app.use(router.allowedMethods());

// 监听
const port = 5000;
app.listen(port,()=>{
    console.log(`Server started on port ${port} SUCCESSFULLY`);
});