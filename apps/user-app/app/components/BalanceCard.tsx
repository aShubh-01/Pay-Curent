import { Card } from "@repo/ui/card";

export const BalanceCard = ({ amount, locked} : {
    amount: number;
    locked: number;
}) => {
    return <Card title="Balance">
        <div className='flex justify-between border-b border-slate-300 py-2'>
            <label> Unlocked balance </label>
            <div> {amount / 100 } INR</div>
        </div>
        <div className='flex justify-between border-b border-slate-300 py-2'>
            <label> Locked balance </label>
            <div> {locked / 100 } INR</div>
        </div>
        <div className='flex justify-between border-b border-slate-300 py-2'>
            <label> Total balance </label>
            <div> {(amount + locked) / 100 } INR</div>
        </div>
    </Card>
}