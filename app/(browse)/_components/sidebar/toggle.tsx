"use client"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowRightFromLine } from 'lucide-react';
import { ArrowLeftFromLine } from 'lucide-react';
export  function Toggle() {
     const {collapsed,onExpand,onCollapse}=useSidebar((state)=>state);
    return (  
        <>
        {collapsed && <div className=" lg:flex w-full items-center justify-center pt-4 mb-4">
           <Button
            onClick={onExpand} >
            <ArrowRightFromLine />
             </Button>
        </div>}
        {!collapsed &&<div className="p-3 pl-6 mb-2 flex items-center w-full">
           <Button
           onClick={onCollapse} >
            <ArrowLeftFromLine />
             </Button>
        </div>}
        
        </>
    );
}

export  const ToggleSkeleton=()=>{
    return (
        <div>
            <Skeleton className="h-4 w-[100]"/>
        </div>
    )
}