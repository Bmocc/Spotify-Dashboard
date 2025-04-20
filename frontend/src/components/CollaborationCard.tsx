// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import { Paper, useTheme, CircularProgress } from '@mui/material';
// import { Box } from '@mui/system';
// import ForceGraph2D from 'react-force-graph-2d';

// export interface ArtistNode {
//   id: number;
//   artist_id: string;  
//   name: string;
//   genre: string;
// }

// export interface CollaborationLink {
//     source: ArtistNode;
//     target: ArtistNode;
//     sharedTracks?: Track[];
//   }
  

// export interface CollaborationData {
//   nodes: ArtistNode[];
//   links: CollaborationLink[];
// }

// interface Track {
//   id: string;
//   name: string;
//   duration: number;
//   popularity: number;
//   explicit: number;
// }

// interface CollaborationProps {
//   artistId: string;
// }

// export const Collaboration: React.FC<CollaborationProps> = ({ artistId }) => {
//   const theme = useTheme();
//   const [collabData, setCollabData] = useState<CollaborationData | null>(null);
//   const [selectedArtist, setSelectedArtist] = useState<ArtistNode | null>(null);
//   const [artistTracks, setArtistTracks] = useState<Track[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [loadingTracks, setLoadingTracks] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     axios.get<CollaborationData>(`/api/collaboration/${artistId}/`)
//       .then(response => {
//         setCollabData(response.data);
//         console.log("Collaboration data:", response.data);
//         setError(null); 
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching collaboration data:", err);
//         setError("Error fetching collaboration data");
//         setLoading(false);
//       });
//   }, [artistId]);

//   const handleNodeClick = (node: ArtistNode) => {
//     setSelectedArtist(node);
//     setLoadingTracks(true);
  
//     const matchingLinks = collabData?.links.filter(link => link.target.id === node.id) || [];
//     console.log("Matching links for node:", node, matchingLinks);
    
//     const tracks = matchingLinks.reduce<Track[]>((acc, link) => {
//       if (Array.isArray(link.sharedTracks)) {
//         return [...acc, ...link.sharedTracks];
//       }
//       return acc;
//     }, []);
    
//     console.log("Tracks found:", tracks);
//     setArtistTracks(tracks);
//     setLoadingTracks(false);
//   };
  
  

//   if (loading) return <div>Loading collaboration data...</div>;
//   if (error) return <div>{error}</div>;
//   if (!collabData) return <div>No collaboration data available.</div>;

//   return (
//     <Box display="flex" gap={2}>
//       {/* Graph Card */}
//       <Paper elevation={5} sx={{ width: 500, height: 360, position: 'relative', backgroundColor: theme.palette.background.default }}>
//         <Typography variant="h4" align="center" sx={{ mt: 1 }}>Collab Profile</Typography>
//         <Box sx={{ width: 500, height: 300, color: "#1DB954" }}>
//             <ForceGraph2D
//             graphData={{ nodes: collabData.nodes, links: collabData.links }}
//             width={500}
//             height={300}
//             nodeLabel="name"
//             nodeAutoColorBy="genre"
//             linkDirectionalParticles={2}
//             linkDirectionalParticleWidth={2}
//             onNodeClick={handleNodeClick}
//           />
//         </Box>
//       </Paper>

//       {/* Track Card */}
//       {selectedArtist && (
//         <Paper elevation={5} sx={{ width: 400, height: 360, p: 2, backgroundColor: theme.palette.background.default }}>
//           <Typography variant="h5">{selectedArtist.name}'s Songs</Typography>
//           <Typography variant="subtitle2" color="textSecondary" gutterBottom>{selectedArtist.genre}</Typography>

//           {loadingTracks ? (
//             <CircularProgress />
//           ) : (
//             <Box sx={{ maxHeight: 280, overflowY: 'auto', mt: 1 }}>
//               {artistTracks.length === 0 ? (
//                 <Typography>No tracks found.</Typography>
//               ) : (
//                 artistTracks.map((track) => (
//                   <Box key={track.id} sx={{ mb: 1 }}>
//                     <Typography variant="subtitle1">{track.name}</Typography>
//                     <Typography variant="caption" color="textSecondary">
//                       Popularity: {track.popularity} 
//                     </Typography>
//                   </Box>
//                 ))
//               )}
//             </Box>
//           )}
//         </Paper>
//       )}
//     </Box>
//   );
// };

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Paper, useTheme, CircularProgress, Box } from '@mui/material';
import ForceGraph2D from 'react-force-graph-2d';

export interface ArtistNode {
  id: number;
  artist_id: string;
  name: string;
  genre: string;
}

