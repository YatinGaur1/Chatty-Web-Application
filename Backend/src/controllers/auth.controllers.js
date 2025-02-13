import {User} from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utiles/jwt.utile.js";

export const signup= async(req, res) => {
  const {fullName,email,password}=req.body;
    try {
     if(password.length<6){ 
      res.status(400).json({message:"password must be at least 6 length"});
     } 
     
     if(!(fullName||email))
     {
      res.status(200).json({message:"All credentials are required"})
     }

     const user=await User.findOne({email});

     if(user) res.status(400).json({message:"User already exists"});

     const salt=await bcrypt.genSalt(10);
     const hashedPassword=await bcrypt.hash(password,salt);

     const newUser=new User(
      {
        fullName,
        email,
        password:hashedPassword,
      }
     )

     if(newUser)
     {
        generateToken(newUser._id,res);
        await newUser.save();
        
        res.status(201).json({
          _id:newUser._id,
          fullName:newUser.fullName,
          email:newUser.email,
          profilepic:newUser.profilePic,
        })
     }
     else{
      res.status(400).json({message:"Invalid user credentials"});
     }
    }

    catch (error) {
      console.log("Error in sighup",error.message);
      res.status(500).json({message:"Internal server error"});
      
    }
  }
  
export const login= (req, res) => {
    res.send("login route");
  }
export const logout= (req, res) => {
    res.send("logout route");
  } 
  