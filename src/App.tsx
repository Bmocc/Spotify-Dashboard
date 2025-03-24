import { ArtistSearch } from './components/ArtistSearch';
import { ArtistProfile } from './components/ArtistProfileCard';
import { Genre } from './components/GenreCard';
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

  const sampleData = [
    { genre: "Rock", percentage: 37 },
    { genre: "Pop", percentage: 30 },
    { genre: "Psychedelic", percentage: 20 },
    { genre: "Folk", percentage: 10 },
    { genre: "Blues", percentage: 3 },
  ];

  const theme = useMemo(() => getTheme(mode), [mode]);

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
              <ArtistSearch />
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
              <ArtistProfile />
            </Box>

            <Box
              sx={{
                top: 100,
                mr: 4,
                position: "absolute",
                width: 900,
                height: 400,
          }}
            >
              <Genre data={sampleData} />
            </Box>
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};