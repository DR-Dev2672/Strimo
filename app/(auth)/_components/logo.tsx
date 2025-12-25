import Image from "next/image";
import spooky from "../../../public/spooky.svg"

export default function Logo() {
    return (
        <div className="flex flex-col items-center ">
            <div className="bg-white rounded-full p-1 ">
            <Image src={spooky} alt="Logo" width="50" height="50" ></Image>
            </div>
            <div className="flex flex-col items-center">
            <p>Strimo</p>
            <p>Let's Play</p>
            </div>
        </div>
    );
}