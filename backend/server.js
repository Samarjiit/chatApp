const express= require('express');
const {chats} =require("./data/data");
const app=express();
const dotenv=require('dotenv');

dotenv.config();


//to create first api 
app.get("/",(req,res)=>{  //using callback function 
    res.send("api is running successfully");
});

//to get whole data 
app.get('/api/chat',(req,res)=>{
    res.send(chats)
})



//to get one chat part
app.get('/api/chat/:id',(req,res)=>{
    //console.log(req.params.id);
    const singleChat=chats.find((c)=>c._id==req.params.id);
   res.send(singleChat);
})


const PORT= process.env.PORT||5000;
app.listen(PORT,console.log(`server started on port ${PORT}`));