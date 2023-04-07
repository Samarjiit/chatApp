/*
chatName
isGroupChat
users
latestMessage 
groupAdmin
*/

const mongoose=require('mongoose');
const chatModel=mongoose.Schema(
    {
        chatName:{type:String,trim:true},
        isGroupChat:{type:Boolean,default:false},
        users:[
            {
                type:mongoose.Schema.Types.ObjectId,
                Ref:"User",
            },
        ],

        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            Ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            Ref:"User",
        },
    },
    {
        timestamps:true,
    }
);

const Chat=mongoose.model("chat",chatModel);

module.exports=Chat;