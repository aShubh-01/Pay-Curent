import { PrismaClient } from '@repo/database/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "Eg. 1234567890" },
                password: { label: "Password", type: "password" }
            },
            
            async authorize(credentials: any) {

                // zod & otp validation

                const hashedPassword = await bcrypt.hash(credentials?.password, 10);
                const exisitngUser = await prisma.user.findFirst({
                    where: { contact: credentials?.phone }
                });

                if(exisitngUser) {
                    const passwordValidation = await bcrypt.compare(credentials?.password, exisitngUser.password);
                    if(passwordValidation) {
                        return {
                            id: exisitngUser.id.toString(),
                            name: exisitngUser.name,
                            email: exisitngUser.email
                        }
                    }
                    return null;
                }

                try {
                    const user = await prisma.user.create({
                        data: {
                            contact: credentials.phone,
                            password: hashedPassword
                        }
                    })

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.contact
                    }
                } catch (err) {
                    console.error(err)
                }

                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session } : any) {
            session.user.id = token.sub
            return session
        }
    }
}