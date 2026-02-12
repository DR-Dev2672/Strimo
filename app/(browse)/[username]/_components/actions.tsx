"use client"
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { isFollowingUser } from "@/lib/follow-service"
import { Hand } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionProps{
    userId:string,
    isFollowing:boolean
}

export const Action=({
    userId,
    isFollowing
}:ActionProps)=>{

    const [isPending,startTransition]=useTransition();


    const onClick=()=>{
      if(isFollowing){
        handleUnfollow();
      }
      else{
        handleFollow();
      }
    }

    const handleFollow=()=>{
        startTransition(()=>{
            onFollow(userId)
            .then((data) => toast.success(`You are now following ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"));
        })
    }
    const handleUnfollow=()=>{
        startTransition(()=>{
            onUnfollow(userId)
            .then((data) => toast.success(`You are unfollowing ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"));
        })
    }
    return (
        <>
        
        <Button 
        variant="secondary"
        onClick={onClick}
        >
         {isFollowing?"Unfollow":"Follow"}
        </Button>
        <Button
        variant="secondary"
        >Block
        </Button>
        
        </>
    );
}