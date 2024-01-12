import React from "react";
import useMusicPlayer from "../hooks/useMusicPlayer";

export const TrackList = () => {
  const { trackList, playTrack, currentTrackIndex, isPlaying } =
    useMusicPlayer();

  return (
    <>
      {trackList.map((track, index) => (
        <div
          key={index}
          className={`song-title ${
            currentTrackIndex === index && isPlaying ? "active" : ""
          }`}
          onClick={() => playTrack(index)}
        >
          {track.name}
        </div>
      ))}
    </>
  );
};
