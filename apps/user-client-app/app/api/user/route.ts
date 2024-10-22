import { NextResponse } from 'next/server';
import { PrismaClient } from '@repo/database/client';

const prisma = new PrismaClient();

export const GET = async () => {
    await prisma.user.create({
        data: {
            email: 'shubhamdhokare01@gmail.com',
            password: '123456'
        }
    })

    return NextResponse.json({
        message: 'Created User'
    })
}