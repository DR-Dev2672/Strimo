"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CopyButton } from "./copy-button";

interface KeyCardProps {
  value: string | null;
};

export const KeyCard = ({
  value,
}: KeyCardProps) => {

    const [show,setShow]=useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">
          Stream Key
        </p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              placeholder="Stream key"
              disabled
              type={show?"text":"password"}
               value={value || ""}
            />
            <CopyButton value={value||""} />
          </div>
          <Button
          onClick={()=>setShow(!show)}
          variant="link" 
          size="sm" 
          >
            {show?"Hide":"Show"}
        
          </Button>
        </div>
      </div>
    </div>
  );
};