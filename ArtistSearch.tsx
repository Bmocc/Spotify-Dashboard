import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
} from "@mui/material";
import React, { useCallback, useRef, useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from '@mui/material/ListItemIcon';
import { ColorModeContext } from "./ColorModeContext"; 
import Check from '@mui/icons-material/Check';
import axios from 'axios';
import { Artist } from './ArtistProfileCard';


interface ArtistSearchProps {
  onSearchResults: (results: Artist[]) => void;
}

export const ArtistSearch: React.FC<ArtistSearchProps> = ({ onSearchResults }) => {
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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholder, setPlaceholder] = useState<string>("Search for Artist");
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
      if (textAreaRef.current) {
          const query = textAreaRef.current?.value;
          if (query.length > 0) {
              setDisabled(true);
              setPlaceholder("Loading...");
              axios.get<Artist[]>(`http://127.0.0.1:8000/api/search_artist/?name=${encodeURIComponent(query)}`)
              .then(response => {
                onSearchResults(response.data);
              })
              .catch(error => {
                console.error("Error fetching artist data:", error);
              })
              .finally(() => {
                setDisabled(false);
                setPlaceholder("Search for an artist...");
              });
          }
        }
      }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "60px",
      }}
    >
      <Paper
          elevation={5}
        sx={{
          position: "relative",
          justifyContent: "center",
          // width: "100%",
          height: 60,
          borderRadius: 5,
          ml: 4,
          mr: 4,
          mt: 1,
        }}
      >
      <Paper
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: 600,
          height: 40,
          borderRadius: 5,
          border: 1,
          borderColor: "primary.main",
          left: 920,
          top: 10,
          backgroundColor: "white"

        }}
      >
        <TextField
          inputRef={textAreaRef}
          minRows={1}
          placeholder={placeholder}
          disabled={disabled}
          // onChange={handleTextChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
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
            height: (theme) => theme.spacing(5),
            position: "absolute",
            top: 8,
            right: 10,
            zIndex: 9999,
            padding: "5px 10px",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            marginRight: 1,
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
            sx={{
              width: 50,
            }}
          >
            <Typography variant="subtitle2" 
            >
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
              paper: {
                sx: {
                  p: 1,
                  borderRadius: 4,
                },
              },
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
    </Box>
  );
};