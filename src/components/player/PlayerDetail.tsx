import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { StatsService } from "../../services/stats.service";
import { FilterBar, TimeFrame, Category } from "../dashboard/FilterBar";
import { thresholdOptions } from "../../constants/thresholds";
import { PlayerDetailData } from "../../services/stats.service";
import { Header } from "../common/Header";
import {
  Assessment,
  Groups,
  Psychology,
  SportsBasketball,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const IconWrapper = styled(Box)(
  ({ theme, color }: { theme: Theme; color: string }) => ({
    width: 56,
    height: 56,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color,
    flexShrink: 0,
    "& svg": {
      fontSize: 28,
      color:
        color === "#EDE7F6"
          ? "#5E35B1"
          : color === "#A0D2FA"
          ? "#1D87E4"
          : theme.palette.common.white,
    },
  })
);

const TextContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export function PlayerDetail() {
  const { playerId } = useParams<{ playerId: string }>();
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState<PlayerDetailData | null>(null);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("L10");
  const [category, setCategory] = useState<Category>("POINTS");
  const [threshold, setThreshold] = useState<string>(
    thresholdOptions.POINTS[0]
  );
  const [userInfo, setUserInfo] = useState<{ firstName: string } | null>(null);

  // Load user info
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

  // Handle filter changes
  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setThreshold(thresholdOptions[newCategory][0]);
  };

  const handleThresholdChange = (newThreshold: string) => {
    setThreshold(newThreshold);
  };

  useEffect(() => {
    const fetchPlayerStats = async () => {
      setLoading(true);
      try {
        const response = await StatsService.getPlayerStats(Number(playerId), {
          timePeriod: timeFrame,
          category,
          threshold,
        });
        setPlayerData(response.data);
      } catch (error) {
        console.error("Error fetching player stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [playerId, timeFrame, category, threshold]);

  if (loading || !playerData) {
    return (
      <>
        <Header userInfo={userInfo} showBackButton={true} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  const thresholdValue = Number(threshold.replace("+", ""));

  const getBarWidth = (timeFrame: TimeFrame) => {
    switch (timeFrame) {
      case "L5":
        return 80; // Wider
      case "L10":
        return 60; // Wider
      case "L15":
        return 45; // Wider
      case "L20":
        return 35; // Wider
      case "SEASON":
        return 25; // Wider
      default:
        return 60;
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header userInfo={userInfo} showBackButton={true} />
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          overflow: "hidden",
        }}
      >
        <Grid container spacing={3} sx={{ flexShrink: 0 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper elevation={0}>
              <TextContent sx={{ width: "100%" }}>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    mb: 1,
                    fontWeight: 700,
                    fontSize: "2.5rem",
                    lineHeight: 1,
                  }}
                >
                  {playerData.playerName}
                </Typography>
                <Typography
                  color="text.primary"
                  variant="h3"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {playerData.team}
                </Typography>
              </TextContent>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper elevation={0}>
              <IconWrapper color="#1D87E4">
                <SportsBasketball />
              </IconWrapper>
              <TextContent>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    mb: 0.5,
                    fontWeight: 700,
                    fontSize: "2.5rem",
                    lineHeight: 1,
                  }}
                >
                  {playerData.average.toFixed(1)}
                </Typography>
                <Typography
                  color="text.primary"
                  variant="subtitle1"
                  sx={{
                    fontSize: "1.12rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  Average
                </Typography>
              </TextContent>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper elevation={0}>
              <IconWrapper color="#EDE7F6">
                <Assessment />
              </IconWrapper>
              <TextContent>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    mb: 0.5,
                    fontWeight: 700,
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color:
                      playerData.hitRate >= 80
                        ? "success.main"
                        : "text.primary",
                  }}
                >
                  {playerData.hitRate}%
                </Typography>
                <Typography
                  color="text.primary"
                  variant="subtitle1"
                  sx={{
                    fontSize: "1.12rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  Hit Rate
                </Typography>
              </TextContent>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper elevation={0}>
              <IconWrapper color="#A0D2FA">
                <Psychology />
              </IconWrapper>
              <TextContent>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    mb: 0.5,
                    fontWeight: 700,
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color:
                      playerData.confidenceScore >= 80
                        ? "success.main"
                        : "text.primary",
                  }}
                >
                  {playerData.confidenceScore}%
                </Typography>
                <Typography
                  color="text.primary"
                  variant="subtitle1"
                  sx={{
                    fontSize: "1.12rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  Confidence
                </Typography>
              </TextContent>
            </StyledPaper>
          </Grid>
        </Grid>

        <FilterBar
          onTimeFrameChange={handleTimeFrameChange}
          onCategoryChange={handleCategoryChange}
          onThresholdChange={handleThresholdChange}
          loading={loading}
          selectedTimeFrame={timeFrame}
          selectedCategory={category}
          selectedThreshold={threshold}
        />

        <Paper
          sx={{
            p: 2,
            pt: 1,
            pb: 0,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Recent Games History
          </Typography>
          <Box sx={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={playerData.recentGames}
                margin={{
                  top: 10,
                  right: 50,
                  left: 20,
                  bottom: 50,
                }}
                barCategoryGap="2%"
                barGap={0}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="gameDate"
                  height={70}
                  tick={({ x, y, payload, index }) => {
                    const game = playerData.recentGames[index];
                    const formattedDate = new Date(
                      payload.value
                    ).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    });
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text
                          x={0}
                          y={16}
                          dy={0}
                          textAnchor="middle"
                          fill="#000"
                        >
                          <tspan x={0} dy="0">
                            {game.opponent}
                          </tspan>
                          <tspan x={0} dy="20">
                            {formattedDate}
                          </tspan>
                        </text>
                      </g>
                    );
                  }}
                  interval={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#666" }} // Simple tick style
                />
                <Tooltip
                  formatter={(value: number) => [
                    `${value} ${category}`,
                    "Value",
                  ]}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
                <ReferenceLine
                  y={thresholdValue}
                  stroke="#1D87E4"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
                <Bar
                  dataKey="statValue"
                  radius={[4, 4, 0, 0]}
                  fill="#5E35B1"
                  isAnimationActive={false}
                  barSize={getBarWidth(timeFrame)}
                  maxBarSize={50}
                >
                  {playerData.recentGames.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.statValue >= thresholdValue
                          ? "#5E35B1"
                          : "#9E9E9E"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
