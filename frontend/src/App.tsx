import { ArtistSearch } from './components/ArtistSearch';
import { Home } from './components/Home';
import { ArtistProfile } from './components/ArtistProfileCard';
import { SimilarArtists } from './components/SimilarArtistsCard';
import { AudioFeatures } from './components/AudioFeaturesCard';
import { Collaboration } from './components/CollaborationCard';
import { Recommender } from './components/Recommender';
import { Sidebar } from './components/Sidebar';
import React, { useState, useMemo } from "react";
import { Paper, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./theme";
import { ColorModeContext } from "./components/ColorModeContext";
import { Artist } from './models';

export const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(() => ({
    mode,
    setMode: (newMode: "light" | "dark") => setMode(newMode),
    toggleColorMode: () => setMode(prevMode => (prevMode === "light" ? "dark" : "light")),
  }), [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [currentView, setCurrentView] = useState<string>("Home");

  const handleArtistSelected = (artist: Artist) => {
    setCurrentArtist(artist);
  };

  const renderView = () => {
    if (currentView === "Recommender") {
      return <Recommender />;
    }

    if (!currentArtist) {
      return <div>Please search for and select an artist.</div>;
    }

    const artistId = String(currentArtist.id);
    switch (currentView) {
      case "ArtistProfile":
        return <ArtistProfile artistId={artistId} />;
      case "SimilarArtists":
        return <SimilarArtists artistId={artistId} />;
      case "AudioFeatures":
        return <AudioFeatures artistId={artistId} title="Audio Feature Radar" />;
      case "Collaboration":
        return <Collaboration artistId={artistId} />;
      case "Recommender":
        return <Recommender />;
      default:
        return <Home />;
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper sx={{ minHeight: "100vh" }}>
          <Box      
            sx={{
              position: "absolute",
              width: "calc(100% - 240px)",
              height: "60px",
              left: 240
            }}
          >
            <ArtistSearch onArtistSelected={handleArtistSelected} />
          </Box>
          <Box sx={{ display: "flex" }}>
            {/* Sidebar with view selection */}
            <Sidebar onSelect={setCurrentView} selectedView={currentView} />
            {/* Main content area */}
            <Box sx={{ flexGrow: 1, p: 2, mt: 10 }}>
              {renderView()}
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
