import{ connect} from '@/dbConfig/dbConfig'
 import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/user.model';
import bcryptjs from "bcryptjs";
connect();

export  async function POST(req:NextRequest){
    try {
       const reqBody = await req.json();
       const {token , password} = reqBody
       console.log(token);
       const user = await User.findOne({forgotPasswordToken:token,
        forgotPasswordTokenExpiry :{$gt: new Date()}}
    );
    console.log(user);
    if(!user){
        // console.log("no user found")
        return NextResponse.json({error:"Invalid token"},{status:400})
    }

    //hashing password
    const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password,salt);

      
    user.password = hashedPassword;   
    user.forgotPasswordToken= undefined;
    user.forgotPasswordTokenExpiry= undefined;
    await user.save();
   console.log(user);
    return NextResponse.json({
        message:"Password reset successfully",
        success:true,
    })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status:500
        })
    }
}