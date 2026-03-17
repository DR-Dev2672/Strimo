"use client"

import { useViewerToken } from "@/hook/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "./video";

type CustomStream = {
    id: string;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    isLive: boolean;
    thumbnailUrl: string | null;
    name: string;
};

export type CustomUser = {
    id: string;
    username: string;
    bio: string | null;
    stream: CustomStream | null;
    imageUrl: string;
    _count: { followedBy: number };
};

interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream | null;
    isFollowing: boolean;
}


export const StreamPlayer=(
   { user,
    stream, 
    isFollowing}:StreamPlayerProps
)=>{

    const {token,name,identity}=  useViewerToken(user.id);
      
    


    return (
        <div>
           <LiveKitRoom serverUrl={process.env.LIVEKIT_URL} token={token} >
              <div> 
                <Video
                hostName={user.username}
                hostIdentity={user.id}
                />
              </div>
           </LiveKitRoom>
        </div>
    )
}