'use client';

import React, { useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline, Box } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "@/theme";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import LottieLoading from "@/components/LottieLoading";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeContext();
  const [loading, setLoading] = useState(true); 
  const theme = mode === "light" ? lightTheme : darkTheme;
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    // Set minimum loading time of 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [mode]);

  // If the theme is still loading, show Lottie animation
  if (loading) {
    return <LottieLoading />;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {isLandingPage && (
          <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
            <ThemeToggleButton />
          </Box>
        )}
        {children}
      </Box>
    </MuiThemeProvider>
  );
}
