"use client"
import {TbPlaylist} from "react-icons/tb"
import {AiOutlinePlus} from "react-icons/ai"

export function Library() {
    const onClick = () => {
        // Upload our songs
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-white" size={26}/>
                    <p className="text-white font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus 
                onClick={onClick}
                size={20}
                className="
                text-neutral-600
                cursor-pointer
                hover:text-white
                transition
                "
                />
            </div>
            <div className="
                flex
                flex-col
                gap-y-2
                mt-4
                px-3
            ">
sds
            </div>
        </div>
    )
}