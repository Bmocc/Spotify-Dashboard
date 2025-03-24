import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Paper, Avatar, useTheme } from '@mui/material';
import { Box } from '@mui/system';

interface Artist {
  id: number;
  name: string;
}

export const ArtistProfile: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    axios.get<Artist[]>('http://127.0.0.1:8000/api/artists/')
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

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
        B</Avatar>
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
        Bob Marley
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
        Reggae | Ska | Steady Rock
      </Typography>
      </Box>
      <List>
        {artists.map((artist) => (
          <React.Fragment key={artist.id}>
            <ListItem>
              <ListItemText primary={artist.name} />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};