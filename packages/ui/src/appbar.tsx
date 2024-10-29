"use client";

import { Button } from './button';

interface AppBarInterface {
    user? : {
        name? : string | null
    } | null,
    onSignIn: any,
    onSignOut: any
}

export const AppBar = ({ user, onSignIn, onSignOut } : AppBarInterface) => {
    return <div className='flex jusity-between'>
        <div>
            Pay Current
        </div>
        <div>
            <Button
                className=''
                onClick={ user ? onSignOut : onSignIn }
            >
                {user ? 'Logout' : 'Login'}
            </Button>
        </div>
    </div>
}