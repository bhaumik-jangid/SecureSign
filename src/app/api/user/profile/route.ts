import {connectToMongo} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import DataFromJWT from "@/utils/DataFromJWT";

connectToMongo();

export async function POST(request: NextRequest){

    try {
        const userId = await DataFromJWT(request);
        const user = await User.findOne({_id: userId}).select("-password");
        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        return NextResponse.json({message: "User Found", data: user}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}