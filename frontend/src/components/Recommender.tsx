import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Track, Artist } from '../models'; 

export const Recommender: React.FC = () => {
  const [audioParams, setAudioParams] = useState({
    danceability: [0, 1] as number[],
    energy: [0, 1] as number[],
    tempo: [0, 1] as number[],
    valence: [0, 1] as number[],
  });

  const [numSongs, setNumSongs] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSliderChange = (feature: string) => (
    _: Event,
    newValue: number | number[]
  ): void => {
    setAudioParams((prev) => ({
      ...prev,
      [feature]: newValue as number[],
    }));
  };

  const handleNumSongsChange = (_: Event, newValue: number | number[]): void => {
    setNumSongs(newValue as number);
  };

  const handleGeneratePlaylist = () => {
    setLoading(true);
    setError(null);
    axios
      .get<Track[]>('/api/recommender/', { params: { ...audioParams, top_n: numSongs } })
      .then((response) => {
        console.log('API response:', response.data);
        setRecommendations(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching recommendations:', err);
        setError('Error fetching recommendations');
        setLoading(false);
      });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Track Recommender
      </Typography>
      {/* Two-column layout: left for sliders, right for playlist */}
      <Grid container spacing={4}>
        {/* Left Column: Slider Controls */}
        <Grid item xs={12} md={6} sx={{ height: '600px' }}>
          <Card sx={{ height: '100%', overflowY: 'auto' }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Adjust the sliders to select your preferred range of audio features.
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(audioParams).map(
                  ([feature, value]: [string, number[]]) => (
                    <Grid item xs={12} key={feature}>
                      <Typography variant="subtitle1" gutterBottom>
                        {feature.charAt(0).toUpperCase() + feature.slice(1)}: {value[0].toFixed(2)} – {value[1].toFixed(2)}
                      </Typography>
                      <Slider
                        value={value}
                        onChange={handleSliderChange(feature)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1}
                        step={0.01}
                        aria-labelledby={`${feature}-slider`}
                      />
                    </Grid>
                  )
                )}
                {/* New slider for Number of Songs */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Number of Songs: {numSongs}
                  </Typography>
                  <Slider
                    value={numSongs}
                    onChange={handleNumSongsChange}
                    valueLabelDisplay="auto"
                    min={1}
                    max={20}
                    step={1}
                    aria-labelledby="number-of-songs-slider"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGeneratePlaylist}
                sx={{ mt: 2 }}
              >
                Generate Playlist
              </Button>
              {loading && (
                <CircularProgress sx={{ display: 'block', mt: 2, margin: 'auto' }} />
              )}
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Right Column: Playlist Display */}
        <Grid item xs={12} md={6} sx={{ height: '600px' }}>
          {recommendations.length > 0 ? (
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* We wrap the content in a Box with overflowY auto */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  pr: 1  // optional right padding for a nicer scrollbar appearance
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Recommended Tracks
                </Typography>
                {recommendations.map((track, index) => (
                  <Paper key={track.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">
                      {index + 1}. {track.name}
                    </Typography>
                    <Typography variant="body2">
                      Artist:{' '}
                      {track.artist
                        ? typeof track.artist === 'object'
                          ? (track.artist as Artist).name
                          : track.artist
                        : 'Unknown'}
                    </Typography>
                    <Typography variant="body2">
                      Popularity: {track.popularity}
                    </Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          ) : (
            !loading &&
            !error && (
              <Typography align="center">No recommendations found.</Typography>
            )
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
