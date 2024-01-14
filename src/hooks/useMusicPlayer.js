import { useContext, useEffect } from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";

const useMusicPlayer = () => {
  const { state, setState } = useContext(MusicPlayerContext);

  useEffect(() => {
    console.log("Effect is running...");

    let intervalId;

    // Start updating background when a track is played
    if (state.isPlaying) {
      intervalId = setInterval(() => {
        // Update background color logic here
        const color1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`;
        const color2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`;
        const background = `linear-gradient(${color1} 0%, ${color2} 100%)`;

        setState((prev) => ({ ...prev, background }));
      }, 1000);
    }

    // Cleanup when no track is played or component unmounts
    return () => {
      clearInterval(intervalId);
      setState((prev) => ({ ...prev, background: null }));
    };
  }, [state.isPlaying, setState]);

  // Play a specific track
  function playTrack(index) {
    if (index === state.currentTrackIndex) {
      console.log("clicked");
      togglePlay();
    } else {
      state.audioPlayer.pause();
      state.audioPlayer = new Audio(state.tracks[index].file);
      state.audioPlayer.play();
      setState((state) => ({
        ...state,
        currentTrackIndex: index,
        isPlaying: true,
      }));
    }
    console.log(
      state.currentTrackIndex !== null &&
        state.tracks[state.currentTrackIndex].name
    );
  }

  // Toggle play or pause
  function togglePlay() {
    if (state.currentTrackIndex !== null) {
      // If there is a selected track, toggle play/pause
      if (state.isPlaying) {
        state.audioPlayer.pause();
      } else {
        state.audioPlayer.play();
      }
      setState((state) => ({ ...state, isPlaying: !state.isPlaying }));
    } else if (state.tracks.length > 0) {
      // If no track is selected, play the first track
      const firstTrack = state.tracks[0];
      state.audioPlayer.pause();
      state.audioPlayer = new Audio(firstTrack.file);
      state.audioPlayer.play();
      setState((state) => ({
        ...state,
        currentTrackIndex: 0,
        isPlaying: true,
      }));
    }
  }

  // Play the previous track in the tracks array
  function playPreviousTrack() {
    const newIndex =
      state.currentTrackIndex > 0
        ? state.currentTrackIndex - 1
        : state.tracks.length - 1;
    playTrack(newIndex);
  }

  // Play the next track in the tracks array
  function playNextTrack() {
    const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    if (state.tracks.length > 0) {
      playTrack(newIndex);
    }
  }

  function setVolume(volume) {
    if (state.audioPlayer) {
      state.audioPlayer.volume = volume;
      setState((state) => ({ ...state, volume }));
    }
  }

  return {
    playTrack,
    togglePlay,
    currentTrackName:
      state.currentTrackIndex !== null &&
      state.tracks[state.currentTrackIndex].name,
    currentTrackArtist:
      state.currentTrackIndex !== null &&
      state.tracks[state.currentTrackIndex].artist,
    currentTrackDuration:
      state.currentTrackIndex !== null &&
      state.tracks[state.currentTrackIndex].duration,
    trackList: state.tracks,
    isPlaying: state.isPlaying,
    currentTrackIndex: state.currentTrackIndex,
    playPreviousTrack,
    playNextTrack,
    setVolume,
    volume: state.volume,
    background: state.background,
  };
};

export default useMusicPlayer;
