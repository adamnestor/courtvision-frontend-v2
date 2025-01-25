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
import { StatsOverview } from "./dashboard/StatsOverview";
import { FilterBar, TimeFrame, Category } from "./dashboard/FilterBar";
import { StatRows } from "./dashboard/StatRows";

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

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    console.log("Time Frame changed:", timeFrame);
    // Will handle API call/filtering later
  };

  const handleCategoryChange = (category: Category) => {
    console.log("Category changed:", category);
    // Will handle API call/filtering later
  };

  const handleThresholdChange = (threshold: string) => {
    console.log("Threshold changed:", threshold);
    // Will handle API call/filtering later
  };

  const sampleStats = [
    {
      id: "1",
      playerName: "LeBron James",
      teamAbbr: "LAL",
      opponent: "@DEN",
      statLine: "Points 25+",
      hitRate: 85,
      confidenceScore: 92,
    },
    {
      id: "2",
      playerName: "Stephen Curry",
      teamAbbr: "GSW",
      opponent: "PHX",
      statLine: "Points 20+",
      hitRate: 78,
      confidenceScore: 82,
    },
    // Add more sample data as needed
  ];

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
        <StatsOverview
          totalStats={245} // These will be replaced with real data
          totalGames={82} // This one will be fixed
          highHitRates={45}
          highConfidence={67}
        />

        <FilterBar
          onTimeFrameChange={handleTimeFrameChange}
          onCategoryChange={handleCategoryChange}
          onThresholdChange={handleThresholdChange}
        />

        <StatRows stats={sampleStats} />

        {/* Player stat rows will go here */}
      </Container>
    </Box>
  );
}
