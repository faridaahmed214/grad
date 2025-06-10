import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ThemeToggleButton from "../../../components/ThemeToggleButton";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  showThemeToggle?: boolean;
}

const Navbar = ({ showThemeToggle = false }: NavbarProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      const itemsToKeep = ['theme-mode']; 
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !itemsToKeep.includes(key)) {
        }
      }
      await signOut({ 
        redirect: true,
        callbackUrl: "/"
      });
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Logo and Text */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={"/assets/logo2.png"}
            alt="Logo"
            style={{
              width: "40px",
              height: "auto",
              cursor: "pointer",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "PressStart2P",
              fontSize: { xs: "0.90rem", sm: "1.25rem", md: "1.5rem" },
              marginLeft: 1,
              display: { xs: "none", sm: "inline" },
              color: theme.palette.text.primary,
            }}
          >
            VERIDICT
          </Typography>
        </Box>

        {/* Welcome Message */}
        <Typography
          sx={{
            fontFamily: "PressStart2P",
            fontSize: { xs: "0.90rem", sm: "1.5rem", md: "2rem" },
            color: theme.palette.primary.main,
            textShadow: `0 0 3px ${theme.palette.primary.light}`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Welcome, {session?.user?.name || "User"}
        </Typography>

        {/* Icons and Theme Toggle */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}
        >
          <IconButton sx={{ color: theme.palette.text.primary }}>
          </IconButton>
          <IconButton
            onClick={handleLogout}
            sx={{ color: theme.palette.text.primary }}
          >
            <ExitToApp />
          </IconButton>
          {showThemeToggle && <ThemeToggleButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
