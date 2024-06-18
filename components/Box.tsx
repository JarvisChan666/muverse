// Classname for additional style
// Merge the classname
import {twMerge} from "tailwind-merge";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export function Box({
    children,
    // we can pass our classname in box because we have "className" as props
    className, 
} : BoxProps) {
    return (
        <div className={twMerge(`
            bg-neutral-900
            rounded-lg
            h-fit
            w-full
            `,
            className
        )}>
            {children}
        </div>
    )
}