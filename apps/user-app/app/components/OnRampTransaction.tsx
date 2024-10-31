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
    
    return <Card title="Recent Transactions">
        {(transactions.length < 1) && 
            <div>
                No Recent Transactions
            </div>
        }
        {(transactions.length >= 1) &&
            <div>
                {transactions.map((t: Transaction) => {
                    return <div>
                        <div>
                        </div>
                    </div>
                })}
            </div>
        }
    </Card>
}