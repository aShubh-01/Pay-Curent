"use client";

import { useEffect, useState } from "react";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../lib/actions/p2pTransfer";

export default function SendMoney () : JSX.Element {
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        console.log()
    })

    return <div className='bg-slate-100 rounded-lg shadow-md h-fit w-fit'>
        <Card title="Send Money">
            <TextInput label="Phone Number" placeholder="Number" onChange={setNumber}/>
            <TextInput label="Amount" placeholder="Amount (in Rs)" onChange={setAmount}/>
            <div className='flex justify-center'>
                <Button className='text-white bg-slate-900 p-2 px-5 font-bold rounded-md' onClick={async () => {
                    await p2pTransfer(number, (parseInt(amount) * 100))
                }}>Send</Button>
            </div>
        </Card>
    </div> 
    
}