
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../service/jwt')
function register(req,res){
    const params = req.body;
    if(params.name && params.email && params.password && params.role){
        // console.log(params)
        var user = new User();
        user.name = params.name;
        user.role = params.role
        User.find({email:params.email}).exec((err,data)=>{
            if(err){
                return res.send({messege:'Error Occured'})
            }
            else if(data && data.length>=1){
                return res.send({messege:'One or more credentials already in the database'})
            }
            else{
                user.email = params.email
                bcrypt.hash(params.password,null,null,(err,hashpass)=>{
                    if(err){
                        return res.send({messege:'Error Occures while generating password'})

                    }
                    user.password = hashpass
                })
                user.save((err,saveduser)=>{
                    if(err){
                        return res.send({messege:'Error Occured while saving data'})
                    }
                    else{
                        return res.send({user:saveduser,messege:'Registered'})
                    }
                })
            }


        })
    }
    else{
        return res.send({messege:'Invalid Data'})
    }
}

function login(req,res){
    const params = req.body
    if(params.email && params.password){
        User.findOne({email:params.email}).exec((err,user)=>{
            if(err){
                return res.status(500).send({messege:'Invalid Data'})
            }
            if(user){
                bcrypt.compare(params.password,user.password,(err,result)=>{
                    if(err){
                        return res.status(500).send({messege:'Error Occured'})
                    }
                    if(!result){
                        return res.status(500).send({messege:'incorrect Password'})
                    }
                    else{
                        return res.send({messege:'Logged In',user:user,token:jwt.createtoken(user)})
                    }
                })
            }
            else{
                return res.status(500).send({messege:'Incorrect Email'})
            }
        })
    }
    else{
        return res.status(500).send({messege:'Inavlid Data'})
    }
}

module.exports ={
    register,
    login
}