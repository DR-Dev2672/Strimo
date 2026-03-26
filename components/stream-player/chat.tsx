"use client"

import { NEXT_CACHE_REVALIDATED_TAGS_HEADER } from "next/dist/lib/constants"
import { ChatHeader } from "./chat-header"
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"

import { ChatForm } from "./chat-form"
import { ChatList } from "./chat-list"
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { useMemo, useState } from "react"
import { ConnectionState } from "livekit-client"
import { ChatCommunity } from "./chat-community"

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
    const participant=useRemoteParticipant(hostIdentity)

    const connectionState=useConnectionState();

    const {chatMessages: messages, send}=useChat();
    const isOnline =participant && connectionState=== ConnectionState.Connected

    const isHidden=!isChatEnabled || !isOnline;

    const [value,setValue]=useState("");

    const reversedMessages=useMemo(()=>{
      messages.sort((a,b)=>(b.timestamp-a.timestamp))
    },[messages])

    const onSubmit =()=>{
      if(!send){
        return ;
      }

      send(value);
      setValue("");
    }

    const onChange=(value:string)=>(
      setValue(value)
    )

    return (
        <div className="flex flex-col border-l border-b bg-background h-[calc(100vh-80px)]"> 
          <ChatHeader/>
          {
            variant===ChatVariant.CHAT &&
             
            (
              <>
              <ChatList
              messages={reversedMessages}
              isHidden={isHidden}
              />
              <ChatForm
              onSubmit={onSubmit}
              value={value}
              onChange={onChange}
              isHidden={isHidden}
              isFollowersOnly={isChatFollowersOnly}
              isDelayed={isChatDelayed}
              isFollowing={isFollowing}
              />
              </>  
            )
          }
          {
            variant===ChatVariant.COMMUNITY &&
            (
                <ChatCommunity
                 
                />
            )
          }
          
        </div>
    )
}