import React from 'react';
import Typography from '@mui/material/Typography';
import { Paper, Avatar, useTheme } from '@mui/material';
import { Box } from '@mui/system';

export interface Artist {
  id: number;
  name: string;
  genre: string;
  popularity: number;
}

interface ArtistProfileProps {
  artist: Artist;
}

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist }) => {
    const theme = useTheme();
  

  return (
    <Paper
    elevation={5}
      sx={{
        width: 300,
        position: 'relative',
        alignItems: 'center',
        height: 360,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Avatar
      sx={{     
        top: 30,      
        left: '50%',
        transform: 'translateX(-50%)', 
        width: 150, 
        height: 150,
        border: 2,
        borderColor: 'primary.main',
      }}
      >
        {artist.popularity}
      </Avatar>
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 10,
          height: 50,
          // border: 1,
        }}
      >
      <Typography variant="h5" >
        {artist.name}
      </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 70,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 10,
          maxWidth: 250,
          height: 30,
          // border: 1,
          color: "#1DB954"
        }}
      >
      <Typography variant="subtitle2" >
        {artist.genre}
      </Typography>
      </Box>
    </Paper>
  );
};