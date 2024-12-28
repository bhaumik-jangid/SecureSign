import {connectToMongo} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from "@/utils/mailer";
import bcryptjs from 'bcryptjs';
import crypto from "crypto";

connectToMongo();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, emailType} = reqBody

        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcryptjs.hash(token.toString(), 10);
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);

        const user = await User.findOneAndUpdate(
            { email },
            {
                emailVerifyToken: hashedToken,
                emailVerifyTokenExpire: expirationTime,
            },
            { new: true }
        );
            
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }
            
        if ( emailType === "VERIFY" && user.isVerified) {
            return NextResponse.json({ message: "Already verified" }, { status: 400 });
        }

        await sendEmail({
            username: user.username,
            email, 
            emailType: emailType, 
            userID: user._id,
            token: hashedToken
        })
        
        return NextResponse.json({message: "Email sent successfully", success: true})

    } catch (error) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}