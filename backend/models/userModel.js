/*
name
email
passowrd
picture 

*/

const mongoose = require("mongoose");
const bcrypt=require('bcryptjs');
const userSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
    
        pic:{
            type:String,
        
            default:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpG789Hv-utu9yUZUNxpU5mMui0cEE9EzmDE6oNnQY_A&s"
        },
        
    },
    {
        timestamps:true}
    
);
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

//before saving to ourdatabase it will encrpyt the password 
userSchema.pre('save',async function(next){
    if(!this.isModified){
        next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

const User=mongoose.model("User",userSchema);
module.exports=User;