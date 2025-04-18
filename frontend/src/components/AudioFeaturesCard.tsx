import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { AudioFeaturesData } from '../models';

interface AudioFeaturesProps {
  artistId: string;
  title?: string;
}

interface AudioFeaturesResponse {
    artistFeatures: AudioFeaturesData;
    genreFeatures: AudioFeaturesData;
  }
  

export const AudioFeatures: React.FC<AudioFeaturesProps> = ({ artistId, title }) => {
  const theme = useTheme();
  const [data, setData] = useState<AudioFeaturesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get<AudioFeaturesResponse>(`/api/audio_features/${artistId}/`)
      .then(response => {
        setData(response.data);
        console.log("Audio features data:", response.data);
        setError(null); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching audio features:", err);
        setError("Error fetching audio features");
        setLoading(false);
      });
  }, [artistId]);

  if (loading) return <div>Loading audio features...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No audio features available.</div>;

  const radarDataArtist = [
    { subject: 'Acousticness', value: data.artistFeatures.acousticness, fullMark: 1 },
    { subject: 'Danceability', value: data.artistFeatures.danceability, fullMark: 1 },
    { subject: 'Energy', value: data.artistFeatures.energy, fullMark: 1 },
    { subject: 'Instrumentalness', value: data.artistFeatures.instrumentalness, fullMark: 1 },
    { subject: 'Liveness', value: data.artistFeatures.liveness, fullMark: 1 },
    { subject: 'Speechiness', value: data.artistFeatures.speechiness, fullMark: 1 },
    { subject: 'Valence', value: data.artistFeatures.valence, fullMark: 1 },
  ];

  const radarDataGenre = [
    { subject: 'Acousticness', value: data.genreFeatures.acousticness, fullMark: 1 },
    { subject: 'Danceability', value: data.genreFeatures.danceability, fullMark: 1 },
    { subject: 'Energy', value: data.genreFeatures.energy, fullMark: 1 },
    { subject: 'Instrumentalness', value: data.genreFeatures.instrumentalness, fullMark: 1 },
    { subject: 'Liveness', value: data.genreFeatures.liveness, fullMark: 1 },
    { subject: 'Speechiness', value: data.genreFeatures.speechiness, fullMark: 1 },
    { subject: 'Valence', value: data.genreFeatures.valence, fullMark: 1 },
  ];


  return (
    <Paper
      elevation={5}
      sx={{
        width: 900,
        minHeight: 500,
        backgroundColor: theme.palette.background.default,
        p: 2,
        position: 'relative',
      }}
    >
    {/* Title */}
    <Box
    sx={{
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    }}
    >
    {title && (
        <Typography variant="h4" align="center" gutterBottom>
        {title}
        </Typography>
    )}
    </Box>

    <Box sx={{ top: 60, display: 'flex', justifyContent: 'space-between', gap: 2 }}>

      {/* Radar Chart Section */}
      <Paper
        sx={{
          top: 100,
          width: 500,
          height: 400,
          left: 10,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarDataArtist}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 1]} />
            <Radar
              name="Audio Feature of Artist"
              dataKey="value"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.main}
              fillOpacity={0.6}
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Comparative Insights Section */}
      <Paper
        sx={{
          top: 100,
          width: 500,
          height: 400,
          right: 10,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarDataGenre}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 1]} />
            <Radar
              name="Audio Feature of Genre"
              dataKey="value"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.main}
              fillOpacity={0.6}
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
    </Paper>
  );
};
