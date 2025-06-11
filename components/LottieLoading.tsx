import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Lottie from "react-lottie-player";
import loadingAnimation from "../public/assets/loading.json";



const LottieLoading = () => {
  const theme = useTheme();
  const [showLoading, setShowLoading] = useState(true);



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