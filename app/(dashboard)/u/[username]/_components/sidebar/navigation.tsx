"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Fullscreen, KeyRound, MessageSquare, Users, } from "lucide-react";

export const Navigation = () => {
    const pathname = usePathname();
    const { user } = useUser();

    const routes = [
        {
            label: "Stream",
            href: `u/${user?.username}`,
            icon: Fullscreen,
        },
    ]

    return (
        <div>
            Navigation
        </div>
    )
}