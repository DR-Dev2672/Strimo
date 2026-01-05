import Action from "./action";
import Logo from "./logo";
import Search from "./search";

export default function Navbar() {
    return (
        <nav className="flex  fixed top-0 w-full h-20 z-40 bg-[#252731] px-2 lg:px-4 justify-center items-center shadow-sm">
            <Logo/>
            <Search/>
            <Action/>
        </nav>
    );
}