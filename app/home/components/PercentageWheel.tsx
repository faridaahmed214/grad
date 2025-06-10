import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface PercentageWheelProps {
  aiPercentage: number;
  humanPercentage: number;
  resultText: string;
}

const PercentageWheel: React.FC<PercentageWheelProps> = ({ aiPercentage, humanPercentage, resultText }) => {
  const theme = useTheme();
  const wheelSize = 200; // Increased size for better visibility in a column
  const strokeWidth = 20; // Adjusted stroke width
  const radius = (wheelSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Start with full offset (empty circle) and transition to the AI percentage
  const aiOffset = circumference - (aiPercentage / 100) * circumference;

  const aiColor = theme.palette.primary.main;
  const remainingColor = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
      <Box sx={{ position: 'relative', width: wheelSize, height: wheelSize }}>
        <svg width={wheelSize} height={wheelSize} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={wheelSize / 2}
            cy={wheelSize / 2}
            r={radius}
            stroke={remainingColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={wheelSize / 2}
            cy={wheelSize / 2}
            r={radius}
            stroke={aiColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference} // Start with full offset (empty)
            strokeLinecap="round"
            style={{
              strokeDashoffset: aiOffset, // Animate to this value
              transition: 'stroke-dashoffset 1s ease-out', // Animation
            }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ color: aiColor, fontWeight: 'bold' }}> {/* Increased font size */}
            {`${aiPercentage}% AI`}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}> {/* Adjusted variant */}
            {`${humanPercentage}% Human`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ textAlign: 'center', color: theme.palette.text.primary, marginTop: 2 }}> {/* Adjusted variant and margin */}
        {resultText}
      </Typography>
    </Box>
  );
};

export default PercentageWheel;