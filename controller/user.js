const {Router} = require('express');

const router = Router();
const userModel = require('../model/user');

router.post('/user',async (req,res,next)=>{
    try {
        const {username,password,email} = req.body
        const avatarNumber = Math.ceil(Math.random()*9)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`
        console.log(data);
        if (password&&password.length >= 5){
            const data = await userModel.create({username,password,email,avatar});
            res.json({
                code:200,
                msg:'注册成功',
                data,
            })
        } else {
            throw '密码不存在或长度低于5！'
        }

    }catch (err) {
        res.json({
            code:400,
            msg:'缺少必要参数',
            err,
        });
        next(err)
    }

});

router.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body
        const userData =await userModel.findOne({email})
        if (!userData) {
            res.json({
                code:404,
                msg:'用户不存在'
            })
        }else {
            if (password&&password == userData.password) {
                req.session.user = userData
                res.json({
                    code:200,
                    msg:'登陆成功',
                    userData:{
                        avatar: userData.avatar,
                        email:userData.email,
                        desc:userData.desc,
                        username:userData.username
                    }
                })
            }else {
                res.json({
                    code:400,
                    msg:'密码不存在'
                })
            }
        }
    }catch (err) {
        res.json({
            code:400,
            msg:err
        })
    }
})

module.exports = router;








