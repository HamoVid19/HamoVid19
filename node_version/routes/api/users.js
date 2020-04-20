const express = require('express')
const router = express.Router()
const Users = require('../../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const secretOrKey = require("../../config/keys").secretOrKey;
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require('../../validation/login')



//register  api/users/register
router.post('/register',(req,res)=>{
  const{email,password,name} = req.body
  let {errors, isValid} = validateRegisterInput(req.body)
  if(!isValid){
    return res.status(400).json(errors);
  }

  Users.findOne({email})
    .then(user=>{
      if(user){
        errors.email = 'email already exists'
        return res.status(400).json(errors)
      }
      let newUser = new Users({
        name,
        email,
        password
      })
      bcrypt.genSalt(5,(err,salt)=>{
        if(err) throw err
        bcrypt.hash(newUser.password, salt,(err,hash)=>{
          if(err) throw err
          newUser.password = hash
          newUser.save()
            .then(user =>{
              res.json(user)
            })
            .catch(e=> res.status(400).json(e))
        })
       
      })
    })
    .catch(e=> res.status(400).json(e))
})


//login  api/users/login
router.post('/login', (req,res)=>{
  let {email, password} = req.body
  let {errors, isValid} = validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json(errors);
  }

  Users.findOne({email})
    .then(user=>{
      if(!user){
        errors.email= 'eamil does not exist please register'
        return res.status(400).json(erros)
      }
      bcrypt.compare(password, user.password)
        .then(isMatch =>{
          if(isMatch){
            const payload = {
              id: user._id,
              name: user.name,
              email: user.email
            }
            jwt.sign(payload, secretOrKey,{expiresIn: 86400},(err,token)=>{
              if (err) throw err;
                res.json({
                  succes: true,
                  token: "Bearer " + token
                });
            })
          }else{
            errors.password = "password incorrect";
            return res.status(400).json(errors);
          }
        })
    })
    .catch(e=> res.status(400).json(e))
})

module.exports= router
