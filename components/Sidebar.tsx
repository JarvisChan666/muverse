"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { Box } from "./Box";
import { SidebarItem } from "./SidebarItem";
import { Library } from "./Library";
import { Song } from "@/types";

// children can be server component, but this layout should use client
// because we use many react hooks

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[]
}

export function Sidebar({ children, songs }: SidebarProps) {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "search",
        active: pathname == "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  // Everytime the pathname is not "search", we make it "active"

  return (
    //
    //<Sidebar>{children}<Sidebar/> then element wrapped by sidebar will pass in here
    <div className="flex h-full">
      <div
        className="
            hidden
            md:flex
            flex-col
            gap-y-2
            bg-black
            h-full
            w-[300px]
            p-2
            "
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        {/* we can pass our classname in box because we have "className" as props */}
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
}
