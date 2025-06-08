"use client";

import React from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={handleToggle}
        sx={{
          color: theme.palette.text.primary, 

        }}
      >
        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
