"use client"
import {User} from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar"
import { UserItem } from "./user-item";

interface RecommendedProps{
    data: User[];
}

export  function Recommended({data}:RecommendedProps ) {
    const {collapsed}=useSidebar((state)=>state);
    const showLabel= (!collapsed) && (data.length) >0;

    return (
        <>
            {showLabel && (
           <div className="pl-6 mb-4">
                <p className="text-sm text-muted-foreground">Recommended</p>
                </div>)}

            <ul className="space-y-2 px-2">
                {
                    data.map((user)=>(
                        
                        <UserItem 
                        key={user.id}
                        imageUrl={user.imageUrl}
                        username={user.username}
                        

                        />
                    ))
                }
            </ul>
        
        
        </>
    );
}