//logic for registration for user

const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken=require('../config/generateToken');
const { request } = require('http');

//for handling any error in the controller we use package asycnhandler - it handles all the errors automatically
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('please enter all the feilds');
  }

  //we will use name,email,password,pic from user model to structure our data in a databsase

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('user already exist');
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name:user.name,
      email:user.email,
      pic:user.pic,
      token:generateToken(user._id), //when register the user i want to create new jwt token and send it to the user  
    });
  }else{
    res.status(400);
    throw new Error("Fail to create the user"); 
  }
});


const authUser=expressAsyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    const user=await User.findOne({email});

    if(user &&(await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        });
    }else{
        res.status(400);
    throw new Error("Fail to create the user"); 
    }

});






module.exports={registerUser,authUser};