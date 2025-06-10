// components/styles/signupFormStyles.ts

import { Theme } from "@mui/material";

export const getInputStyle = (theme: Theme) => ({
  mb: 2,
  borderRadius: "8px",
  background: theme.palette.background.default,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 10px ${theme.palette.primary.main}`,
    },
  },
});

export const submitButtonStyle = (theme: Theme) => ({
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
});

export const titleStyle = (theme: Theme) => ({
  fontFamily: "PressStart2P, sans-serif",
  color: theme.palette.primary.main,
  textShadow: `0 0 0 ${theme.palette.primary.light}, 0 0 20px ${theme.palette.primary.light}`,
});
