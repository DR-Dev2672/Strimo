import { UserButton } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";
import { Suspense } from "react";
import SideBarSkeleton from "./_components/sidebarskeleton";
import {Sidebar} from "./_components/sidebar";
import { Container } from "./_components/container";

export default function BrowseLayout({children}: {children: React.ReactNode}) {
    return (
        <>
             <Navbar />
             <div className="flex h-full pt-20 ">
             <Suspense fallback={<SideBarSkeleton/>}>
              <Sidebar/>
             </Suspense>
             
             {/* <UserButton/> */}
             <Container>
            {children}
            </Container>
            </div>
        </>
    );
}