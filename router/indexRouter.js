const express=require('express')
const router = express.Router()
const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'blog',
    user: 'root',
    password: 'root',
    // 开启一次性多条sql语句查询
    multipleStatements:true
})
// 主页渲染
router.get('/',(req,res)=>{
    // 每页显示的页数
    const showPage = 2 
    // 当前显示的是第几页
    // 通过URL传参获取当前是第几页,这个页数可能是undefined,多以利用或运算符设置默认1
    const nowPage = Number(req.query.page) || 1
    // 联表查询 多行sql语句需要用反引号`
    const sql = `select articles.title,articles.ctime,articles.id,articles.authorId,user.username,user.nickname from articles 
    LEFT JOIN user ON articles.authorId = user.id
    order by articles.id desc limit ${(nowPage-1)*showPage },${showPage};
    SELECT COUNT(*) as count from articles`
    conn.query(sql,(err,result)=>{
        if(err) return res,render('index.ejs',{
            user:req.session.user,
            islogin:req.session.islogin,
            article:[]
        })
        // 总页数
        const allPage = Math.ceil(result[1][0].count/showPage) 
        res.render('./index.ejs',{ 
            user:req.session.user,
            islogin:req.session.islogin,
            article:result[0],
            page:allPage,
            nowPage:nowPage
        })
    }) 
})
module.exports = router
