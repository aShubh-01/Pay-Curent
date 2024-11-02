"use client";

import { Card } from "@repo/ui/card";
import React from "react";

interface Transaction {
    time: Date,
    amount: number,
    flow: string,
    provider: string
}

export const OnRampTransactions =({
    transactions
}: {
    transactions: Transaction[]
}) => {
    let key = 1
    
    return <Card title="Wallet Transactions">
        {(transactions.length < 1) && 
            <div className='bg-slate-white text-center font-semibold'>
                No Recent Transactions
            </div>
        }
        {(transactions.length >= 1) &&
            <div className='font-semibold'>
                {transactions.map((t: Transaction) => {
                    return <div key={key++} className='m-1 p-2 rounded-md bg-white flex justify-between gap-1'>
                        <div className='flex justify-start gap-1'>
                            <div>
                                {t.flow == 'Credit' ? "Credited INR" : "Debited INR"}
                            </div>
                            <div>
                                {
                                    t.time.toDateString() + ", " 
                                    + t.time.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true})
                                }
                            </div>
                        </div>
                        {(t.flow == 'Credit') &&
                            <div className='text-green-400'>
                                + Rs. {t.amount / 100}
                            </div>
                        }
                        {(t.flow == 'Debit') &&
                            <div className='text-red-400'>
                                - Rs. {t.amount / 100}
                            </div>
                        }
                    </div>
                })}
            </div>
        }
    </Card>
}