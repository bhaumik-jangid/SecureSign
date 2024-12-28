import {connectToMongo} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import axios from "axios";

connectToMongo();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        
        const saveUser = newUser.save();
        await axios.post(`${process.env.DOMAIN}/api/user/sendVerificationEmail`,{email, emailType: "VERIFY"});


        return NextResponse.json({message: "User created successfully", success: true, saveUser}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
        console.log("caught in catch block")
    }
}