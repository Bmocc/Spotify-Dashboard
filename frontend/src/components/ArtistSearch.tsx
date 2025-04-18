import React, { useCallback, useRef, useState, useContext, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import Check from '@mui/icons-material/Check';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  ListItem,
  Tooltip,
  TextField,
  Paper,
  useTheme,
  Popover,
  List
} from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import axios from 'axios';
import { ColorModeContext } from "./ColorModeContext";
import { Artist } from '../models';

interface ArtistSearchProps {
  onArtistSelected: (artist: Artist) => void;
}

export const ArtistSearch: React.FC<ArtistSearchProps> = ({ onArtistSelected }) => {
  const [anchorElMore, setAnchorElMore] = useState<null | HTMLElement>(null);
  const openMore = Boolean(anchorElMore);
  const { mode, setMode } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorElMore(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleThemeSelect = (newMode: "light" | "dark") => {
    setMode(newMode);
    handleClose();
  };

  const textAreaRef = useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState<string>("Search for Artist");
  const [disabled, setDisabled] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<Artist[]>([]);
  const [resultsAnchorEl, setResultsAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedArtistName, setSelectedArtistName] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  // Function to perform the search
  const performSearch = useCallback((queryValue: string) => {
    if (queryValue.trim().length > 0) {
      setDisabled(true);
      setPlaceholder("Loading...");
      axios
        .get<Artist[]>(`http://127.0.0.1:8000/api/search_artist/?name=${encodeURIComponent(queryValue)}`)
        .then(response => {
          setSearchResults(response.data);
          if (textAreaRef.current) {
            setResultsAnchorEl(textAreaRef.current);
          }
        })
        .catch(error => {
          console.error("Error fetching artist data:", error);
        })
        .finally(() => {
          setDisabled(false);
          setPlaceholder("Search for an artist...");
        });
    }
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const timer = setTimeout(() => {
        performSearch(query);
      }, 300); 
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setResultsAnchorEl(null);
    }
  }, [query, performSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      performSearch(query);
    }
  };

  const handleArtistSelect = (artist: Artist) => {
    onArtistSelected(artist);
    setSelectedArtistName(artist.name);
    setSearchResults([]);
    setResultsAnchorEl(null);
    setQuery(""); 
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "60px",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          position: "relative",
          justifyContent: "center",
          height: 60,
          borderRadius: 5,
          ml: 4,
          mr: 4,
          mt: 1,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ ml: 2, mt: 2, color: theme.palette.primary.main }}>
            {selectedArtistName || ""}
          </Typography>
        </Box>
        <Paper
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            width: 600,
            height: 40,
            borderRadius: 5,
            border: 1,
            borderColor: "primary.main",
            right: 70,
            top: 10,
            backgroundColor: theme.palette.background.default
          }}
        >
          <TextField
            inputRef={textAreaRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            minRows={1}
            placeholder={placeholder}
            disabled={disabled}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", 
                  borderRadius: 1,
                },
              },
              "& .MuiInputBase-input": {
                padding: "0px 10px",
                overflow: "auto",
                width: "100%",
                alignItems: "center",
              },
            }}
          />
        </Paper>
        {/* Settings Menu */}
        <Tooltip title="Settings" arrow>
          <IconButton
            onClick={handleMoreClick}
            sx={{
              height: theme.spacing(5),
              position: "absolute",
              top: 8,
              right: 10,
              zIndex: 9999,
              padding: "5px 10px",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElMore}
          open={openMore}
          onClose={handleMoreClose}
          slotProps={{
            paper: {
              sx: {
                width: 250,
                p: 1,
                borderRadius: 4,
              },
            },
          }}
        >
          {/* Theme List Item */}
          <ListItem>
            <ListItemText primary={<Typography variant="subtitle1">Theme</Typography>} />
            <Button 
              onClick={handleClick} 
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ width: 50 }}
            >
              <Typography variant="subtitle2">
                {mode === "light" ? "Light" : "Dark"}
              </Typography>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              slotProps={{
                paper: { sx: { p: 1, borderRadius: 4 } },
              }}
            >
              <MenuItem onClick={() => handleThemeSelect("light")}>
                Light
                {mode === "light" && (
                  <ListItemIcon>
                    <Check sx={{ ml: 5, color: "white" }} />
                  </ListItemIcon>
                )}
              </MenuItem>
              <MenuItem onClick={() => handleThemeSelect("dark")}>
                Dark
                {mode === "dark" && (
                  <ListItemIcon>
                    <Check sx={{ ml: 5 }} />
                  </ListItemIcon>
                )}
              </MenuItem>
            </Menu>
          </ListItem>
        </Menu>
      </Paper>

      {/* Popover for displaying search results */}
      <Popover
        open={Boolean(resultsAnchorEl)}
        anchorEl={resultsAnchorEl}
        onClose={() => setResultsAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List sx={{ width: 300 }}>
          {searchResults
            .slice()
            .sort((a, b) => b.popularity - a.popularity)
            .map((artist) => (
              <MenuItem key={artist.id} onClick={() => handleArtistSelect(artist)}>
                <ListItemText primary={artist.name} secondary={`Popularity: ${artist.popularity}`} />
              </MenuItem>
            ))}
        </List>
      </Popover>
    </Box>
  );
};
