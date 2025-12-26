import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Action() {
    return (
        <div className="flex items-center justify-end gap-2 ml-4 lg:ml-0 ">
            <SignInButton>
                <Button variant="outline">Login</Button>
            </SignInButton>
            <UserButton/>
        </div>
    );
}