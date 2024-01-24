import { NextResponse } from "next/server";

export async function GET(){
    try{
   const response: NextResponse = NextResponse.json({
    message :"user logout successfully",
    success: true,  }
   )
   await response.cookies.set("token" , "",
   { 
    httpOnly: true , expires: new Date(0)
}
);
// console.log(response.cookies.get("token") );
   return response;
    }
    catch(error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}