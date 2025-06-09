"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Navbar from "./components/Navbar";
import styles from "./styles/HomePage.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const savedText = localStorage.getItem('savedAnalysisText');
    if (savedText) {
      setText(savedText);
      localStorage.removeItem('savedAnalysisText'); // Clear the saved text after retrieving
    }
  }, []);

  const handleCheckText = () => {
    setLoading(true);
    setTimeout(() => {
      const isAI = Math.random() < 0.5;
      setResult(
        isAI
          ? "This seems like AI-generated text."
          : "This seems like Human-written text."
      );
      setLoading(false);
    }, 2000);
  };

  // Show loading or redirect if not authenticated
  if (status === "loading" || status === "unauthenticated") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.homepageContainer}>
      <Navbar showThemeToggle />

      <Box className={styles.contentBox}>
        <Typography className={styles.heading} variant="h3">
          Check if the Text is AI or Human
        </Typography>

        <TextField
          label="Enter Text"
          multiline
          rows={4}
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.textField}
        />

        <Button
          variant="contained"
          onClick={handleCheckText}
          className={styles.button}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Check"}
        </Button>

        {result && (
          <Box className={styles.resultBox}>
            <Typography className={styles.resultText} variant="h5">
              {result}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
