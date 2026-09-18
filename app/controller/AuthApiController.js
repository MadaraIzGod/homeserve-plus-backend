const { hsahePassword, comparePassword } = require('../middleware/AuthCheck');
const User=require('../model/UserModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
class AuthApiController{


   async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }
            const existUser = await User.findOne({ email });
            if (existUser) {
                return res.status(400).json({
                    message: 'User already exist'
                });
            }

            const hashedPassword = await hsahePassword(password);
            const user = await new User({
                name,
                email,
                password: hashedPassword
            }).save();

            res.status(201).json({
                message: 'User created successfully',
                user: user
            });
        } catch (err) {
            console.log(err);

        }

    }



    async login(req,res){
        try {
            const { email, password } = req.body;
           
            if (!email || !password) {
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }
            const user = await User.findOne({ email });
            //console.log('user',user);   

            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email
            }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: "2h" })

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (err) {
            log(err);
        }
    }


    async dashboard(req,res){
        try{
            res.status(200).json({
                message:"welcome to user dashboard",
                data:req.user
            })
        }catch(error){
            console.log(error.messgage);
            
        }
    }
}


module.exports=new AuthApiController()