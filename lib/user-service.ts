import { prisma } from "./prisma"

export const getUserByUsername=async(username:string)=>{
    const user=await prisma.user.findUnique({
        where:{
            username:username,
        }
    })
    return user;
}

export const getUserById=async(id:string)=>{
    const user=await prisma.user.findUnique({
        where:{
            id:id,
        }
        
    })
    return user;
}