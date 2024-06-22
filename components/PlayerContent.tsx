"use client";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
// import {useSound} from "use-sound";s
import useSound from "use-sound";

import usePlayer from "@/actions/usePlayer";
import { Song } from "@/types";
import { MediaItem } from "./MediaItem";
import { LikeButton } from "./LikeButton";
import { Slider } from "./Slider";
import { useEffect, useState } from "react";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

export function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  const OnPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    // No song in the next
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const OnPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    // No song in the previos, play the last song
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      OnPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    
    return () => {
      sound?.unload();
    };
  }, [sound]);

  //TODO  Keep the same volume when we change the song
 

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
        setVolume(1);
    } else {
        setVolume(0);
    }
  }


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div
        className="
        flex w-full justify-start
        "
      >
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div
        className="
            flex
            md:hidden
            col-auto
            w-full
            justify-end
            items-center
            "
      >
        <div
          onClick={handlePlay}
          className="
                h-10
                w-10
                flex
                items-center
                justify-center
                rounded-full
                bg-white
                p-1
                cursor-pointer
                "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/* desktop view */}
      <div
        className="
        hidden 
        h-full
        md:flex
        justify-center
        items-center
        w-full
        max-w-[722px]
        gap-x-6
        "
      >
        <AiFillStepBackward
          onClick={OnPlayPrevious}
          size={30}
          className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "
        />
        <div
          onClick={handlePlay}
          className="
        flex
        items-center
        justify-center
        h-10
        w-10
        rounded-full
        bg-white
        p-1
        cursor-pointer
        "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={OnPlayNext}
          size={30}
          className="
        text-neutral-400
        cursor-pointer
        hover:text-whitetransition
        "
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={34} />
          <Slider 
          value={volume}
          onChange={(value)=>setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
}
