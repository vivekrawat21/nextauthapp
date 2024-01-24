import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    try{
   const response: NextResponse = NextResponse.json({
    message :"user logout successfully",
    success: true,  }
   )
   cookies().delete('token')
// console.log(response.cookies.get("token") );
   return response;
    }
    catch(error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}