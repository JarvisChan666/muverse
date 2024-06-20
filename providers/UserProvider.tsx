import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
    children: React.ReactNode;
};

export const UserProvider = ({children}: UserProviderProps) => {
    return (
        // TODO :bugs here
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
       
    )
}