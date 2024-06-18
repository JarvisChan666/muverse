import Link from "next/link";
import { IconType } from "react-icons/lib"
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

/**
 * 
 * @param 
 * @returns
 * @dev Represent the item in sidebar, including "Home", "Search" 
 */
export function SidebarItem ({
    icon: Icon,
    label,
    active,
    href
} : SidebarItemProps) {
    return (
        <Link
        href={href}
        className={twMerge(`
            flex
            flex-row
            h-auto
            items-center
            w-full
            gap-x-4
            text-md
            font-medium
            hover:text-white
            transition
            text-neutral-600
            py-1
            `,
            active && "text-white"        
        )}
        
        >
        <Icon size={26}/>
        <p className="truncate w-full">{label}</p>
        </Link>
    )
}