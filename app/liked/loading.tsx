"use client"

import { Box } from "@/components/Box"
import {BounceLoader} from "react-spinners";

export default function Loading() {
    
return (

    <Box className="h-full flex items-center justify-center">
        <BounceLoader color="#f171b4" size={40}/>
    </Box>
)
}