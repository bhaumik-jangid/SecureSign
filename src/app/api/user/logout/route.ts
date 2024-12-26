import {connectToMongo} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from 'next/server'

connectToMongo();

export async function POST(request: NextRequest){
    try {
        const response = NextResponse.json({message: "User logged out successfully", success: true}, {status: 200})
        response.cookies.set("token", "", {
            httpOnly: true,
            path: "/",
            expires: new Date(0), // Expire the cookie immediately
        });
        console.log("LOgout complted");

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}