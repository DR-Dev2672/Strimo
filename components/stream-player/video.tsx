import { useConnectionState, useRemoteParticipant, useRemoteParticipants, useTracks } from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";

interface VideoProps{
    hostName:string;
    hostIdentity:string;
}

export const Video=({
    hostName,
    hostIdentity
    }:VideoProps    
    
)=>{

    const connectionState=useConnectionState();
    const participants=useRemoteParticipants();
    const tracks=useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track)=>track.participant.identity===hostIdentity);

    let content;
    if(!participants && connectionState===ConnectionState.Connected){
        content =<OfflineVideo username={hostName}/>;
    }
    else if(!participants ||tracks.length===0){
        content=<LoadingVideo label={connectionState}/>;
    }
    else{
        content=<LiveVideo participant={participants}/>
    }


    return (
     <div>this is video section</div>
    )

}