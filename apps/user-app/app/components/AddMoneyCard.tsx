"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from 'react';

const SUPPORTED_BANKS = [{
    name: 'HDFC Bank',
    redirectTo: 'https://netbanking.hdfcbank.com'
}, {
    name: 'Axis Bank',
    redirectTo: 'https://www.axisbank.com'
}]

export const AddMoney = () => {
    const [ redirectUrl, setRedirectUrl ] = useState(SUPPORTED_BANKS[0]?.redirectTo)
    const [ amount, setAmount ] = useState();

    return <Card title="Add Money">
        <div className='w-full'>
            <TextInput label='Amount' placeholder='Amount' onChange={() => {

            }}/>
            <div>
                <label className='font-semibold text-[18px]'>Bank</label>
                <Select 
                    onSelect={(value) => {
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
                    onClick={() => {
                        window.location.href = redirectUrl || "";
                    }}> 
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}