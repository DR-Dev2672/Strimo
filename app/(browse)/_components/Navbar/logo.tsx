import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function Logo() {
    return (
        <div className="flex items-center gap-x-4 hover:opacity-75 transition ">
            <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
            <Image src='/spooky.svg' alt="Logo" width="32" height="32" ></Image>
            </div>
            <div className={cn("hidden lg:block ",font.className)}>
            <p className="text-lg font-semibold">Strimo</p>
            <p className="text-xs text-muted-foreground">Let&apos;s play</p>
            </div>
        </div>
    );
}