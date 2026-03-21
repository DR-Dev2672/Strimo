"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";

// import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
};

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
}: ChatFormProps) => {


  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }
  
  return (
    <form 
    onSubmit={handleSubmit}
    className="flex flex-col p-3 gap-y-4 items-center"

    >
      <div className="w-full">
        <ChatInfo
        isDelayed={isDelayed}
        isFollowersOnly={isFollowersOnly}
        />
        <Input
        onChange={(e)=>onChange(e.target.value)}
        placeholder="Write your message"
        value={value}
        disabled={isDisabled}
        className={cn(
          "border-white/10",
          (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
        )}
        />
        <div className="ml-auto ">
        <Button
        type="submit"
        variant="default"
        size="sm"
        disabled={isDisabled}
        >
          Chat
          </Button>
        </div>
      </div>

      
    </form>
    
  );
};

