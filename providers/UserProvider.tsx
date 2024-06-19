"use client"

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
    children: React.ReactNode;
};

export function UserProvider(children: UserProviderProps) {
    return (
        // TODO :bugs here
        <MyUserContextProvider>
            
            {children}
        </MyUserContextProvider>
       
    )
}