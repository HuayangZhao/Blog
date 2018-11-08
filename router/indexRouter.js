const express=require('express')
const router = express.Router()
// 主页渲染
router.get('/',(req,res)=>{
    res.render('index.ejs',{ 
        user:req.session.user,
        islogin:req.session.islogin
    })
})
module.exports = router