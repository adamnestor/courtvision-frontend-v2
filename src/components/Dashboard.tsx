import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { useState, useEffect } from "react";

interface UserInfo {
  firstName: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const userInfoStr = localStorage.getItem("userInfo");
    if (userInfoStr) {
      try {
        const userData = JSON.parse(userInfoStr);
        setUserInfo({ firstName: userData.firstName });
      } catch {
        console.error("Error parsing user info");
      }
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100vw", // Full viewport width
        margin: 0,
        padding: 0,
        position: "absolute",
        left: 0,
        top: 0,
      }}
    >
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          width: "100%",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo space */}
          <Box
            sx={{
              width: 150,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/placeholder-logo.png"
              alt="CourtVision"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Box>

          {/* Welcome message and logout */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" color="primary">
              Welcome, {userInfo?.firstName || "User"}!
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Stats overview cards will go here */}

        {/* Player stat rows will go here */}
      </Container>
    </Box>
  );
}
