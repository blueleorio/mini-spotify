import React from "react";
import useMusicPlayer from "../hooks/useMusicPlayer";
import { TrackList } from "./TrackList";

export const Controller = () => {
  const {
    togglePlay,
    playPreviousTrack,
    playNextTrack,
    currentTrackName,
    isPlaying,
  } = useMusicPlayer();

  return (
    <div>
      <h3>Now Playing: {currentTrackName || "No track selected"}</h3>
      <div>
        <button onClick={playPreviousTrack}>Previous</button>
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={playNextTrack}>Next</button>
      </div>
    </div>
  );
};
