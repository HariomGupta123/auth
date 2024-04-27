import nodemailer from "nodemailer"
import bcrypedjs from "bcryptjs"
import User from "@/models/userModels"
export const sendEmail= async({email,emailType,userId})=>{
   try {
    const hashedToken=await bcrypedjs.hash(userId.toString(),10)
    if(emailType ==="VERIFY"){
      await User.findByIdAndUpdate(userId,{verifyToken :hashedToken,verifyTokenEpiry:Date.now() +3600000})
    }else if(emailType ==="RESET"){
      await User.findByIdAndUpdate(userId,{forgotpasswordToken:hashedToken, forgotPasswordTokenExpiry:Date.now() + 3600000})
    }
   var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9d2044f01f08df",
    pass: "c87eef122befdd"
  }
});
const mailOptions={
    from: 'hg7716505@gmail.com',
    to: email, 
    subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", 
    text: "Hello world?", // plain text body
    html: `<p>Click <a href ="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType ==="VERIFY" ? "verify your email":"reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}<p/>`,
}
const mailResponse= await transport.sendMail(mailOptions)
    return mailResponse
   } catch (error:any) {
    throw new Error(error.message)
    
   }
}