"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "./Button";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user} = useUser();

  const handleLogout = async () => {
    const {error} = await supabaseClient.auth.signOut();

    // Reset any playing songs
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  };

  return (
    <div
      className={twMerge(
        `
            h-fit
            bg-gradient-to-b
            from-pink-400
            p-6
            `,
        className
      )}
    >
      <div
        className="
        w-full
        mb-4
        flex
        items-center
        justify-between
        "
      >
        {/* we hidden sidebar in mobile view  */}
        <div
          className="
        hidden
        md:flex
        gap-x-2
        items-center
        "
        >
          <button
            onClick={() => router.back()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
        "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
        "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        {/* This 2 button is for mobile, we hidden the mid view and only visible for mobile*/}
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
        flex
        justify-between
        items-center
        gap-x-4
        "
        >
          {/* when we log in, change to logout and avatarlogo */}
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button 
              onClick={() => router.push('/')}
              className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
          <>
            <div>
              <Button
                onClick={authModal.onOpen}
                className="
                    bg-transparent
                    text-neutral-300
                    font-medium
                    "
              >
                Sign Up
              </Button>
            </div>
            <div>
              <Button
                onClick={authModal.onOpen}
                className="
                    bg-white
                    px-6
                    py-2
                    "
              >
                Log in
              </Button>
            </div>
          </>
          )}
        </div>
      </div>
      {/* Anything wrapped in Header will display in here */}
      {children}
    </div>
  );
}
