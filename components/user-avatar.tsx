import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
    imageUrl: string;
    username: string;
}


export const UserAvatar=(
    {username,
    imageUrl
}:UserAvatarProps
)=>{



    return (
    <>
        <Avatar>
  <AvatarImage src={imageUrl}  className="object-cover"/>
   <AvatarFallback>
    {username}
    {username[username.length-1]}

   </AvatarFallback>
   </Avatar>
        
        </>
    )
}