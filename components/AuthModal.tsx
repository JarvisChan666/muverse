"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import {Auth} from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Modal } from "./modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

export function AuthModal() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const {onClose, isOpen} = useAuthModal();

  // When we login successfully, we will close the modal
  useEffect(() => {
    if (session) {
        router.refresh();
        onClose();
    }
  }, [session, router, onClose])

  const onChange = (open: boolean) => {
    if(!open) {
        onClose();
    }
  }

  return (
    <Modal
      title=""
      description="Login to your acocunt"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth 
      theme="dark"
      providers={["spotify", "google", "notion", "github"]}
      supabaseClient={supabaseClient}
      appearance={{
        theme:ThemeSupa,
        variables: {
            default: {
                colors: {
                    brand: '#404040',
                    brandAccent: '#f171b4'
                }
            }
        }
      }}
      />
    </Modal>
  );
}
