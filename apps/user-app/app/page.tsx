"use client"

import { AppBar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return <div>
    <AppBar 
      user={session.data?.user}
      onSignIn={signIn}
      onSignOut={signOut}
    />
  </div>
}
