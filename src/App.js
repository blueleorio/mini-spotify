import React from "react";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import { TrackList } from "./components/TrackList";
import { Controller } from "./components/Controller";
import MusicPlayerSlider from "./components/MusicPlayerSlider";

const App = () => {
  return (
    <MusicPlayerProvider>
      <div className="container">
        <MusicPlayerSlider />
      </div>
    </MusicPlayerProvider>
  );
};

export default App;
