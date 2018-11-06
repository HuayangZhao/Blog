const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// 时间包
const moment = require('moment')
const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'blog',
    user: 'root',
    password: 'root'
})

app.set('view engine', 'ejs')
app.set('views','./views')
// 托管静态文件
app.use(express.static('./node_modules'))
app.get('/',(req,res)=>{
    res.render('index.ejs',{})
})
// 请求登陆页面
app.get('/login',(req,res)=>{
    res.render('user/login.ejs',{})
})
// 请求注册页面
app.get('/register',(req,res)=>{
    res.render('user/register.ejs',{})
})
// 提交注册信息
app.post('/register',(req,res)=>{
    const body = req.body
    // 查询用户输入是否为空
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请填写完整的表单数据后再注册用户！', status: 501 })
      }
    //   查询用户名是否已存在
    const sql = "select count(*) as count from article where username=?" 
    conn.query(sql,body.username,(err,result)=>{
        if(err) res.send({ msg: '用户名查重失败！请重试', status: 502 });
        if(result[0].count !== 0) res.send ({msg:'用户名已存在,请重新输入',status:503})
        // 创建时间
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        // console.log(body.ctime)
        const sql_1 = " insert into article  set ?"
        conn.query(sql_1,body,(err,result)=>{
            if (err) return res.send({ msg: '注册新用户失败！', status: 504 })
            if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败！', status: 505 })
            res.send({ msg: '注册新用户成功！', status: 200 })
        })
    }) 
})
// 提交登陆信息
app.post('/login',(req,res)=>{
    
})




app.listen(80,()=>{
    console.log('server running at http://127.0.0.1');
})