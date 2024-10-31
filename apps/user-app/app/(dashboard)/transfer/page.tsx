import { AddMoney } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransaction";
import React from "react";


export default function Page({ children } : {
    children : React.ReactNode
}) : JSX.Element {
    return <div className='w-full'>
        <h3>Transfer</h3>
        <section className='flex justify-around'>
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={1000} locked={500}/>
                <OnRampTransactions transactions={[]}/>
            </div>
        </section>
    </div>
}