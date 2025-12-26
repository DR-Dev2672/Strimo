"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { X } from 'lucide-react';
import { Search } from 'lucide-react';
import { Questrial } from "next/font/google";
import qs from "query-string";
import { useRouter } from "next/navigation";


export default function SearchPage() {
    const [value,setValue]=useState("");
    const router=useRouter();
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!value) return;
        const url=qs.stringifyUrl({
            url:"/search",
            query:{term:value},
        },{skipEmptyString: true});

        router.push(url);
       
    }


     const onClear = () => {
    setValue("");
  };
    return (
        <form onSubmit={onSubmit}
        className="relative w-full lg:w-400px flex items-center">
            <Input
             value={value}
             onChange={(e)=>setValue(e.target.value)}
             placeholder="search" 
             className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
             />
             <X 
             className="absolute top-2.5 right-12 h-5 w-5 text-muted-foreground"
             onClick={onClear}/>

             <Button type="submit" variant="secondary" className="rounded-l-none  bg-blue-500 hover:bg-blue-400 px-3">
                <Search className="h-5 w-5 text-muted-foreground"/>
             </Button>
        </form>
    );
}