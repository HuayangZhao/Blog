module.exports = {
    addArticle(req,res){
        // 如果用户为登陆就进行拦截 重定向到根目录
        if(req.session.islogin) return res.redirect('/')
        res.render('./article/addArticle.ejs',{
                user:req.session.user,
                islogin:req.session.islogin
        })
    }
}
