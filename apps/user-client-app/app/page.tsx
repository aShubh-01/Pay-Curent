"use client"
import { useGetBalance, useSetBalance } from '@repo/store/balanceHooks';


export default function Home() {
  useSetBalance(200)
  const value = useGetBalance();
  return (
    <div>{value}</div>
  );
}
