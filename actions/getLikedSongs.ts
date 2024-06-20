import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
    const supabase =  createServerComponentClient({
        cookies: cookies,
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    // Fetch songs
    const {data, error} = await supabase 
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', session?.user?.id)// Only fetch the current user's liked songs
        .order('created_at', {ascending: false});
        
        if (error || !data) {
            console.log(error);
            return [];
        }

      
        return data.map((item) => ({
            ...item.songs
        }))
};

export default getLikedSongs;
