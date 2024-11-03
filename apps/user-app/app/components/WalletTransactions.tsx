"use client";

import { Card } from "@repo/ui/card";
import React from "react";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

interface Transaction {
    time: Date,
    amount: number,
    flow: string,
}

export const OnRampTransactions =({
    transactions
}: {
    transactions: Transaction[]
}) => {
    const router = useRouter();
    let key = 1
    
    return <Card title="Recent Transactions">
        {(transactions.length < 1) && 
            <div className='bg-slate-white text-center font-semibold'>
                No Recent Transactions
            </div>
        }
        {(transactions.length >= 1) &&
            <div className='font-semibold'>
                {transactions.map((t: Transaction) => {
                    return <div key={key++} className='m-1 p-2 rounded-md bg-white flex justify-between place-items-center gap-1'>
                        <div className='grid grid-cols-1 gap-1'>
                            <div>
                                {t.flow == 'Credit' ? "Credited INR" : "Debited INR"}
                            </div>
                            <div className='pl-1 text-[15px]'>
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
                <div className='pt-2 pl-2'>
                    <Button className='p-3 rounded-full text-white bg-slate-800' onClick={() => router.push('/transactions')}>
                        View all Transactions
                    </Button>
                </div>
            </div>
        }
    </Card>
}