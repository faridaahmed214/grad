import { Theme } from "@mui/material";

export const styles = (theme: Theme) => ({
  blurOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
    zIndex: 1,
    transition: "opacity 0.3s ease-in-out",
  },
  dialogContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  modalBox: {
    padding: theme.spacing(3),
    background: theme.palette.background.paper,
    boxShadow: `0 0 15px ${theme.palette.primary.main}`,
    position: "relative",
    zIndex: 3,
    animation: "glowing 1.5s ease-in-out infinite alternate",
  },
  title: {
    color: theme.palette.text.primary,
    fontFamily: "PressStart2P",
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: theme.spacing(2),
    textShadow: `0 0 5px ${theme.palette.primary.main}, 0 0 10px ${theme.palette.primary.main}`,
  },
  actions: {
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  cancelButton: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    borderWidth: "2px",
    borderStyle: "solid",
    fontSize: "1rem",
    padding: theme.spacing(1.25, 3),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
      boxShadow: `0 0 15px ${theme.palette.primary.main}`,
    },
  },
  "@keyframes glowing": {
    "0%": {
      boxShadow: `0 0 15px ${theme.palette.primary.main}, 0 0 25px ${theme.palette.primary.main}`,
    },
    "100%": {
      boxShadow: `0 0 30px ${theme.palette.primary.main}, 0 0 50px ${theme.palette.primary.main}`,
    },
  },
});
