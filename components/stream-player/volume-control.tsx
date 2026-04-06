"use client ";
import {Volume1,Volume2,VolumeX} from "lucide-react";
import { Hint } from "../hint";
import { Slider } from "../ui/slider";

interface VolumeControlProps{
 onToggle:()=>void,
 value:number,
 onChange:(value:number)=>void
}



// Kitna masoom rangeen hai yeh sama
// Husn aur ishq ki aaj mairaaj hai
// Husn aur ishq ki aaj mairaaj hai
// Kal ki kis ko khabar jaane jaan
// Rok lo aaj ki raat ko

export const VolumeControl=({
    onToggle,
    value,
    onChange
}:VolumeControlProps)=>{

    const handleChange=(value:number[])=>{
        onChange(value[0]);
    }

    const isMuted=value===0;
    const isAboveHalf=value>50;

    let Icon=Volume1;
    if(isMuted){
        Icon=VolumeX;   
    }
    else if(isAboveHalf){
        Icon=Volume2;
    }
    const label=isMuted?"Unmute":"Mute";
    return(
        <div className="flex items-center gap-2">
           <Hint label={label} asChild>
            <button
            onClick={onToggle}
            className="text-white hover:bg-white/10 p-1.5 rounded-lg" >
                <Icon className="w-6 h-6"/>
            </button>
           </Hint>
           <Slider
            className="w-8rem cursor-pointer"
            onValueChange={handleChange}
            value={[value]}
            max={100}
            step={1}
           />
        </div>
    )
}