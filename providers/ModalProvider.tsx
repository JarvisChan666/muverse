"use client";

import { useEffect, useState } from "react";

import { AuthModal } from "@/components/AuthModal";
import { UploadModal } from "@/components/UploadModal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration error
  // When server side is rendering, we can't see any modals
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Whenever it is rendering in server side, just return null
  // If it is in client side, it will mounted and return modal
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
}
