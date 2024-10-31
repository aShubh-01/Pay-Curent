import { Card } from "@repo/ui/card";

interface Transaction {
    time: Date,
    amount: number,
    status: string,
    provider: string
}

export const OnRampTransactions =({
    transactions
}: {
    transactions: Transaction[]
}) => {
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
                    return <div key={key++} className='flex justify-start gap-1'>
                        <div>
                            Received INR,
                        </div>
                        <div>
                            {t.time.toDateString()},
                        </div>
                        <div className='text-green-400'>
                            + Rs. {t.amount / 100}
                        </div>
                    </div>
                })}
            </div>
        }
    </Card>
}