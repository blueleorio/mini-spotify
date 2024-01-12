import React, { useState } from "react";
import Track1 from "../euphoric-electric-groove.mp3";
import Track2 from "../see-you-soon.mp3";
import Track3 from "../whip.mp3";

const MusicPlayerContext = React.createContext();

const defaultValues = {
  audioPlayer: new Audio(),
  tracks: [
    {
      name: "Cold Gin - Jazz",
      file: Track1,
    },
    {
      name: "heaven's On Fire - Jazz",
      file: Track2,
    },
    {
      name: "Beth - Jazz",
      file: Track3,
    },
  ],
  currentTrackIndex: null,
  isPlaying: false,
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
