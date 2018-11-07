// 时间包
const moment = require('moment')
const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'blog',
    user: 'root',
    password: 'root'
})
module.exports = {
    // 请求登陆页面
    getLogin(req,res){
        res.render('user/login.ejs',{})
    },
    // 请求注册页面
    getRegister(req,res){
        res.render('user/register.ejs',{})
    },
    // 提交注册信息
    postRegister(req,res){
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
    },
    // 提交登陆信息
    postLogin(req,res){
        const body = req.body 
        if(body.username.trim().length <= 0 || body.password.trim().length <= 0 ) return res.send({ msg: '请填写完整的表单数据后再注册用户！', status: 501 })
        const sql = "select * from article where username =? and password=?"
        conn.query(sql,[body.username,body.password],(err,result)=>{
            // console.log(result) //[ RowDataPacket { count: 0 } ]
            if(result.length !== 1) return res.send({ msg: '用户名或密码不正确！', status: 400 })
            if(err) res.send({ msg: '登陆失败请重试', status: 501 })
            // 登陆成功就把用户信息添加到服务器session中
            // console.log(req.session)
            console.log(result)
            req.session.user = result[0]
            req.session.islogin = true
            res.send({ msg: '登陆成功！', status: 200 })
        })
    },
    getLogout(req,res){
        // 清除session并重定向到请求根路径
        req.session.destroy(()=>res.redirect('/'))
    }
}
