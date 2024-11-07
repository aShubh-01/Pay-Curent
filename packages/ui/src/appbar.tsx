"use client";

import { Button } from './button';

interface AppBarInterface {
    user? : {
        name? : string | null
    } | null,
    onSignIn: () => void,
    onSignOut: () => void
}

export const AppBar = ({ user, onSignIn, onSignOut } : AppBarInterface) => {
    return <div className='md:text-[20px] text-[15px] flex justify-between border-0 border-b-2 border-black p-2 place-items-center'>
        <div className='md:text-[25px] font-bold'>
            Pay Current
        </div>
        <div>
            <Button
                className='bg-black p-2 text-white rounded-md px-4 font-semibold'
                onClick={ user ? onSignOut : onSignIn }
            >
                {user ? 'Logout' : 'Login'}
            </Button>
        </div>
    </div>
}