import useMusicPlayer from "../hooks/useMusicPlayer";
export const TrackList = () => {
  const { trackList, currentTrackName, playTrack, isPlaying } =
    useMusicPlayer();

  return (
    <>
      {trackList.map((track, index) => (
        // ( Surprise us with your code here)

        <div className="song-title">{track.name}</div>
      ))}
    </>
  );
};
