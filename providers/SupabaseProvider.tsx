"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/type_db";

interface SupabaseProviderProps {
    children: React.ReactNode;
};

export function SupabaseProvider({
    children,
} : SupabaseProviderProps) {
    // Only render once in the life cycle 
    const [supabaseClient] = useState(() => createClientComponentClient<Database>());
    
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    ) 
}