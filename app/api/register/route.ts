import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"
import bcrypt from "bcrypt"


export async function POST(req: Request) {
    try{
        const {email, password, name } = await req.json()

        // validation 
        if(!email || !password){
            return new NextResponse("Missing email or password", {status: 400})
        }

        // if the user already exists 

        const exists = await prisma.user.findUnique({
            where: {email}
        })

        if (exists){
            return new NextResponse("User already exists", {status: 400})
        }

        // hash the password to store it to the databse

        const hashedPassword = await bcrypt.hash(password, 10)

        // save to postgress through prisma

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        return NextResponse.json(user)

    }catch(err){
        return new NextResponse("Internal Error", {status: 500})
    }
    
}