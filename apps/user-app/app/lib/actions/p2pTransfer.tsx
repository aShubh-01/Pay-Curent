"use server"

import { getServerSession } from 'next-auth';
import { authOptions } from "../auth";
import prisma from "@repo/database/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);

    const from = session?.user?.id;
    if(!from) return {
        message: "Unauthorized Request"
    }

    const toUser = await prisma.user.findFirst({
        where: { number: to },
        select: { id: true }
    });

    if(!toUser) return {
        message: "User not found"
    }

    await prisma.$transaction(async (txn) => {
        await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        const fromUser = await txn.balance.findFirst({
            where: { userId: Number(from) }
        });

        const txnTime = new Date();

        if(!fromUser || fromUser.amount < amount) throw new Error('Insufficient Funds');
 
        await txn.balance.update({
            where: { userId: parseInt(from)},
            data: { amount: { decrement: amount}}
        });

        await txn.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } }
        });

        await txn.p2PTransactions.create({
            data: {
                toUserId: Number(toUser.id),
                fromUserId: Number(from),
                amount: amount,
                timestamp: txnTime
            }
        });
    })
}