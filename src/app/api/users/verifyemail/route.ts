import{ connect} from '@/dbConfig/dbConfig'
 import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/user.model';
connect();

export  async function POST(req:NextRequest){
    try {
       const reqBody = await req.json();
       const {token} = reqBody
       console.log(token);
       const user = await User.findOne({verifyToken:token,
        verifyTokenExpiry :{$gt: new Date()}}
    );
    console.log(user);
    if(!user){
        // console.log("no user found")
        return NextResponse.json({error:"Invalid token"},{status:400})
    }
    user.isVarified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
   console.log(user);
    return NextResponse.json({
        message:"Email varified successfully",
        success:true,
    })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status:500
        })
    }
}