import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Album, Track } from '../models';

interface AlbumDetailsProps {
  album: Album;
  onClose: () => void;
}

export const AlbumDetails: React.FC<AlbumDetailsProps> = ({ album, onClose }) => {
  return (
    <Paper
      sx={{
        p: 2,
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        width: 300,
        backgroundColor: 'background.paper'
      }}
      elevation={5}
    >
      <Typography variant="h6">{album.albumName}</Typography>
      <Typography variant="body2">Release Date: {album.releaseDate}</Typography>
      <Typography variant="body2">Popularity: {album.popularity}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>Tracklist:</Typography>
      <ul>
        {album.tracklist.map((track: Track) => (
          <li key={track.id}>
            {track.name} ({track.duration} sec)
          </li>
        ))}
      </ul>
      <Button variant="contained" onClick={onClose} sx={{ mt: 1 }}>
        Close
      </Button>
    </Paper>
  );
};