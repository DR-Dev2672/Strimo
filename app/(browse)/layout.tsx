import { UserButton } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";

export default function BrowseLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
             <Navbar />
             {/* <UserButton/> */}
            {children}
        </div>
    );
}