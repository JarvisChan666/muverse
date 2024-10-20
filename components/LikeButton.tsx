"use Client";

import useAuthModal from "@/hooks/useAuthModal";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

export function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const user = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();
      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

// If we not login, it will open the auth model
  const handleLike = async() => {
    if (!user) {
        return authModal.onOpen();
    }

    if (isLiked) {
        const {error} = await supabaseClient
            .from('liked_songs')
            .delete()
            .eq('user_id', user.id)
            .eq('song_id', songId);
        
        if (error) {
            toast.error(error.message);
        } else {
            setIsLiked(false);
        }
    } else {
        const {error} = await supabaseClient
            .from('liked_songs')
            .insert({
                song_id: songId,
                user_id: user.id
            });

            if (error) {
                toast.error(error.message)
            } else {
                setIsLiked(true);
                toast.success('Liked!');
            }
    }
    router.refresh();
  }

  return (
    <button
      onClick={handleLike}
      className="
    hover:opacity-75
    transition
    "
    >
      <Icon color={isLiked ? "#83cbff" : "white"} size={25} />
    </button>
  );
}
