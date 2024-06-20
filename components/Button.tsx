
/**
 * @dev we will pass ref and smarter interface
 * @returns 
 */

import { forwardRef } from "react"
import { twMerge } from "tailwind-merge";

// we don't need to write props ourself just using the one that react has
// we inherit the HTMLAttributes the button has
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={twMerge(`
                w-full
                rounded-full
                bg-pink-500
                border
                border-transparent
                px-3
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                text-black
                font-bold
                hover:opacity-75
                transition
                `, className)}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
});

// 设置 displayName
Button.displayName = "Button";