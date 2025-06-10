"use client";
import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Lottie from "react-lottie-player";
import loadingAnimation from "../public/assets/loading.json";

interface LottieLoadingProps {
  minDuration?: number; // Minimum duration in milliseconds
}

const LottieLoading: React.FC<LottieLoadingProps> = ({ minDuration = 2000 }) => {
  const theme = useTheme();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!showLoading) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        zIndex: 9999,
      }}
    >
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{
          width: 200,
          height: 200,
        }}
      />
    </Box>
  );
};

export default LottieLoading;