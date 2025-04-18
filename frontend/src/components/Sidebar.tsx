import React from 'react';
import { Paper, Button, List, ListItem, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faMusic, faHandshake, faStar } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  onSelect: (view: string) => void;
  selectedView: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelect, selectedView }) => {
  const theme = useTheme();

  const buttons = [
    // { label: 'Home', value: 'Home', startIcon: <FontAwesomeIcon icon={faHome}/> },
    { label: 'Artist Profile', value: 'ArtistProfile', startIcon: <FontAwesomeIcon icon={faUser}/> },
    { label: 'Similar Artists', value: 'SimilarArtists', startIcon: <FontAwesomeIcon icon={faUsers}/> },
    { label: 'Audio Features', value: 'AudioFeatures', startIcon: <FontAwesomeIcon icon={faMusic}/> },
    { label: 'Collaboration', value: 'Collaboration', startIcon: <FontAwesomeIcon icon={faHandshake}/> },
    { label: 'Recommender', value: 'Recommender', startIcon: <FontAwesomeIcon icon={faStar}/> },
  ];

  return (
    <Paper sx={{ width: 240, p: 2, height: '100vh', backgroundColor: theme.palette.background.default, boxShadow: "none" }}>
      <List>
        {buttons.map((btn) => (
          <ListItem key={btn.value} disablePadding>
            <Button
              fullWidth
              startIcon={btn.startIcon}
              onClick={() => onSelect(btn.value)}
              variant={selectedView === btn.value ? 'contained' : 'text'}
              sx={{
                mb: 2,
              }}
            >
              {btn.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
