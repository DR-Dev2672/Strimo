import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Action } from "./_components/actions";


interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
   const user= await getUserByUsername(username);

   if(!user){
    notFound();
   }
     const isFollowing=await isFollowingUser(user.id);
    return (
      <>
        <div className="flex flex-col">

            <p>user:{username}</p>
            <p>userId: {user.id}</p> 
            <p>is Following:{` ${isFollowing}`} </p> 
            
        </div>
        <Action isFollowing={isFollowing} userId={user.id} />
        
        </>
      
    );
}

export default UserPage;