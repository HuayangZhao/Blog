const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// 注册session中间件 只要能访问req 必然可以访问req.session
const session = require('express-session')
app.use(
    session({
        secret:'这是加密钥匙',
        resave:false,
        saveUninitialized:false
    })
)
app.set('view engine', 'ejs')
app.set('views','./views')
// 托管静态文件
app.use(express.static('./node_modules'))

// // 引入indexRouter.js路由
// const router = require('./router/indexRouter.js')
// app.use(router)
// // 引入userRouter.js路由
// const router_1 = require('./router/userRouter')
// app.use(router_1)

// 以上引入路由模块过于重复 可以使用一下方法循环注册路由模块
fs.readdir(path.join(__dirname,'./router'),(err,filename)=>{
    if(err) return console.log('读取路由目录失败')
    filename.forEach(fname=>{
        const router = require(path.join(__dirname,'./router',fname))
        app.use(router)
    })
})


app.listen(80,()=>{
    console.log('server running at http://127.0.0.1');
})