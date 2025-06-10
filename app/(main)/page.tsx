"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StatsSection from "@/app/(main)/components/StatsSection";

// Lazy loaded components
const Modal = React.lazy(() => import("@/components/Modal"));
const LoginForm = React.lazy(
  () => import("@/app/auth/login/components/LoginForm")
);
const SignupForm = React.lazy(
  () => import("@/app/auth/signup/components/SignupForm")
);
const ForgetPassword = React.lazy(
  () => import("@/app/auth/login/components/ForgetPassword")
);

import "./styles/landing.css";

import LottieLoading from "@/components/LottieLoading";

const features = [
  {
    icon: "/assets/now.png",
    title: "Instant Detection",
    desc: "Quickly determine whether content is AI-generated with real-time analysis.",
  },
  {
    icon: "/assets/logic.png",
    title: "Advanced Algorithms",
    desc: "Our system leverages deep learning models to enhance detection accuracy.",
  },
  {
    icon: "/assets/lock.png",
    title: "Privacy First",
    desc: "Your input data stays secure and is never stored or shared.",
  },
];

const LandingPage = () => {
  const theme = useTheme();


  // States
  const [input, setInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [glowLogin, setGlowLogin] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--electric-color",
      theme.palette.mode === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.main
    );
    root.style.setProperty("--primary-color", theme.palette.primary.main);
    root.style.setProperty(
      "--primary-light-color",
      theme.palette.primary.light
    );
  }, [theme]);

  // Modal openers
  const openLoginModal = () => {
    setShowLoginAlert(false);
    setGlowLogin(false);
    setModalContent(
      <LoginForm
        key={Date.now()}
        onSignupClick={openSignupModal}
        onForgotPasswordClick={openForgotModal} 
      />
    );
    setOpenModal(true);
  };

  const openSignupModal = () => {
    setModalContent(
      <SignupForm 
        key={Date.now()} 
        onLoginClick={() => {
          setOpenModal(false); 
          setTimeout(() => {
            openLoginModal(); 
          }, 300);
        }} 
      />
    );
    setOpenModal(true);
  };

  const openForgotModal = () => { 
    setModalContent(<ForgetPassword key={Date.now()} />);
    setOpenModal(true);
  };

  const handleAnalyze = () => {
    if (input.trim()) {
      localStorage.setItem('savedAnalysisText', input.trim());
    }
    setShowLoginAlert(true);
    setGlowLogin(true);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box className="container">
        <Box className="left-section text-center">
          <Link href="/" passHref>
            <Image
              src="/assets/logo2.png"
              alt="Veridict Logo"
              width={0}
              height={0}
              sizes="(max-width: 600px) 55vw, 60vw"
              style={{ width: "50%", height: "auto", cursor: "pointer" }}
            />
          </Link>

          <Typography
            variant="h2"
            className="electric-text"
            sx={{
              fontFamily: "PressStart2P",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            }}
          >
            VERIDICT
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              letterSpacing: 1,
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
            }}
          >
            Bot or Not? Can You Tell the Difference?
          </Typography>
        </Box>

        <Box className="right-section">
          <Typography
            variant="h1"
            sx={{ fontSize: "clamp(1.1rem, 4vw, 2.5rem)", fontWeight: "bold" }}
          >
            Instantly Detect AI-Generated Text
          </Typography>

          <Typography
            variant="h2"
            sx={{ fontSize: "clamp(0.9rem, 3vw, 1.5rem)", mb: 2 }}
          >
            Ensure authenticity and identify AI content with our advanced
            detector.
          </Typography>

          {/* Input & Analyze */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              width: "100%",
              mb: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              placeholder="Paste a sentence here..."
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="electric-input"
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAnalyze}
            >
              Analyze
            </Button>
          </Stack>

          {/* Login Alert */}
          {showLoginAlert && (
            <Typography
              sx={{
                color: "error.main",
                textAlign: "center",
                fontWeight: "bold",
                mb: 2,
                fontSize: "1rem",
                animation: "shake 0.4s ease-in-out",
              }}
            >
              🚫 Hold up! You need to{" "}
              <span style={{ textDecoration: "underline" }}>log in</span> before
              decoding the AI truth.
            </Typography>
          )}

          {/* Auth Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 10 }}
            sx={{ width: "100%", my: 4, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => openSignupModal()}
              sx={{
                fontSize: { sm: "1rem", md: "1.5rem" },
                px: { sm: 1, md: 3 },
                py: 1.5,
                width: { xs: "100%", sm: "60%" },
              }}
            >
              Sign Up for Free
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => openLoginModal()}
              sx={{
                fontSize: { sm: "0.9rem", md: "1.3rem" },
                px: { sm: 1, md: 3 },
                py: 1.5,
                width: { xs: "100%", sm: "40%" },
                color: theme.palette.primary.light,
                boxShadow: glowLogin
                  ? `0 0 12px 3px ${theme.palette.primary.main}`
                  : "none",
                animation: glowLogin ? "pulseGlow 2s infinite" : "none",
                transition: "box-shadow 0.3s ease-in-out",
              }}
            >
              Log In
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Stats and Features */}
      <StatsSection />
      <Box className="features-section">
        <Box className="features-list">
          {features.map((feature, idx) => (
            <Box className="feature-card" key={idx}>
              <Box className="feature-card-header">
                <Image
                  src={feature.icon}
                  alt={`${feature.title} Icon`}
                  width={40}
                  height={40}
                />
                <Typography variant="h6" className="feature-title">
                  {feature.title}
                </Typography>
              </Box>
              <Typography className="feature-desc">{feature.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Veridict. All rights reserved.
      </footer>

      {/* Lazy Modal */}
      <Suspense fallback={<LottieLoading minDuration={2000} />}>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          formComponent={modalContent}
        />
      </Suspense>
    </Box>
  );
};

export default LandingPage;
