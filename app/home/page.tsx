"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import Navbar from "./components/Navbar";
import styles from "./styles/HomePage.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LottieLoading from "@/components/LottieLoading";
import PercentageWheel from "./components/PercentageWheel";
import { predictText } from "@/lib/bertApi";

const HomePage = () => {
  const [text, setText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<{
    aiPercentage: number;
    humanPercentage: number;
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const savedText = localStorage.getItem("savedAnalysisText");
    if (savedText) {
      setText(savedText);
      localStorage.removeItem("savedAnalysisText");
    }
  }, []);

  const handleCheckText = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setAnalysisResult(null);
    setError(null);
    
    try {
      const result = await predictText(text.trim());
      
      if (result instanceof Error) {
        setError(result.message);
        setLoading(false);
        return;
      }
      
      const confidencePercentage = Math.round(result.confidence * 100);
      
      let aiPercentage: number;
      let humanPercentage: number;
      let resultText: string;
      
      if (result.prediction.toLowerCase().includes('ai') || result.prediction.toLowerCase().includes('generated')) {
        aiPercentage = confidencePercentage;
        humanPercentage = 100 - confidencePercentage;
        resultText = `This text is ${confidencePercentage}% likely to be AI-generated.`;
      } else {
        humanPercentage = confidencePercentage;
        aiPercentage = 100 - confidencePercentage;
        resultText = `This text is ${confidencePercentage}% likely to be Human-written.`;
      }
      
      setAnalysisResult({
        aiPercentage,
        humanPercentage,
        text: resultText,
      });
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.homepageContainer}>
      <Navbar showThemeToggle />
      <Box className={styles.contentFlex}>
        {/* Left Column: Input Area */}
        <Box className={styles.inputColumn}>
          <Typography className={styles.heading} variant="h4" component="h1">
            AI or Human? Let's Find Out.
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
            <TextField
              label="Enter Text to Analyze"
              multiline
              rows={8}
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.textField}
              fullWidth
              error={!!error}
              helperText={error}
            />
            <Button
              variant="contained"
              onClick={handleCheckText}
              disabled={loading || !text.trim()}
              sx={{
                padding: "10px 20px",
                fontSize: "1.1rem",
                borderRadius: "8px",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: `0 0 15px ${theme.palette.primary.main}`,
                },
                "&:active": {
                  boxShadow: `0 0 20px ${theme.palette.primary.light}`,
                },
                mt: 4,
                width: '100%',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Check Text"}
            </Button>
          </Box>
        </Box>

        {/* Right Column: Results Area */}
        <Box className={styles.resultsColumn}>
          {loading && (
            <Box className={styles.centeredLoader}>
              <CircularProgress size={60} />
              <Typography sx={{ marginTop: 2 }}>Analyzing...</Typography>
            </Box>
          )}
          {!loading && analysisResult && (
            <Box className={styles.resultBox}>
              <PercentageWheel
                aiPercentage={analysisResult.aiPercentage}
                humanPercentage={analysisResult.humanPercentage}
                resultText={analysisResult.text}
              />
            </Box>
          )}
          {!loading && !analysisResult && !error && (
            <Box className={styles.placeholderBox}>
              <Typography variant="h6" color="textSecondary">
                Your analysis results will appear here.
              </Typography>
            </Box>
          )}
          {!loading && error && (
            <Box className={styles.placeholderBox}>
              <Typography variant="h6" color="error">
                {error}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Please check your connection and try again.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
