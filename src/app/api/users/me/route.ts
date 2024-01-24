import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest){
    try {
     const userId =  await getDataFromToken(request);
      const user = await User.findById({_id:userId}).select("-password -isAdmin");
      return NextResponse.json({
        message:"User found ",
        data: user
      });
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        },{status:400})
        
    }
}