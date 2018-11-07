const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


app.set('view engine', 'ejs')
app.set('views','./views')
// 托管静态文件
app.use(express.static('./node_modules'))

// 引入indexRouter.js路由
const router = require('./router/indexRouter.js')
app.use(router)
// 引入userRouter.js路由
const router_1 = require('./router/userRouter')
app.use(router_1)


app.listen(80,()=>{
    console.log('server running at http://127.0.0.1');
})