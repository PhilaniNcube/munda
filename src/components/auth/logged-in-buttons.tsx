"use client";

import React from 'react';
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CircleUser, LogOutIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const LoggedInButtons = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div className="w-9 h-9 rounded-full bg-muted animate-pulse border border-gray-200" />;
    }

    if (!session) {
        return (
            <Avatar className="h-9 w-9 border border-gray-200">
                <AvatarFallback className="bg-gray-100 text-gray-400">
                    <CircleUser className="h-5 w-5" />
                </AvatarFallback>
            </Avatar>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-9 w-9 border border-gray-200">
                    <AvatarImage
                        src={session.user?.image || ""}
                        alt={session.user?.name || "User"}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-[#1a3821] text-white text-xs font-medium">
                        {session.user?.name?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                    <Button className="w-full" onClick={() => signOut()}>
                        <LogOutIcon className='mr-2' />
                        Logout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LoggedInButtons;