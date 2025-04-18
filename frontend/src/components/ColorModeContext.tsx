import React from "react";

interface ColorModeContextProps {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  toggleColorMode: () => void;
}

export const ColorModeContext = React.createContext<ColorModeContextProps>({
  mode: "light",
  setMode: () => {},
  toggleColorMode: () => {},
});