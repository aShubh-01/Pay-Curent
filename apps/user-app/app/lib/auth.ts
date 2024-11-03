import prisma from "@repo/database/client";
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: 'Phone Number', type: 'text', placeholder: '1234567890'},
                password: { label: 'Password', type: 'password', placeholder: 'password'}
            },

            async authorize(credentials: any) : Promise<{
                id: string,
                name: string | null,
                contact: string
            } | null> {
                // zod and otp logic
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if(existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if(passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser?.name || "",
                            contact: existingUser.number
                        }
                    }

                    return null
                }

                try {
                    let newUser : {
                        id: number,
                        name: string | null,
                        number: string
                    } = {
                        id:  0,
                        name: "",
                        number: ""
                    }

                    await prisma.$transaction(async (txn) => {
                        const user = await txn.user.create({
                            data: {
                                number: credentials.phone,
                                password: hashedPassword
                            },
                            select: { id: true, number: true, name: true }
                        });
    
                        await txn.balance.create({
                            data: {
                                userId: user.id,
                                amount: 0,
                                locked: 0
                            }
                        })

                        newUser = user;
                    })

                    return {
                        id: newUser.id.toString(),
                        name: newUser?.name || "",
                        contact: newUser.number
                    }

                } catch (err) {
                    console.error(err)
                }

                return null
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session } : any) {
            session.user.id = token.sub;
            return session
        }
    }
}