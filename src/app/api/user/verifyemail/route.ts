import {connectToMongo} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from "@/utils/mailer";

connectToMongo();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody;

        const user = await User.findOne(
            {
                emailVerifyToken: token,
                emailVerifyTokenExpire: { $gt: Date.now() },
            }
        );

        if (!user) {
            return NextResponse.json(
                { message: "Invalid token" }, 
                { status: 400 }
            );
        }

        if (user.emailVerifyTokenExpire < Date.now()) {
            return NextResponse.json(
              { message: "Token expired" },
              { status: 401 }
            );
          }

        user.isVerified = true;
        user.emailVerifyToken = undefined;
        user.emailVerifyTokenExpire = undefined;

        await user.save();
        await sendEmail({username: user.username,email: user.email, emailType: "CONFIRM", userID: user._id})
        return NextResponse.json({message: 'Email verified succesfully'}, {status: 201})

    } catch (error) {
        return NextResponse.json({error: (error as Error).message || "An unexpected error occurred"}, {status: 500})
    }
}