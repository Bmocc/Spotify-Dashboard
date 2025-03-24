import React, { useCallback, useRef, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Box, TextField } from '@mui/material';
import Drawer from '@mui/material/Drawer';
// import { Menu, MenuItem} from '@mui/material';
import { Toolbar as MuiToolbar } from '@mui/material';

const drawerWidth = 240;

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarLayoutProps> = ({ children }) => {
        const textAreaRef = useRef<HTMLTextAreaElement>(null);
        const [placeholder, setPlaceholder] = useState<string>("Search for Artist");
        const [disabled, setDisabled] = useState<boolean>(false);
    
        const handleSubmit = useCallback(() => {
            if (textAreaRef.current) {
                const query = textAreaRef.current.value;
                if (query.length > 0) {
                    setDisabled(true);
                    setPlaceholder("Loading...");
                    // axios.post('http://
                }
            }
        }
        , []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="relative" 
        sx={{ width: "100%", left: 220, height: 100  }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" >
            Spotify Artist Dashboard
          </Typography>
                  <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: 600,
                        height: 40,
                        borderRadius: 5,
                        border: 1,
                        left: 420,
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
                    </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <MuiToolbar />
        <Box sx={{ overflow: 'auto' }}>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};