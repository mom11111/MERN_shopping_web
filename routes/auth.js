const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');


const user = require('../models/user');
const product = require('../models/products');
const basket = require('../models/basket');


router.get('/', (req,res)=>{
    product.find().limit(20).then(products=>{
        res.status(200).send(products);
    }).catch(err=>{
        console.log(err);
    })
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
             const Info = [];
             Info.push(myUser);
             basket.findOne({userId:myUser._id}).then(userBasket=>{
                 if(userBasket){
                 Info.push(userBasket.productIds.length);
                 res.status(200).send(Info);
                 }
                 else{
                     Info.push(0);
                     res.status(200).send(Info);
                 }
             }).catch(err=>{
                 console.log(err);
             })
             
         }
         else{
           res.status(400).json({message:"wrong email or password"});
         }
        }).catch(err=>{
            console.log(err);
        });
    });





router.post('/addprod', (req,res)=>{
    const{type, title, price, image, description} = req.body;
    
    const newProd = new product({
        type,
        title,
        price,
        image,
        description,
        date:Date.now()
    })

    newProd.save().then(prod=>{
        res.status(200).send(prod);
    }).catch(err=>{
        console.log(err);
    })

})




router.post('/addtobasket', (req,res)=>{
    
    const{userId, productIds} = req.body;
    basket.findOne({userId:userId}).then(myUser=>{
        if(myUser){
            var flag=false;
            for(let i=0;i<myUser.productIds.length;i++){
                if(myUser.productIds[i]==productIds){
                    flag=true;
                    break;
                }
            }
            if(flag){
                res.status(200).json({message:'already added'});
            }
            else{
                basket.updateOne({userId:userId},  { $push: { productIds: productIds } }).then(updatedone=>{
                    res.status(200).json({message:'added to basket'});
                })
            }
            
        }
           

        else{
            const productIdsArr=[];
            productIdsArr.push(productIds);
            const newBasket = new basket({
                userId,
                productIds:productIdsArr
            })
            newBasket.save().then(addedProd=>{
                res.status(200).send(addedProd);
            }).catch(err=>{
                console.log(err);
            })
        }
    }).catch(err=>{
        console.log(err);
    })

})



router.post('/getbasketdetail', (req,res)=>{

      const{userId} = req.body;

      basket.findOne({userId:userId}).then(userBasket=>{
          
          if(userBasket){
             product.find({_id:{$in:userBasket.productIds}}).then(userProducts=>{
                 res.status(200).send(userProducts);
             }).catch(err=>{
                 console.log(err);
             })
          }
          else{
              res.status(200).json({message:'no products in the basket'});
          }
      }).catch(err=>{
          console.log(err);
      })
})



router.post('/removefrombasket', (req,res)=>{
    const{userId, productId}=req.body;
    basket.findOne({userId:userId}).then(usersBasket=>{
        if(usersBasket){
            basket.updateOne({userId:userId},{$pull:{productIds:productId}}).then(updatedBasket=>{
                res.status(200).json({message:'remove from the basket'});
            })
        }
        else{
            res.status(200).json({message:'user not here'});
        }
    })
})


module.exports = router;