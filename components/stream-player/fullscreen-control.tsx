"use client";
import {Minimize,Maximize} from "lucide-react"
import { Hint } from "../hint";

interface FullscreenControlProps{
 isFullScreen:boolean;
 onToggle:()=>void;
}

export const FullscreenControl=({
    isFullScreen,
    onToggle
}:FullscreenControlProps
)=>{
    const Icon=isFullScreen?Minimize:Maximize;
    const label=isFullScreen?"Exit Fullscreen":"Enter Fullscreen";
    return(
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                 <button
                 onClick={onToggle}
                 className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                 >
                    <Icon className="w-6 h-6"/>
                 </button>
            </Hint>
           
        </div>
    )
}