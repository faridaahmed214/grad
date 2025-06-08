"use client";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8 },
  }),
};

const stats = [
  {
    icon: "assets/accurate.png",
    label: "AI Accuracy",
    value: 95.6,
    suffix: "%",
    description: "Powered by deep learning to spot subtle patterns.",
  },
  {
    icon: "assets/sample.png",
    label: "Samples Analyzed",
    value: 122650,
    suffix: "+",
    description: "Massive dataset training for powerful detection.",
  },
  {
    icon: "assets/speed.png",
    label: "Response Speed",
    value: 0.9,
    suffix: "s",
    description: "Lightning-fast results, no waiting around.",
  },
];

const StatsSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      id="stats"
      sx={{
        paddingBottom: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={8}
        sx={{
          color: theme.palette.primary.dark,
          fontSize: { xs: "1.6rem", md: "2.5rem" },
        }}
      >
        Trusted Detection, Real Results
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            style={{
              backgroundColor: theme.palette.background.paper,
              padding: "2rem",
              borderRadius: "1.5rem",
              minWidth: 280,
              maxWidth: 320,
              textAlign: "center",
              flex: 1,
              boxShadow:
                theme.palette.mode === "dark"
                  ? `0 0 30px ${theme.palette.primary.light}40` 
                  : `0 0 30px ${theme.palette.primary.light}40`, 
              transition: "transform 0.3s ease",
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow:
                theme.palette.mode === "dark"
                  ? `0 0 40px ${theme.palette.primary.light}50`
                  : `0 0 40px ${theme.palette.primary.dark}60`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Box
                  component="img"
                  src={stat.icon}
                  alt={stat.label}
                  sx={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{ 
                  color: theme.palette.mode === "dark" 
                    ? theme.palette.primary.light 
                    : theme.palette.primary.dark 
                }}
              >
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                />
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  opacity: 0.8,
                  textAlign: "center",
                  maxWidth: 260,
                }}
              >
                {stat.description}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default StatsSection;