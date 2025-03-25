import React from 'react';
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

export interface AudioFeaturesData {
  id: string;
  acousticness: number;
  danceability: number;
  duration: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  valence: number;
  genre?: string; 
}

interface AudioFeaturesProps {
  data: AudioFeaturesData;
  title?: string;
}

// Define the available features as options.
// const featureOptions = [
//   { value: 'acousticness', label: 'Acousticness' },
//   { value: 'danceability', label: 'Danceability' },
//   { value: 'duration', label: 'Duration' },
//   { value: 'energy', label: 'Energy' },
//   { value: 'instrumentalness', label: 'Instrumentalness' },
//   { value: 'key', label: 'Key' },
//   { value: 'liveness', label: 'Liveness' },
//   { value: 'loudness', label: 'Loudness' },
//   { value: 'mode', label: 'Mode' },
//   { value: 'speechiness', label: 'Speechiness' },
//   { value: 'tempo', label: 'Tempo' },
//   { value: 'time_signature', label: 'Time Signature' },
//   { value: 'valence', label: 'Valence' },
// ];


export const AudioFeatures: React.FC<AudioFeaturesProps> = ({ data, title }) => {
  const theme = useTheme();
//   const [xFeature, setXFeature] = useState('energy');         
//   const [yFeature, setYFeature] = useState('danceability');
  
  const radarData = [
    { subject: 'Acousticness', value: data.acousticness, fullMark: 1 },
    { subject: 'Danceability', value: data.danceability, fullMark: 1 },
    { subject: 'Energy', value: data.energy, fullMark: 1 },
    { subject: 'Instrumentalness', value: data.instrumentalness, fullMark: 1 },
    { subject: 'Liveness', value: data.liveness, fullMark: 1 },
    { subject: 'Speechiness', value: data.speechiness, fullMark: 1 },
    { subject: 'Valence', value: data.valence, fullMark: 1 },
  ];

  // If genre data exists, group the data by genre for different colors.
  // Otherwise, use a single group.
//   let groupedData: { [key: string]: AudioFeaturesData[] } = {};
//   if (data.length && data[0].genre) {
//     groupedData = data.reduce((acc: { [key: string]: AudioFeaturesData[] }, item) => {
//       const key = item.genre || 'Unknown';
//       if (!acc[key]) {
//         acc[key] = [];
//       }
//       acc[key].push(item);
//       return acc;
//     }, {});
//   } else {
//     groupedData = { All: data };
//   }
  
//   // Define colors for each series (if more groups than colors, they will cycle).
//   const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F'];
//   const groups = Object.keys(groupedData);

  return (
    <Paper
    elevation={5}
      sx={{
        width: 900,
        position: 'relative',
        alignItems: 'center',
        height: 360,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
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
      {title && (
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
      )}
      </Box>

      <Paper
        sx={{
          top: 50,
          width: 400,
          position: 'relative',
          alignItems: 'center',
          height: 300,
          left: 10
        }}
      >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 1]} />
          <Radar
            name="Audio Feature"
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
    </Paper>
  );
};
