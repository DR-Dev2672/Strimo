import { getSelf } from "./auth-service";
import { prisma } from "./prisma";


export const getSearch=async(term?:string)=>{
  let userId;
  try{
    const self=await getSelf();
     userId=self.id;
  }
  catch(error){
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
                            blockedId:userId
                        }

                    }
                }
            },
            OR:[
                {
                    name:{
                        contains:term,
                    }
                },
                {
                    user:{
                        username:{
                            contains:term
                        }
                    }
                },

            ]
         },
         select:{
            id:true,
            user:true,
            name:true,
            isLive:true,
            thumbnailUrl:true,
            updatedAt:true,
         },
         orderBy:[
            {
               isLive:"desc"
         },
         {
            updatedAt:"desc"
         }
        ]
         
    })
  }
  else{
    streams=await prisma.stream.findMany({
         where:{
            OR:[
                {
                    name:{
                        contains:term,
                    }
                },
                {
                    user:{
                        username:{
                            contains:term
                        }
                    }
                },

            ]
         },
         select:{
            id:true,
            user:true,
            name:true,
            isLive:true,
            thumbnailUrl:true,
            updatedAt:true
         },
         orderBy:[
            {
               isLive:"desc"
         },
         {
            updatedAt:"desc"
         }
        ]
         
    })

  }
   return streams;
}