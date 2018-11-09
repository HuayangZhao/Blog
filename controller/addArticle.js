const moment = require('moment')
const mysql = require('mysql')
const marked = require('marked')
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'blog',
    user: 'root',
    password: 'root'
})
module.exports = {
// 请求添加文章页
    addArticleGet(req,res){
        // 如果用户未登陆就进行拦截 重定向到根目录
        if(!req.session.islogin) return res.redirect('/')
        res.render('./article/addArticle.ejs',{
                user:req.session.user,
                islogin:req.session.islogin
        })
    },
// 发表文章
    addArticlePost(req,res){
        const body = req.body
        // body.authorId = req.session.user.id  如果文章编辑很就时间,session就会失效,会报错
         // 创建时间
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        // console.log(body)
        const sql = "insert into articles set ?"
        conn.query(sql,body,(err,result)=>{
            if(err || result.affectedRows != 1) return res.send({ msg: '添加文章失败！请重试', status: 504 })
            res.send({ msg: '添加文章成功！', status: 200 ,insertId : result.insertId})
            // console.log(result);
        })
    },
// 文章详情页
    articleInfoGet(req,res){
        // 获取url传递过来的ID参数
        const id = req.params.id
        // 根据ID查询文章
        const sql = "select * from articles where id = ?"
        conn.query(sql,id,(err,result)=>{
            if(err) return res.send({ msg: '读取文章失败！', status: 504 })
            if( result.length != 1) return res.redirect('/')
            // console.log(result);
            // 在返回给浏览器端之前要把markdown文本转换为html文本
            const html = marked(result[0].content)
            result[0].content = html
            res.render('./article/articleInfo.ejs',{
                user:req.session.user,
                islogin:req.session.islogin,
                article:result[0]
    
            })
        })
       
    },
// 请求编辑文章页面
    editArticleGet(req,res){
        if(!req.session.islogin) return res.redirect('/')
        const sql = "select * from articles where id = ?"
        conn.query(sql,req.params.id,(err,result)=>{
            if(err||result.length != 1) return res.redirect('/')
            res.render('./article/editArticle.ejs',{ user:req.session.user,islogin:req.session.islogin,article:result[0]})
        })
        
    },
// 保存编辑文章
    editArticlePost(req,res){
        const sql = "update articles set ? where id = ?"
        conn.query(sql,[req.body,req.body.id],(err,result)=>{
            if(err||result.affectedRows!== 1) return res.send({msg:'保存失败',status:501})
            res.send({ msg: 'ok', status: 200 })
        })  
    }
}
