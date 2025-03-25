import { ArtistSearch } from './components/ArtistSearch';
import { ArtistProfile, Artist } from './components/ArtistProfileCard';
import { SimilarArtist } from './components/SimilarArtistsCard';
import { Genre } from './components/GenreCard';
import { AudioFeatures, AudioFeaturesData } from './components/AudioFeaturesCard';
import { Collaboration, ArtistNode, CollaborationLink } from './components/CollaborationCard';
import React, { useState, useMemo } from "react";
import { Paper, Box} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./theme";
import { ColorModeContext } from "./components/ColorModeContext";

export const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      mode,
      setMode: (newMode: "light" | "dark") => setMode(newMode),
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const nodes: ArtistNode[] = [
    { id: 1, name: 'The Wailers', genre: 'Reggae' },
    { id: 2, name: 'Artist B', genre: 'Ska' },
    { id: 3, name: 'Artist C', genre: 'Steady Rock' },
    { id: 4, name: 'Artist D', genre: 'Rock' },
  ];

  const links: CollaborationLink[] = [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
  ];

  const similarArtistData = [
    { genre: "The Wailers", percentage: 94 },
    { genre: "Peter Tosh", percentage: 81 },
    { genre: "Toots and The Maytals", percentage: 73 },
    { genre: "Gregory Isaacs", percentage: 45 },
    { genre: "Jimmy Cliff", percentage: 30 },
  ];

  const genreData = [
    { genre: "Rock", percentage: 94 },
    { genre: "Pop", percentage: 81 },
    { genre: "Psychedelic", percentage: 73 },
    { genre: "Folk", percentage: 45 },
    { genre: "Blues", percentage: 30 },
  ];

  const audioFeaturesData: AudioFeaturesData = {
    id: '2jKoVlU7VAmExKJ1Jh3w9P',
    acousticness: 0.18,
    danceability: 0.893,
    duration: 219160,
    energy: 0.514,
    instrumentalness: 0.0,
    key: 11,
    liveness: 0.0596,
    loudness: -5.08,
    mode: 1,
    speechiness: 0.283,
    tempo: 95.848,
    time_signature: 4,
    valence: 0.787,
    genre: 'Reggae',
  };

  const artistsData = [
    { id: 1, name: 'Bob Marley', genre: 'Reggae', popularity: 85 },
    { id: 2, name: 'Drake', genre: 'Hip-Hop', popularity: 95 },
    { id: 3, name: 'Taylor Swift', genre: 'Pop', popularity: 90 },
    { id: 4, name: 'The Beatles', genre: 'Rock', popularity: 98 },
    { id: 5, name: 'Adele', genre: 'Soul', popularity: 92 },
  ];

  const theme = useMemo(() => getTheme(mode), [mode]);
  const [artist, setArtists] = useState<Artist[]>([]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper>
          <Box      
          sx={{
            position: "absolute",
            width: "100%",
            height: "60px",
          }}
          >
              <ArtistSearch onSearchResults={setArtists}/>
          </Box>

          <Box
              sx={{
                top: 100,
                ml: 4,
                position: "absolute",
                width: 500,
                height: 400,
          }}
            >
              {artistsData.map((artist: Artist) => (
                <ArtistProfile key={artist.id} artist={artist} />
              ))}
            </Box>

            <Box
              sx={{
                top: 100,
                ml: 4,
                position: "absolute",
                width: 900,
                height: 400,
          }}
            >
              <SimilarArtist data={similarArtistData}/>
            </Box>

            <Box
              sx={{
                top: 100,
                right: 10,
                mr: 4,
                position: "absolute",
                height: 400,
          }}
            >
              <Collaboration nodes={nodes} links={links}/>
            </Box>

            <Box
              sx={{
                bottom: 10,
                right: 10,
                mr: 4,
                position: "absolute",
                width: 900,
                height: 400,
          }}
            >
              <Genre data={genreData} />
            </Box>

            <Box
              sx={{
                bottom: 10,
                ml: 4,
                position: "absolute",
                width: 900,
                height: 400,
          }}
            >
              <AudioFeatures data={audioFeaturesData} title="Audio Feature Radar"/>
            </Box>
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};