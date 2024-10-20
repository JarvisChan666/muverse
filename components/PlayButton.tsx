import { FaPlay } from "react-icons/fa";

export function PlayButton() {
    
return (
    <button className="
    transition
    opacity-0
    rounded-full
    flex
    items-center
    bg-sky-400
    p-4
    drop-shadow-md
    translate
    translate-y-1/4
    group-hover:opacity-100
    group-hover:translate-y-0
    hover:scale-110
    ">
    {/* 当元素的父级（具有 group 类的元素）被悬停时，元素变得完全不透明（可见）。 */}
    {/* 当元素的父级（具有 group 类的元素）被悬停时，元素垂直方向上的移动量为 0，即回到原始位置。 */}
        <FaPlay className="text-black"/>
    </button>
)
}