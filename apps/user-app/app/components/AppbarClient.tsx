"use client"

import { AppBar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function AppbarClient(): JSX.Element {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <AppBar user={session.data?.user} onSignIn={signIn} onSignOut={async () => {
        await signOut();
        router.push('api/auth/signin')
      }} />
    </div>
  )
}
