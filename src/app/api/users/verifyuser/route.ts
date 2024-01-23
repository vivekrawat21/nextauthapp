import{ connect} from '@/dbConfig/dbConfig'
 import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/user.model';
import { sendEmail } from '@/helpers/mailer';
connect();

export  async function POST(req:NextRequest){
    try {
       const reqBody = await req.json();
       const {userEmail} = reqBody
       console.log(userEmail);
       const user = await User.findOne({
        email:userEmail
       }
    );
    console.log(user);
    if(!user){
        // console.log("no user found")
        return NextResponse.json({message:"User not found"},{status:400})
    }
       //send verifucation email
       await sendEmail({
        email:userEmail,emailType:'RESET',userId: user._id
      });
    return NextResponse.json({
        message:"user varified successfully check email for forgot password",
        success:true,
    })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status:500
        })
    }
}