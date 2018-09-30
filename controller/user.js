const {Router} = require('express');

const router = Router();
const userModel = require('../model/user');

router.post('/user',async (req,res,next)=>{
    try {
        const {username,password,email} = req.body
        const avatarNumber = Math.ceil(Math.random()*9)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`
        const data = await userModel.create({username,password,email,avatar});

        console.log(data);
        if (password&&password.length >= 5){
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

module.exports = router;








