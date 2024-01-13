import React, { useRef, useEffect, useContext } from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";

const BackgroundVisualizer = () => {
  const { state } = useContext(MusicPlayerContext);
  const wallPaperRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const audioPlayer = state.audioPlayer;

    const createAudioContext = () => {
      analyserRef.current = state.audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      sourceRef.current =
        state.audioContext.createMediaElementSource(audioPlayer);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(state.audioContext.destination);
    };

    if (!state.audioContext) {
      // If there's no audio context, create a new one
      state.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (!analyserRef.current) {
      createAudioContext();
    } else if (sourceRef.current) {
      // Disconnect and reconnect the source if it's not connected
      sourceRef.current.disconnect();
      sourceRef.current =
        state.audioContext.createMediaElementSource(audioPlayer);
      sourceRef.current.connect(analyserRef.current);
    }

    // Update the wallpaper color continuously
    const updateInterval = setInterval(updateWallPaperColor, 100);

    return () => {
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }

      if (state.audioContext && state.audioContext.state !== "closed") {
        state.audioContext.close();
      }
    };
  }, [state.audioPlayer, state.audioContext]);

  const updateWallPaperColor = () => {
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyserRef.current.getByteFrequencyData(dataArray);

      const average =
        dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;
      const normalizedFrequency = average / 50; // Normalize to a range from 0 to 1

      // Multiply the normalized frequency to your existing RGB values
      const colorMultiplier = normalizedFrequency;

      // Example: Multiply with existing RGB values
      const red = Math.min(255, Math.round(255 * colorMultiplier));
      const green = Math.min(255, Math.round(50 * colorMultiplier));
      const blue = Math.min(255, Math.round(50 * colorMultiplier));

      const color = `rgb(${red}, ${green}, ${blue})`;

      // Update the background color of the WallPaper component
      wallPaperRef.current.style.backgroundColor = color;
    }
  };

  return <div ref={wallPaperRef} style={{ width: "100%", height: "100%" }} />;
};

export default BackgroundVisualizer;
