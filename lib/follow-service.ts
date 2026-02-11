import { getSelf } from "./auth-service";
import { prisma } from "@/lib/prisma";

export const getFollowedUsers=async()=>{
//to whom he follows
    try{
        const self=await getSelf();
        const followedUsers=await prisma.follow.findMany({
            where:{
                followerId:self.id,
            }
            
        })

        return followedUsers;
    }
    catch{
        return [];

    }

}


export const isFollowingUser=async(id:string)=>{
// to check a user is following me
    try {
        const self=await getSelf();
        const otherUser=await prisma.user.findUnique({
            where:{
                id:id,
            }
        })
        if(!otherUser){
            throw new Error("User not found");
        }
        if(otherUser.id===self.id){
            return true;
        }
        const existingFollow=await prisma.follow.findFirst({
            where:{
                followerId:self.id,
                followingId:otherUser.id,
            }
        })
        return !!existingFollow;
            
        
    } catch  {
        return false;
    }
}


export const followUser=async(id:string)=>{
    const self=await getSelf();
    const otherUser=await prisma.user.findUnique({
        where:{
            id:id,
        }
    })
    if(!otherUser){
        throw new Error("User not found");
    }
    if(otherUser.id===self.id){
        throw new Error("You cannot follow yourself");
    }
    const existingFollow=await prisma.follow.findFirst({
        where:{
            followerId:self.id,
            followingId:otherUser.id,
        }
    })
    if(existingFollow){
        throw new Error("You are already following this user");
    }
    const follow=await prisma.follow.create({
        data:{
            followerId:self.id,
            followingId:otherUser.id,
        },
        include:{
            following:true,
            follower:true,
        }
    })
    return follow;

}


export const unfollowUser=async(id:string)=>{
    const self=await getSelf();
    const otherUser=await prisma.user.findUnique({
        where:{
            id:id,
        }
    })
    if(!otherUser){
        throw new Error("User not found");
    }
    if(otherUser.id===self.id){
        throw new Error("You cannot unfollow yourself");
    }

    const existingFollow =await prisma.follow.findFirst({
        where:{
            followerId:self.id,
            followingId:otherUser.id,
        }
    })
    if(!existingFollow){
        throw new Error("You are not following this user");
    }

    const follow=await prisma.follow.delete({
        where:{
           id:existingFollow.id,
        },
        include:{
            following:true,
        }
    })

    return follow;

  

}