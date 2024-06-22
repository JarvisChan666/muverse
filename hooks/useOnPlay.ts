/**
 * @dev A reuseable hooks to play the song
 */

import usePlayer from "@/actions/usePlayer";
import { Song } from "@/types";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

export default function UseOnPlay(songs: Song[]){
    const player = usePlayer();
    const authModal = useAuthModal();
    const {user} = useUser();

    const onPlay = (id: string)=> {
        if (!user) {
            return authModal.onOpen();
        }
        // Play the song the user click
        player.setId(id);
        //Create the playlist to play the song
        /**
         * If we click play in playlist it will create playlist of liked songs
         * If we click Library it will create playlist of library songs
         * etc......
         */
        player.setIds(songs.map((song)=>song.id));
    }

    return onPlay;
}


