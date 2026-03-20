"use client"

import { NEXT_CACHE_REVALIDATED_TAGS_HEADER } from "next/dist/lib/constants"
import { ChatHeader } from "./chat-header"
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"
import { ChatCommunity } from "./chat-community"
import { ChatForm } from "./chat-form"
import { ChatList } from "./chat-list"

interface ChatProps{
    hostName:string,
    viewerName:string,
    hostIdentity:string,
    isFollowing:boolean,
    isChatEnabled:boolean,
    isChatFollowersOnly:boolean,
    isChatDelayed:boolean
}

export const Chat=({
    hostName,
    viewerName,
    hostIdentity,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}:ChatProps)=>{

    const {variant,onExpand}=useChatSidebar((state)=>(state))
    return (
        <div className="flex flex-col border-l border-b bg-background h-[calc(100vh-80px)]"> 
          <ChatHeader/>
          {
            variant===ChatVariant.CHAT &&
             
            (
              <>
              <ChatList/>
              <ChatForm/>
              </>  
            )
          }
          {
            variant===ChatVariant.COMMUNITY &&
            (
                <ChatCommunity/>
            )
          }
          
        </div>
    )
}