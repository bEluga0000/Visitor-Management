import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import  CredentialsProvider  from "next-auth/providers/credentials";
import prisma from '@/libs/prismadb'
export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{label:'email',type:'text'},
                password:{label:'password',type:'password'}
            },
            async authorize(credentials)
            {
                if(!credentials?.email||!credentials?.password)
                {
                    throw new Error ("Invalid Credentials")
                }
                const worker = await prisma?.workers.findUnique({
                    where:{
                        email:credentials.email
                    }
                })
                if(!worker || !worker?.hashedPassword)
                {
                    throw new Error ("User not found")
                }
                const isCorrectPassword = await bcrypt.compare(credentials.password,worker.hashedPassword);
                if(!isCorrectPassword)
                {
                    throw new Error('Password not Correct')
                }
                return worker;
            }
        })
    ],
    debug:process.env.NODE_ENV === 'development',
    session:{
        strategy:'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)