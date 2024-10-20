"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import {FaPlay} from "react-icons/fa"
 
/**
 * @dev The main song content
 * @returns 
 */

interface ListItemProps {
    image: string; // song image
    name: string; // song name
    href: string; // song url 
}
export function ListItem({
    image,
    name,
    href,
} : ListItemProps) {
    const router = useRouter();

    const onClick = () => {
        // If user is authenticated
        router.push(href); 
    }
  return (
    <button 
    onClick={onClick}
    className="
        relative
        group
        flex
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-100/10
        hover:bg-neutral-100/20
        transition
        pr-4
    ">
        <div className="
            relative
            min-h-[64px]
            min-w-[64px]
        ">
            <Image 
            className="object-cover"
            fill
            src={image}
            alt="Image"
            />
        </div>
        <p className="font-medium truncate py-5">
            {name}
        </p>
        {/* we use "group",whenever hover parent, we will create child  */}
        {/* using relative + absolute so we just right-5 to move the place we want */}
        <div className="
            absolute
            transition
            opacity-0
            rounded-full
            flex
            items-center
            justify-center
            bg-sky-600
            p-4
            drop-shadow-md
            right-5
            group-hover:opacity-100
            hover:scale-110
        ">
            <FaPlay className="text-black" />
        </div>
    </button>
  )
}
