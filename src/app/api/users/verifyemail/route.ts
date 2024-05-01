import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels"
connect()
export async function POST(request:NextRequest) {
    try {
        const resBody=await request.json()
        const {token}=resBody
        console.log(token)
      const user=await User.findOne({verifyToken:token,verifyTokenExpir:{$gt:Date.now()}})
      console.log(user)
      if(user!){
        return NextResponse.json({error:"invalid token"},{status:400})
      }
      user.isVerified=true 
      user.verifyToken=undefined
      user.verifyTokenEpiry=undefined
      await user.save()
     return NextResponse.json({message:"email verified successfully",success: true},{status:500})
         
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
    
}