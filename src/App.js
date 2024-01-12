import React from "react";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
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
