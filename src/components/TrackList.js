import React from "react";
import useMusicPlayer from "../hooks/useMusicPlayer";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export const TrackList = () => {
  const { trackList, playTrack, currentTrackIndex, isPlaying } =
    useMusicPlayer();

  return (
    <Stack spacing={1} direction="column" alignItems="center">
      {trackList.map((track, index) => (
        <React.Fragment key={index}>
          <div
            className={`song-title ${
              currentTrackIndex === index && isPlaying ? "active" : ""
            }`}
            onClick={() => playTrack(index)}
          >
            {track.name}
          </div>
          {index < trackList.length - 1 && <Divider flexItem />}
        </React.Fragment>
      ))}
    </Stack>
  );
};
