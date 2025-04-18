// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Paper, Avatar, Typography, useTheme } from '@mui/material';
// import { Box } from '@mui/system';
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
// import { Artist } from '../models';

// interface ArtistProfileProps {
//   artistId: string;
// }

// export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artistId }) => {
//   const theme = useTheme();
//   const [artist, setArtist] = useState<Artist | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <Paper sx={{ p: 1 }}>
//           <Typography variant="subtitle2">Date: {label}</Typography>
//           <Typography variant="body2">Album: {data.albumName}</Typography>
//           <Typography variant="body2">Popularity: {data.popularity}</Typography>
//         </Paper>
//       );
//     }
//     return null;
//   };
  

//   useEffect(() => {
//     setLoading(true);
//     axios.get<Artist>(`/api/artist/${artistId}/`)
//       .then(response => {
//         setArtist(response.data);
//         console.log("Artist data:", response.data);
//         setError(null);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching artist data:", err);
//         setError("Error fetching artist data");
//         setLoading(false);
//       });
//   }, [artistId]);

//   if (loading) return <div>Loading artist profile...</div>;
//   if (error) return <div>{error}</div>;
//   if (!artist) return <div>No artist found.</div>;

//   return (
//     <Box display="flex" flexWrap="wrap" gap={2}>
//       {/* Artist Details Card */}
//       <Paper
//         elevation={5}
//         sx={{
//           width: 300,
//           minHeight: 500,
//           backgroundColor: theme.palette.background.default,
//           p: 2,
//           position: 'relative',
//         }}
//       >
//         {/* Avatar displays the popularity score */}
//         <Avatar
//           sx={{
//             width: 150,
//             height: 150,
//             border: 2,
//             borderColor: 'primary.main',
//             fontSize: '2rem',
//             mx: 'auto',
//           }}
//         >
//           {artist.popularity}
//         </Avatar>

//         {/* Artist Name and Genres */}
//         <Box sx={{ mt: 2, textAlign: 'center' }}>
//           <Typography variant="h5">{artist.name}</Typography>
//           <Typography variant="subtitle2" color="#1DB954">
//             {artist.genres.join(' | ')}
//           </Typography>
//         </Box>

//         {/* Average Track Popularity */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="body1">
//             Average Track Popularity: {artist.averageTrackPopularity.toFixed(1)}
//           </Typography>
//         </Box>

//         {/* Total Tracks */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="body1">
//             Total Tracks: {artist.totalTracks}
//           </Typography>
//         </Box>

//         {/* Collaboration Count */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="body1">
//             Solo Tracks: {artist.collaborationCount.solo} | Collaborations: {artist.collaborationCount.collaboration}
//           </Typography>
//         </Box>

//         {/* Top Performing Tracks */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="body1">Top Performing Tracks:</Typography>
//           {artist.topTracks.map((track, index) => (
//             <Typography variant="body2" key={index}>
//               {track.trackName} ({track.popularity})
//             </Typography>
//           ))}
//         </Box>
//       </Paper>

//       {/* Trends Over Time Card */}
//       <Paper
//         elevation={5}
//         sx={{
//           width: 600,
//           minHeight: 400,
//           backgroundColor: theme.palette.background.default,
//           p: 2,
//           position: 'relative',
//         }}
//       >
//         <Typography variant="body1" sx={{ mb: 1 }}>
//           Trends Over Time:
//         </Typography>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={artist.trendData}>
//             <XAxis dataKey="month" />
//             <YAxis domain={['auto', 'auto']} />
//             <Tooltip content={<CustomTooltip />} />
//             <Line
//               type="monotone"
//               dataKey="popularity"
//               stroke={theme.palette.primary.main}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Paper>
//     </Box>
//   );
// };


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Avatar, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
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
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={theme.palette.secondary.main}
        stroke="white"
        strokeWidth={1}
        style={{ cursor: 'pointer' }}
        onClick={() => handleDotClick(payload)}
      />
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 1 }}>
          <Typography variant="subtitle2">Date: {label}</Typography>
          <Typography variant="body2">Album: {data.albumName}</Typography>
          <Typography variant="body2">Popularity: {data.popularity}</Typography>
        </Paper>
      );
    }
    return null;
  };

  useEffect(() => {
    setLoading(true);
    axios.get<Artist>(`/api/artist/${artistId}/`)
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
        {/* Avatar displays the popularity score */}
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

        {/* Artist Name and Genres */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="h5">{artist.name}</Typography>
          <Typography variant="subtitle2" color="#1DB954">
            {artist.genres.join(' | ')}
          </Typography>
        </Box>

        {/* Average Track Popularity */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Average Track Popularity: {artist.averageTrackPopularity.toFixed(1)}
          </Typography>
        </Box>

        {/* Total Tracks */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Total Tracks: {artist.totalTracks}
          </Typography>
        </Box>

        {/* Collaboration Count */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Solo Tracks: {artist.collaborationCount.solo} | Collaborations: {artist.collaborationCount.collaboration}
          </Typography>
        </Box>

        {/* Top Performing Tracks */}
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
          width: 600,
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
          <LineChart data={artist.trendData}>
            <XAxis dataKey="month" />
            <YAxis domain={['auto', 'auto']} />
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
