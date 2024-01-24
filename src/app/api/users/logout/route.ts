import { NextResponse } from "next/server";

export async function GET(){
    try{
   const response = NextResponse.json({
    message :"user logout successfully",
    success: true,
   });
   response.cookies.set("token" , "",
   { httpOnly: true , expires: 0
});
var cookie:any = response.cookies.get("token");
// console.log(response.cookies.get("token") );
   return response;
    }
    catch(error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}