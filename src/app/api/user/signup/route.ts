import {connectToMongo} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import { sendEmail } from "@/utils/mailer";

connectToMongo();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        //validation
        console.log(reqBody)

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        
        const saveUser = newUser.save();
        console.log("User saved succesfully", saveUser)
        
        await sendEmail({username, email, emailType: "VERIFY", userID: newUser._id})

        return NextResponse.json({message: "User created successfully", success: true, saveUser}, {status: 201})

    } catch (error) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}