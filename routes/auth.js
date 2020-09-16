const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const user = require('../models/user');


router.get('/',(req,res)=>{
    res.send('hello');
})

router.post('/register', (req,res)=>{

      const{name, email, password} = req.body;

      if(!name || !email || !password)
          return res.status(400).json({message:"fill all fields"});

     else{

        user.findOne({email:email}).then(savedUser=>{
            if(savedUser)
                return res.status(400).json({message:"already used email"});
            else{
                const newUser = new user({
                    name,
                    email,
                    password
                });
          
                newUser.save().then(myUser=>{
                    console.log('user saved');
                     res.status(200).send(myUser);
                }).catch(err=>{
                    console.log(err);
                })
            }
        }).catch(err=>{
            console.log(err);
        })

    }
})


router.post('/login', (req,res)=>{
    const {email, password} = req.body;
    user.findOne({email:email}).then(myUser=>{
        if(myUser.password==password)
         {
             console.log('user is authentic');
             res.status(200).send(myUser);
         }
         else{
           res.status(400).json({message:"wrong email or password"});
         }
        }).catch(err=>{
            console.log(err);
        });
    });
module.exports = router;