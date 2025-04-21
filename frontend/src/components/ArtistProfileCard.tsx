import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Avatar, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from 'recharts';
import { Artist } from '../models';
import { AlbumDetails } from './AlbumDetails';

interface ArtistProfileProps {
  artistId: string;
}

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artistId }) => {
  const theme = useTheme();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);

  const handleDotClick = (payload: any) => {
    setSelectedAlbum(payload);
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const [dotSize, setDotSize] = useState(5);
    const hitAreaSize = dotSize + 1; 
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <>
        {/* Invisible larger circle to capture clicks */}
        <circle
          cx={cx}
          cy={cy}
          r={hitAreaSize}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => handleDotClick(payload)}
        />
        {/* Visible dot */}
        <circle
          cx={cx}
          cy={cy}
          r={dotSize}
          fill={isHovered ? theme.palette.secondary.main : '#fff'}
          stroke={theme.palette.secondary.main}
          strokeWidth={1}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => {
            setDotSize(13);
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setDotSize(5);
            setIsHovered(false);
          }}
          onClick={() => handleDotClick(payload)}
        />
      </>
    );
  };
  

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 1 }}>
          <Typography variant="subtitle2">Date: {data.releaseDate}</Typography>
          <Typography variant="body2">Album: {data.albumName}</Typography>
          <Typography variant="body2">Popularity: {data.popularity}</Typography>
        </Paper>
      );
    }
    return null;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get<Artist>(`/api/artist/${artistId}/`)
      .then(response => {
        setArtist(response.data);
        console.log("Artist data:", response.data);
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching artist data:", err);
        setError("Error fetching artist data");
        setLoading(false);
      });
  }, [artistId]);

  if (loading) return <div>Loading artist profile...</div>;
  if (error) return <div>{error}</div>;
  if (!artist) return <div>No artist found.</div>;

  const trendData = (artist.albums || [])
  .slice()  
  .sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
  .map(album => ({
    ...album,
    month: album.releaseDate,  
  }));

  return (
    <Box display="flex" flexWrap="wrap" gap={2} position="relative">
      {/* Artist Details Card */}
      <Paper
        elevation={5}
        sx={{
          width: 300,
          minHeight: 500,
          backgroundColor: theme.palette.background.default,
          p: 2,
          position: 'relative',
        }}
      >
        <Avatar
          sx={{
            width: 150,
            height: 150,
            border: 2,
            borderColor: 'primary.main',
            fontSize: '2rem',
            mx: 'auto',
          }}
        >
          {artist.popularity}
        </Avatar>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="h5">{artist.name}</Typography>
          <Typography variant="subtitle2" color="#1DB954">
            {artist.genres.join(' | ')}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Average Track Popularity: {artist.averageTrackPopularity.toFixed(1)}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Total Tracks: {artist.totalTracks}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Solo Tracks: {artist.collaborationCount.solo} | Collaborations: {artist.collaborationCount.collaboration}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Top Performing Tracks:</Typography>
          {artist.topTracks.map((track, index) => (
            <Typography variant="body2" key={index}>
              {track.trackName} ({track.popularity})
            </Typography>
          ))}
        </Box>
      </Paper>

      {/* Trends Over Time Card */}
      <Paper
        elevation={5}
        sx={{
          width: 800,
          minHeight: 400,
          backgroundColor: theme.palette.background.default,
          p: 2,
          position: 'relative',
        }}
      >
        <Typography variant="body1" sx={{ mb: 1 }}>
          Trends Over Time:
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
          <XAxis
            dataKey="month"
            tickFormatter={(tick: string) => {
              const date = new Date(tick);
              return `${date.getMonth() + 1}/${date.getFullYear()}`;
              // return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            }}
          >
            <Label value="Month/Year" position="insideBottom" offset={-5} />
          </XAxis>
            <YAxis domain={['auto', 'auto']}>
              <Label
                value="Popularity"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="popularity"
              stroke={theme.palette.primary.main}
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Album Details Component (conditionally rendered) */}
      {selectedAlbum && (
        <AlbumDetails album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
      )}
    </Box>
  );
};
