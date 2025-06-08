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