import React, { useState, useEffect } from 'react';
// import { Box, Typography, Paper, useTheme } from "@mui/material";
import axios from 'axios';
import { Box, Paper, Typography, Avatar, LinearProgress, useTheme } from '@mui/material';

interface SimilarArtistData {
  id: string;
  name: string;
  percentage: number;
}

interface SimilarArtistsProps {
  artistId: string;
  title?: string;
}

// export const SimilarArtists: React.FC<SimilarArtistsProps> = ({ artistId, title }) => {
export const SimilarArtists: React.FC<SimilarArtistsProps> = ({ artistId, title }) => {
  const theme = useTheme();
  const [data, setData] = useState<SimilarArtistData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get<SimilarArtistData[]>(`/api/similar_artists/${artistId}/`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching similar artists", err);
        setError("Error fetching similar artists");
        setLoading(false);
      });
  }, [artistId]);

  if (loading) return <div>Loading similar artists...</div>;
  if (error) return <div>{error}</div>;
  if (data.length === 0) return <div>No similar artists found.</div>;

//   return (
//     <Paper
//       elevation={5}
//       sx={{
//         width: 'auto',
//         maxWidth: 900,
//         margin: '20px auto',
//         p: 2,
//         backgroundColor: theme.palette.background.default,
//       }}
//     >
//       {/* Title */}
//       <Box sx={{ textAlign: 'center', mb: 2 }}>
//         <Typography variant="h4">
//           {title ? title : "Similar Artists"}
//         </Typography>
//       </Box>

//       {/* Container for the list of artists */}
//       <Box
//         sx={{
//           width: '100%',
//           // Example: minWidth: 400, maxWidth: 800
//           margin: '0 auto',
//         }}
//       >
//         {data.map((item) => (
//           <Box key={item.id} sx={{ mb: 3 }}>
//             <Box
//               sx={{
//                 position: "relative",
//                 width: "100%",
//                 height: 35,
//                 backgroundColor: "transparent",
//               }}
//             >
//               {/* The filled bar */}
//               <Box
//                 sx={{
//                   width: `${item.percentage}%`,
//                   height: "100%",
//                   borderRadius: 4,
//                   backgroundColor: theme.palette.primary.main,
//                   transition: "width 0.3s ease-in-out",
//                 }}
//               />
//               {/* Label that shows the artist name and percentage */}
//               <Typography
//                 variant="body2"
//                 sx={{
//                   position: "absolute",
//                   top: "50%",
//                   left: `${item.percentage + 2}%`,
//                   transform: "translate(-5px, -50%)",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {item.name} ({item.percentage}%)
//               </Typography>
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     </Paper>
//   );
// };


  return (
    <Paper
      elevation={5}
      sx={{
        width: '95%',
        maxWidth: 900,
        margin: '20px auto',
        p: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {title && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4">{title}</Typography>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          py: 1,
          // Optionally, add custom scrollbar styling if needed.
        }}
      >
        {data.map((item) => (
          <Paper
            key={item.id}
            elevation={3}
            sx={{
              minWidth: 200,
              flex: '0 0 auto',
              p: 2,
              textAlign: 'center',
            }}
          >
            <Avatar
              alt={item.name}
              sx={{ width: 80, height: 80, margin: '0 auto', mb: 1 }}
            />
            <Typography variant="h6" noWrap>
              {item.name}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">Similarity</Typography>
              <LinearProgress
                variant="determinate"
                value={item.percentage}
                sx={{ height: 10, borderRadius: 2 }}
              />
              <Typography variant="caption">{item.percentage}%</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};
