"use client"

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon} : {
    href: string;
    title: string;
    icon: React.ReactNode
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = (pathname === href)

    return <div className={`md:text-[20px] md:my-3
            hover:border-black px-[5px] text-[12px] font-semibold p-[2px] m-1 border-b-[1px] border-white flex ${selected ? 'text-blue-600' : 'text-black'} cursor-pointer gap-1 place-items-center`}
        onClick={() => {
            router.push(href)
        }}
    >
        <div> {icon} </div>
        <div> {title} </div>
    </div>
}