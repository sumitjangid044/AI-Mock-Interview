"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
    const path = usePathname();

    const menu = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Questions", path: "/dashboard/questions" },
        // { name: "Upgrade", path: "/upgrade" },
        { name: "How It Works?", path: "/dashboard/work" },
    ];

    return (
        <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
            <Image src="/logo.svg" width={160} height={100} alt="logo" />

            <ul className="hidden md:flex gap-6">
                {menu.map((item) => (
                    <li key={item.path}>
                        <Link
                            href={item.path}
                            className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path === item.path ? "text-primary font-bold" : ""}`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <UserButton />
        </div>
    );
}

export default Header;
