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
                password:{label:'password',type:'password'},
                worker:{label:'Role',type:'text'}
            },
            async authorize(credentials)
            {
                if(!credentials?.email||!credentials?.password )
                {
                    throw new Error ("Invalid Credentials")
                }
                if (credentials.worker == 'yes')
                {
                    console.log("i am inside worker")
                    const worker = await prisma?.workers.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })
                    if (!worker || !worker?.hashedPassword) {
                        throw new Error("User not found")
                    }
                    const isCorrectPassword = await bcrypt.compare(credentials.password, worker.hashedPassword);
                    if (!isCorrectPassword) {
                        throw new Error('Password not Correct')
                    }
                    return worker;
                }
                if (credentials.worker == 'no')
                {
                    const guest = await prisma.guest.findUnique({
                        where:{
                            email:credentials.email
                        }
                    })
                    if(!guest || !guest?.hashedPassword)
                    {
                        throw new Error ("Guest not found")
                    }
                    const isCorrectPassword = await bcrypt.compare(credentials.password,guest.hashedPassword)
                    if(!isCorrectPassword)
                    {
                        throw new Error("Enter correct Password")
                    } 
                    return guest;
                }
                else
                {
                    throw new Error("Please enter the correct Logic")
                }
                
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