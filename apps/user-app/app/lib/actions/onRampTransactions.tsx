"use server"

import prisma from "@repo/database/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if(!session?.user) {
        return {
            message: "Unauthenticated Request"
        }
    }

    try {
        const token = Math.random().toString();
        await prisma.onRampTransaction.create({
            data: {
                provider,
                status: 'Processing',
                startTime: new Date(),
                flow: 'Credit',
                token: token,
                userId: parseInt(session.user?.id),
                amount: amount
            }
        })

        return {
            message: 'Transaction Started'
        }
    } catch (err) {
        console.error(err);
        return {
            message: 'Unable to start txns'
        }
    }
}