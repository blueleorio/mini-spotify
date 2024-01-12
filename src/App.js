import logo from "./logo.svg";
import "./App.css";

import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import { TrackList } from "./components/TrackList";

const App = () => {
  return (
    <MusicPlayerProvider>
      <div className="container">
        <TrackList />
        <Controller />
      </div>
    </MusicPlayerProvider>
  );
};

export default App;
