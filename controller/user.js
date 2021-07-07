const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Input validation
const validateSigninInput = require("../validation/signIn");
const validateLoginInput = require("../validation/login");

// @desc   Add user data
//@route   /

exports.signIn = (req,res,next)=>{
    // check validation
    const { errors, isValid } = validateSigninInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
        if(err){
            res.json({
                error:err
            })
        }

        let newuser = new User({
            username : req.body.username,
            email: req.body.email,
            password : hashedPass
        });
        newuser.save()
        .then(user=>{
            res.json(user)
        })
        .catch(err=>{
            res.json({
                error: err
            })
        })

    })
}

exports.login =  (req,res,next) => {  
    
    // Check validation
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    let username = req.body.username ;
    let password = req.body.password ;

    User.findOne({$or:[{username:username},{password:password}]})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.json({
                        message: err
                    })
                }
                if(result){
                    let token = jwt.sign({username:user.username},'50d84g94g404)9',{expiresIn:'1h'})
                    res.json({
                        message:'Login Successful!',
                        token: "Bearer " + token
                    })
                }
                else{
                     res.json({
                         message:'Password does not matched!'
                     })
                }
            })
        }else{
            res.json({
                message:'No user found!'
            })
        }
    })
}

