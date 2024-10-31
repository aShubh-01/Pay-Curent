import prisma from "@repo/database/client";
import { AddMoney } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransaction";
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

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: { userId: parseInt(session?.user?.id) },
    })

    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function Page({ children } : {
    children : React.ReactNode
}) {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className='w-full p-2'>
        <h3 className='text-blue-500 font-bold text-[30px]'>Transfer</h3>
        <section className='pt-10 flex justify-around'>
            <div className='w-[600px] h-[320px] rounded-lg p-1 bg-slate-100'>
                <AddMoney />
            </div>
            <div className='w-[600px] p-1'>
                <div className='bg-slate-100 m-1 mb-2'><BalanceCard amount={balance.amount} locked={balance.locked}/></div>
                <div className='bg-slate-100 m-1 mt-2'><OnRampTransactions transactions={transactions}/></div>
            </div>
        </section>
    </div>
}

