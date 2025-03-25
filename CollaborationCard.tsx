import React from 'react';
import Typography from '@mui/material/Typography';
import { Paper, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import ForceGraph2D from 'react-force-graph-2d';

export interface ArtistNode {
    id: number;
    name: string;
    genre: string;
  }
  
  export interface CollaborationLink {
    source: number;
    target: number;
  }
  
  interface CollaborationGraphProps {
    nodes: ArtistNode[];
    links: CollaborationLink[];
  }

export const Collaboration: React.FC<CollaborationGraphProps> = ({ nodes, links }) => {
    const theme = useTheme();
  

  return (
    <Paper
    elevation={5}
      sx={{
        width: 500,
        position: 'relative',
        alignItems: 'center',
        height: 360,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 300,
          height: 50,
          // border: 1,
        }}
      >
      <Typography variant="h4" >
        Collab Profile
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
          height: 150,
          // border: 1,
          color: "#1DB954"
        }}
      >
      <ForceGraph2D
        graphData={{ nodes, links }}
        width={500}
        height={500}
        nodeLabel="name"
        // Auto-colors nodes by the 'genre' property; you can customize this as needed.
        nodeAutoColorBy="genre"
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
      />
      </Box>

    </Paper>
  );
};