"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import Link from "next/link";

interface UserItemProps{
    imageUrl: string;
    username: string;

};


export const UserItem=({
    imageUrl,
    username,
}:UserItemProps)=>{

    const {collapsed}=useSidebar((state)=>state)
    const href=`/${username}`
    return (
        <>
        <Button asChild
        variant="ghost"
        className={cn("w-full h-12",
            collapsed ?"justify-center":"justify-start",


        )}>
            <Link href={href}>

                <div className={cn("flex items-center w-full gap-x-4",
                    collapsed && "justify-center"
                )}>

                    <UserAvatar
                     imageUrl={imageUrl}
                     username={username}
                    />
                    {!collapsed &&(
                     <p className="truncate">
                        {username}
                        </p>)
                        }

                </div>

            </Link>
            
        </Button>
        
        </>

    )
}