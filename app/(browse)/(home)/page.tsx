import { Button } from "@/components/ui/button";
import { Results } from "./_components/Results";
import Link from "next/link";
import { get } from "http";
import { currentUser } from "@clerk/nextjs/server";


export default async function Page () {
    const user= await currentUser()
    return (
        <div className=" h-full p-8 max-w-screen-2xl mx-auto   ">

            { user && (<div className=" flex flex-col justify-content items-center m-4 ">
              <Link href={`/u/${user?.username}/keys`}>
                        <Button className="font-bold text-2xl bg-blue-500 rounded-3xl text-black hover:bg-blue-300"
                        variant="ghost">
                            Create new stream
                        </Button>
            </Link>

            </div>)
            }
            { !user && (<div className=" flex flex-col justify-content items-center m-4 ">
              <Link href={`/sign-in`}>
                        <Button className="font-bold text-2xl bg-blue-500 rounded-3xl text-black hover:bg-blue-300"
                        variant="ghost">
                            Login to create new stream
                        </Button>
            </Link>

            </div>)
            }

        
            <Results/>
        </div>
        
    );
}