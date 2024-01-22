import { connect } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
   const respose = NextResponse.json({
    status: 200,
    message :"user logout successfully",
    success: true,
   });
   respose.cookies.set("token","",
   {httpOnly:true});

   return respose;
    }
    catch(error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}