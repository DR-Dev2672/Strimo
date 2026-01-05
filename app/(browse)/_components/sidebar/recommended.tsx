"use client"
import { useSidebar } from "@/store/use-sidebar"

export  function Recommended() {
    const {collapsed}=useSidebar((state)=>state);
    return (
        <>{
            !collapsed && 
           <div className="pl-6 mb-4">
                <p className="text-sm text-muted-foreground">Recommended</p>
                </div>
        }
        
        </>
    );
}