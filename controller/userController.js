
import User from '../models/user.js';

export const postAddUser = async(req, res)=>{

     try{

        const{name,email,password} = req.body;

        User.create({
            name,email,password
        })
        .then(result=>{
            res.status(201).json({message:"User created successfully",data:result})
        })
     }
     catch(err){
        console.log(err);
        res.status(500).json({error:"Validation error"});
     } 
}

export const postLogin = async (req,res)=>{

    try{
        const {email,password} = req.body;

        const user = await User.findOne({

            where:{
                email:email
            }
        })

         if(user){
            if(user.password===password){
                return res.status(200).json({message:"User login success",user:user})
            }
            else{
                return res.status(401).json({error:"User not authorized"});
            }

         }
         else{
             return res.status(404).json({error:"User not  found"});
         }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }
}
      

