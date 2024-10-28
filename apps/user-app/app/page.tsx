"use client"

import { useGetBalance, useSetBalance } from "@repo/store/hooks"
import { useEffect } from "react";

export default function Home() {
  const value : number = useGetBalance();
  
  return <div>
    {value}
  </div>
}
