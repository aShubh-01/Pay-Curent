"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from 'react';
import { createOnRampTransaction } from "../lib/actions/onRampTransactions";

const SUPPORTED_BANKS = [{
    name: 'HDFC Bank',
    redirectTo: 'https://netbanking.hdfcbank.com'
}, {
    name: 'Axis Bank',
    redirectTo: 'https://www.axisbank.com'
}]

export const AddMoney = () => {
    const [ redirectUrl, setRedirectUrl ] = useState(SUPPORTED_BANKS[0]?.redirectTo)
    const [ provider, setProvider ] = useState(SUPPORTED_BANKS[0]?.name || "")
    const [ amount, setAmount ] = useState(0);

    return <Card title="Add Money to Wallet">
        <div className='w-full'>
            <TextInput label='Amount' placeholder='Amount (in Rupees)' onChange={setAmount}/>
            <div>
                <label className='font-semibold text-[18px]'>Bank</label>
                <Select 
                    onSelect={(value) => {
                        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectTo)
                    }}
                    options={ SUPPORTED_BANKS.map(bank => ({
                        key: bank.name,
                        value: bank.name
                    }))}
                />
            </div>
            <div className='flex justify-center pt-4'>
                <Button 
                    className='text-[20px] bg-black text-white font-semibold py-2 px-4 rounded-md'
                    onClick={async () => {
                        await createOnRampTransaction(provider, amount * 100)
                        window.location.href = redirectUrl || "";
                    }}> 
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}