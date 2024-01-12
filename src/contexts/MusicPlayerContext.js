import React, { useState, useEffect } from "react";
import Track1 from "../euphoric-electric-groove.mp3";
import Track2 from "../see-you-soon.mp3";
import Track3 from "../whip.mp3";

const MusicPlayerContext = React.createContext();

const defaultValues = {
  audioPlayer: new Audio(),
  tracks: [
    {
      name: "Nhạc Sàn Xuyên Biên Giới",
      artist: "Top Flow Production",
      file: Track1,
    },
    {
      name: "Sớm Mai Thấy Em",
      artist: "LemonMusicStudio",
      file: Track2,
    },
    {
      name: "Tét Mông",
      artist: "Prazkhanal",
      file: Track3,
    },
  ],
  currentTrackIndex: null,
  isPlaying: false,
  volume: 0.3,
  currentTime: 0,
};

const MusicPlayerProvider = ({ children }) => {
  const [state, setState] = useState(defaultValues);
  return (
    <MusicPlayerContext.Provider value={{ state, setState }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };
