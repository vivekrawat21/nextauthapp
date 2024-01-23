import nodemailer from 'nodemailer';
import User from  '@/models/user.model';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        //create a hash token
   const hashedToken  =   await bcryptjs.hash(userId.toString(),10);

   if(emailType === 'VERIFY'){
     await User.findByIdAndUpdate(userId,{
        verifyToken:hashedToken,
        verifyTokenExpiry:Date.now()+360000
        },
        {new:true}
     );
    }
    else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now()+360000
            },
            {new:true}
        )
    }
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.NODEMAILER_USERNAME,
          pass: process.env.NODEMAILER_PASSWORD
        }
    });

    const mailOption = {
        from: "vivekrwt2111@gmail.com",
        to: email,
        subject: emailType === "VERIFY" ? 'Verify your email' : 'Reset your password',
        html: `<p>Click <a href="${process.env.domain}${emailType === "VERIFY" ? '/verifyemail' : '/forgotpassword'}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copypaste the link below in your browser <br>${process.env.domain}${emailType === "VERIFY" ? '/verifyemail' : '/forgotpassword'}?token=${hashedToken}</p>`
    };
    
      
   const mailresponse = await transport.sendMail(mailOption);
   return mailresponse;
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}