import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      <SignInButton/>
        Strimo clone setup done
      <UserButton/>
    </div>
    
  );
}
