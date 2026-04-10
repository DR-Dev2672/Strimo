import { getSelf } from "./auth-service";
import { prisma } from "./prisma";

export const getStreams=async()=>{
    let userId;
    try{
        const self=await getSelf();
        userId=self.id; 
    }
    catch{
        userId=null;
    }
    let streams=[];
    if(userId){
        streams=await prisma.stream.findMany({
         where:{
            user:{
                NOT:{
                    blocking:{
                        some:{
                            blockedId:userId,
                        }
                    }
                }
            }
         },
         select:{
            id:true,
            isChatDelayed:true,
            isChatEnabled:true,
            isChatFollowersOnly:true,
            isLive:true,
            thumbnailUrl:true,
            user:true,
         },
         orderBy:[
            {
                isLive:"desc",
            },
            {
                createdAt:"desc",
            }
         ]
      })
    }
    else{

        streams=await prisma.stream.findMany({
         select:{
            id:true,
            isChatDelayed:true,
            isChatEnabled:true,
            isChatFollowersOnly:true,
            isLive:true,
            thumbnailUrl:true,
            user:true,
         },
         orderBy:[
            {
                isLive:"desc",
            },
            {
                createdAt:"desc",
            }
         ]
      })

    }
    
  return streams;

}