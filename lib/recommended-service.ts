import { getSelf } from "./auth-service";
import { prisma } from "@/lib/prisma";



export const getRecommended=async()=>{


let selfId;
try {
    const self=await getSelf();
    selfId=self.id;
} catch  {
    selfId=null;
}

let users:any=[]; 
if(selfId){
    users=await prisma.user.findMany({
        where:{
           NOT:{
              id:selfId,
           }
            
        
        }
    })
}


return users;
}

