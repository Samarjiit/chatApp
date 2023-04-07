//all the routes related to user 
const  express=require('express');
const { Module } = require('module');
const {registerUser,authUser} =require('../controllers/userControllers')


const router=express.Router()//instance of router from express

router.route('/').post(registerUser)
router.post('/login',authUser)


//for creating logic for controller -create another folder for controller

module.exports=router;