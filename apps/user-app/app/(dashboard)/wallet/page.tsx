import prisma from "@repo/database/client";
import { AddMoney } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/WalletTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: { userId: parseInt(session?.user?.id)}
    })

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getTransactions() {
    let filteredP2PTransactions : {
        amount: number,
        time : Date,
        flow: string
    }[] = [];
    const session = await getServerSession(authOptions);

    const OnRampTransactions = await prisma.onRampTransaction.findMany({
        where: { 
            userId: parseInt(session?.user?.id),
            status: 'Success',

        },
        orderBy: { startTime: 'desc' },
        take: 3,
        select: {
            startTime: true,
            amount: true,
            flow: true
        }
    })

    const p2PTransactions = await prisma.p2PTransactions.findMany({
        where: {
            OR: [
                { fromUserId: Number(session.user.id) },
                { toUserId: Number(session.user.id) }
            ]
        },
        orderBy: { timestamp: 'desc' },
        take: 3,
        select: {
            fromUserId: true,
            timestamp: true,
            amount: true,
        }
    }) 

    p2PTransactions.forEach((txn : {
        fromUserId: number,
        timestamp: Date,
        amount: number
    }) => {
        filteredP2PTransactions.push({
            time: txn.timestamp,
            flow: (session.user.id == txn.fromUserId ? 'Debit' : 'Credit'),
            amount: txn.amount
        })
    })

    OnRampTransactions.forEach((t :  {
        startTime: Date,
        amount: number,
        flow: string
    }) => {
        filteredP2PTransactions.push({
            time: t.startTime,
            flow: t.flow,
            amount: t.amount
        })
    })

    filteredP2PTransactions.sort((a, b) => b.time.getTime() - a.time.getTime())

    return filteredP2PTransactions.filter((element, index) => {
        if (index < 3) return element;
    });
}

export default async function Page() : Promise<JSX.Element> {
    const balance = await getBalance();
    const transactions = await getTransactions();

    return <div className='w-full p-2'>
        <h3 className='text-blue-500 font-bold text-[30px]'>Wallet</h3>
        <section className='pt-10 flex justify-around'>
            <div className='w-1/2 m-1 h-fit rounded-lg p-3 bg-slate-100'>
                <BalanceCard amount={balance.amount} locked={balance.locked}/>
            </div>
            <div className='w-full mx-1'>
                <div className='p-3 bg-slate-100 m-1 rounded-lg mb-4'><AddMoney /></div>
                <div className='p-3 bg-slate-100 m-1 rounded-lg mt-2'><OnRampTransactions transactions={transactions}/></div>
            </div>
        </section>
    </div>
}

