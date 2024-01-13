import React, { useState, useEffect } from "react";
import Track1 from "../The Strokes - Why Are Sundays So Depressing.mp3";
import Track2 from "../The Strokes - Eternal Summer.mp3";
import Track3 from "../The Adults Are Talking - The Strokes.mp3";

const MusicPlayerContext = React.createContext();

const defaultValues = {
  audioPlayer: new Audio(),
  tracks: [
    {
      name: "Why Are Sundays So Depressing",
      artist: "The Strokes",
      file: Track1,
      duration: 0,
    },
    {
      name: "Eternal Summer",
      artist: "The Strokes",
      file: Track2,
      duration: 0,
    },
    {
      name: "The Adults Are Talking",
      artist: "The Strokes",
      file: Track3,
      duration: 0,
    },
  ],
  currentTrackIndex: null,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
};

const MusicPlayerProvider = ({ children }) => {
  const [state, setState] = useState(defaultValues);

  useEffect(() => {
    // Load durations when the component mounts
    const loadDurations = async () => {
      const updatedTracks = await Promise.all(
        state.tracks.map(async (track) => {
          const audio = new Audio(track.file);

          const loadedMetadataPromise = new Promise((resolve) => {
            audio.addEventListener("loadedmetadata", () => {
              resolve();
            });
          });

          await Promise.all([audio.load(), loadedMetadataPromise]);

          const duration = audio.duration;
          console.log(`Duration of ${track.name}: ${duration} seconds`);
          return { ...track, duration };
        })
      );

      setState((prev) => ({
        ...prev,
        tracks: updatedTracks,
      }));
    };

    loadDurations();
  }, []);

  return (
    <MusicPlayerContext.Provider value={{ state, setState }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };
