"use client";
import { useSidebar } from "@/store/use-sidebar";

export  function Following() {
   const {collapsed}=useSidebar((state)=>state);
       return (
           <>{

               !collapsed && 
              <div className="pl-6 mb-4">
                <p className="text-sm text-muted-foreground">Following</p>
                </div>
           }
           
           </>
       );
}