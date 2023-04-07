//jwt helps to authorized the user in the backend
//for eg if user login with user and trying to excess a resource that is only available to him so jwt will - user send jwt to backend and backend
// will varify that this is the user that is author to access part resource so only then it is allow to use the resouces 


const jwt=require('jsonwebtoken');
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",

    });
};

module.exports=generateToken;