export interface CollaborationLink {
  source: ArtistNode;
  target: ArtistNode;
  sharedTracks?: Track[];
}

export interface CollaborationData {
  nodes: ArtistNode[];
  links: CollaborationLink[];
}

interface Track {
  id: string;
  name: string;
  duration: number;
  popularity: number;
  explicit: number;
}

interface CollaborationProps {
  artistId: string;
}

// Collaboration Graph Component
const CollaborationGraph: React.FC<{
  data: CollaborationData;
  onNodeClick: (node: ArtistNode) => void;
  selectedArtist: ArtistNode | null;
  width: number;
}> = ({ data, onNodeClick, selectedArtist, width }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={5}
      sx={{
        width: '100%',
        height: 600,
        p: 2,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
      }}
    >
      <Typography variant="h4" align="center" sx={{ mt: 1 }}>
        Collab Profile
      </Typography>
      <Box sx={{ width: '100%', height: 550 }}>
        <ForceGraph2D
          graphData={data}
          width={width}
          height={550}
          nodeLabel="name" // Only shows on hover as a tooltip
          nodeAutoColorBy="genre"
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          onNodeClick={onNodeClick}
          onNodeDragEnd={(node: any) => {
            // Freeze the node after dragging
            node.fx = node.x;
            node.fy = node.y;
          }}
          nodeCanvasObject={(node: any, ctx, _globalScale) => {
            // Draw only the node circle (no text label)
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color || '#1DB954';
            ctx.fill();
            if (selectedArtist && node.id === selectedArtist.id) {
              ctx.lineWidth = 2;
              ctx.strokeStyle = 'red';
              ctx.stroke();
            }
          }}
        />
      </Box>
    </Paper>
  );
};

// Collaboration Tracks (Artist Detail) Component
const CollaborationTracks: React.FC<{
  artist: ArtistNode | null;
  tracks: Track[];
  loading: boolean;
}> = ({ artist, tracks, loading }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={5}
      sx={{
        width: '100%',
        height: 600,
        p: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {artist ? (
        <>
          <Typography variant="h5" sx={{ ml: 2, mt: 2, color: theme.palette.primary.main }}>{artist.name}</Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {artist.genre}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ maxHeight: 540, overflowY: 'auto', mt: 1 }}>
              {tracks.length === 0 ? (
                <Typography>No tracks found.</Typography>
              ) : (
                tracks.map((track) => (
                  <Box key={track.id} sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">{track.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Popularity: {track.popularity}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          )}
        </>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Click a node to view artist details
        </Typography>
      )}
    </Paper>
  );
};

export const Collaboration: React.FC<CollaborationProps> = ({ artistId }) => {
  const [collabData, setCollabData] = useState<CollaborationData | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<ArtistNode | null>(null);
  const [artistTracks, setArtistTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTracks, setLoadingTracks] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [graphWidth, setGraphWidth] = useState<number>(window.innerWidth / 2);

  // Update graph width on window resize (half of window width)
  useEffect(() => {
    const handleResize = () => {
      setGraphWidth(window.innerWidth / 2);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch collaboration data when artistId changes
  useEffect(() => {
    setLoading(true);
    axios
      .get<CollaborationData>(`/api/collaboration/${artistId}/`)
      .then((response) => {
        setCollabData(response.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching collaboration data:', err);
        setError('Error fetching collaboration data');
        setLoading(false);
      });
  }, [artistId]);

  // Memoized handler for node click
  const handleNodeClick = useCallback(
    (node: ArtistNode) => {
      setSelectedArtist(node);
      setLoadingTracks(true);

      if (!collabData) return;

      const matchingLinks = collabData.links.filter(
        (link) => link.target.id === node.id
      );
      const tracks = matchingLinks.reduce<Track[]>((acc, link) => {
        if (Array.isArray(link.sharedTracks)) {
          return [...acc, ...link.sharedTracks];
        }
        return acc;
      }, []);
      setArtistTracks(tracks);
      setLoadingTracks(false);
    },
    [collabData]
  );

  if (loading) return <div>Loading collaboration data...</div>;
  if (error) return <div>{error}</div>;
  if (!collabData) return <div>No collaboration data available.</div>;

  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
      <Box sx={{ flex: 1 }}>
        <CollaborationGraph
          data={collabData}
          onNodeClick={handleNodeClick}
          selectedArtist={selectedArtist}
          width={graphWidth}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <CollaborationTracks
          artist={selectedArtist}
          tracks={artistTracks}
          loading={loadingTracks}
        />
      </Box>
    </Box>
  );
};
