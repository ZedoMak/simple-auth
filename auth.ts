import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from "@/lib/prisma" 
import bcrypt from "bcrypt"
import Email from "next-auth/providers/email"

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                // find the user in the database
                const user = await prisma.user.findUnique({
                    where: {email: credentials.email as string}
                })

                // check if user exists and has a password

                if (!user || !user.password) return null

                // compare the entered password with the hashed one in the databse

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )
                
                if(!isPasswordCorrect) return null

                return user
            }
        })
    ],

    session: {strategy: "jwt"},
})

