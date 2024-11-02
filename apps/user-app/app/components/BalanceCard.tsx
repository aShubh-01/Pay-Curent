import { Card } from "@repo/ui/card";

export const BalanceCard = ({ amount, locked} : {
    amount: number;
    locked: number;
}) => {
    return <Card title="Balance">
        <div className='flex text-[18px] font-semibold justify-between border-b border-t border-slate-300 py-2'>
            <label> Expendable </label>
            <div className='text-green-500'> {amount / 100 } INR</div>
        </div>
        <div className='flex text-[18px] font-semibold justify-between border-b border-slate-300 py-2'>
            <label> Locked </label>
            <div className='text-red-500'> {locked / 100 } INR</div>
        </div>
        <div className='flex text-[18px] font-semibold justify-between border-b border-slate-300 py-2'>
            <label> Total balance </label>
            <div> {(amount + locked) / 100 } INR</div>
        </div>
    </Card>
}