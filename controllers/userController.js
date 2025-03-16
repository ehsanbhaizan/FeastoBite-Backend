import UserModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body ;
    try{
        // chaeck is user exists
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        } 

        // compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Incorrect password"})
        }

        // create and send jwt token
        const token = createToken(user._id)
        res.json({success:true,token})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Failed to login"})
    }
   
}





const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}







// register user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body ;
    try{
        // chaeck is user already exists
        const exists = await UserModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        } 

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"})
        }
        
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create new user
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        
        // generate token
        const token = createToken(user._id);
        res.json({success:true, message:"User registered successfully",token})

  
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Registration failed"})
    }

    
}


export {loginUser,registerUser}