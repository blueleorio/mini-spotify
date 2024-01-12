import React, { useState } from "react";
import Track1 from "../euphoric-electric-groove.mp3";
import Track2 from "../see-you-soon.mp3";
import Track3 from "../whip.mp3";

const MusicPlayerContext = React.createContext();

const defaultValues = {
  audioPlayer: new Audio(),
  tracks: [
    {
      name: "Groove Dan Toc Giat Dien",
      file: Track1,
    },
    {
      name: "Nhin Em Som",
      file: Track2,
    },
    {
      name: "Tet Vao Mong",
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
  const setVolume = (volume) => {
    state.audioPlayer.volume = volume;
    setState((state) => ({ ...state, volume }));
  };

  const setCurrentTime = (time) => {
    state.audioPlayer.currentTime = time;
    setState((state) => ({ ...state, currentTime: time }));
  };
  return (
    <MusicPlayerContext.Provider
      value={{ state, setState, setVolume, setCurrentTime }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };
