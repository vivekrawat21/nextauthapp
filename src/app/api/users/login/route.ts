import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model.js";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

connect()

export async function POST(request:NextRequest){
    try {
     const reqBody =  await request.json();
     const { email , password }= reqBody;
     console.log(reqBody);

     //check user if already exist
      const user = await User.findOne({email});
      console.log(user);
      if (!user){
        return NextResponse.json({error:"user does not exist"},{status:400});
      }


      // password validation
      const validPassword = await bcryptjs.compare(password, user.password);
  
      if (!validPassword){
        return NextResponse.json({error:"Invalid Password"},{status:400});

      }
      if(user.isVarified==false){
        return NextResponse.json({error:"Your email is not varified"},{status:400});
      }
  
      //create token data
      const tokenData = {
        id:user._id,
        username: user.username,
        email :user.email
      }
    
     //create token 
     const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET! , {expiresIn:"1d"});
     
     const response = NextResponse.json({
        message: "login successfully",
        success:true,
      });
     cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
    })
 
    return response;
    } catch (error: any) {
        console.log("authentication error");
        return  NextResponse.json(
            {error:error.message},{status:500});
        
    }
}