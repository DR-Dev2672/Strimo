"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {CheckCheck,Copy} from "lucide-react";

interface CopyButtonProps{
    value?:string;
}

export const CopyButton=({
    value
}:CopyButtonProps)=>{
    const [isCopied,setIsCopied]=useState(false);

    const onCopy=()=>{
        if(!value){
            return;
        }
        navigator.clipboard.writeText(value);
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
        },1000)


    }

    const Icon=isCopied?CheckCheck:Copy;
    
    return (
        <Button
        onClick={onCopy}
        >
            <Icon className="h-4 w-4"/>
        </Button>
    )
}