
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const hsahePassword=(password)=>{
    try{
        const salt=10;
        const hashedPassword=bcrypt.hashSync(password,salt);
        return hashedPassword;

    }catch(err){
        console.log(err);
    }
}
const comparePassword=(password,hashedPassword)=>{
   
        return bcrypt.compare(password,hashedPassword);
    
}


const AuthCheck=(req,res,next)=>{
    const token= req?.body?.token || req?.query?.token || req?.headers['x-access-token'];
    if(!token){
        return res.status(400).json({
            message:'Token is required for access this page'
        });
    }
    try{
        const decoded=jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY)
        req.user=decoded;
       console.log('afetr login data',req.user);
       

    }catch(err){
       return res.status(400).json({
            message:'Invalid token'
        });
    }
    return next();

}

module.exports={hsahePassword,comparePassword,AuthCheck}
