const express= require('express');
const {chats} =require("./data/data");
const dotenv=require('dotenv');
const { connect } = require('http2');
const connectDB = require('./config/db');
const colors =require('colors');
const userRoutes =require('./routes/userRoutes');
const{ notFound,errorHandler}=require('./middleware/errorMiddleware')


dotenv.config();
connectDB()
const app=express();

app.use(express.json());// since we are taking the values from fontend we need to tell our server to accept the json data 

//to create first api 
app.get("/",(req,res)=>{  //using callback function 
    res.send("api is running successfully");
});

//to get whole data 
app.get('/api/chat',(req,res)=>{
    res.send(chats)
})


app.use('/api/user',userRoutes) //extract all the logic for routes related to users in userroutes files 
app.use(notFound);
app.use(errorHandler)

//to get one chat part
app.get('/api/chat/:id',(req,res)=>{
    //console.log(req.params.id);
    const singleChat=chats.find((c)=>c._id==req.params.id);
   res.send(singleChat);
})


const PORT= process.env.PORT||5000;
app.listen(PORT,console.log(`server started on port ${PORT}`.yellow.bold));