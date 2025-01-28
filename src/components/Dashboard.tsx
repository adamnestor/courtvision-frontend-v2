import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CircularProgress,
  Pagination,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { useState, useEffect, useCallback } from "react";
import {
  StatsService,
  DashboardStat as ApiDashboardStat,
} from "../services/stats.service";
import { StatsOverview } from "./dashboard/StatsOverview";
import { FilterBar, TimeFrame, Category } from "./dashboard/FilterBar";
import { StatRows } from "./dashboard/StatRows";
import { thresholdOptions } from "../constants/thresholds";
import { Header } from "../components/common/Header";

// Rename our local interface
interface DashboardStatRow {
  id: string;
  playerName: string;
  teamAbbr: string;
  opponent: string;
  statLine: string;
  hitRate: number;
  confidenceScore: number;
}

interface ApiError {
  message: string;
  status?: number;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{ firstName: string } | null>(null);
  const [totalGames, setTotalGames] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Add state for current page and filters
  const [currentPage, setCurrentPage] = useState(0);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("L10");
  const [category, setCategory] = useState<Category>("POINTS");
  const [threshold, setThreshold] = useState<string>(
    thresholdOptions.POINTS[0]
  );
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState<string>("hitRate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [allStats, setAllStats] = useState<DashboardStatRow[]>([]); // Store all stats
  const [displayedStats, setDisplayedStats] = useState<DashboardStatRow[]>([]); // Store paginated stats
  const pageSize = 20;

  const [totalPlayers, setTotalPlayers] = useState(0);

  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await StatsService.getDashboardStats({
        timeFrame,
        category,
        threshold,
        sortBy,
        sortDir,
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid data format received from server");
      }

      const transformedStats = response.data.map((stat: ApiDashboardStat) => ({
        id: stat.playerId.toString(),
        playerName: stat.playerName,
        teamAbbr: stat.team,
        opponent: stat.opponent,
        statLine: StatsService.formatStatLine(stat.category, stat.threshold),
        hitRate: stat.hitRate || 0,
        confidenceScore: stat.confidenceScore || 0,
      }));

      setAllStats(transformedStats);
      setTotalPages(Math.ceil(transformedStats.length / pageSize));
      const start = currentPage * pageSize;
      setDisplayedStats(transformedStats.slice(start, start + pageSize));
      setTotalGames(response.metadata.totalGames);

      // Store metadata for StatsOverview
      const totalPlayers = response.metadata.totalPlayers;
      setTotalPlayers(totalPlayers);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Your session has expired. Please log in again.") {
          // Clear auth data and redirect to login
          AuthService.logout();
          navigate("/login");
          return;
        }
        setError({ message: err.message });
      } else {
        setError({
          message: "An unexpected error occurred. Please try again later.",
          status: 500,
        });
      }

      // Reset data states on error
      setAllStats([]);
      setTotalGames(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [timeFrame, category, threshold, sortBy, sortDir, currentPage, navigate]);

  // Add this effect back
  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Update displayed stats when page changes
  useEffect(() => {
    const start = currentPage * pageSize;
    setDisplayedStats(allStats.slice(start, start + pageSize));
  }, [currentPage, allStats]);

  // Existing user info effect
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

  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    const firstThreshold = thresholdOptions[newCategory][0];
    setThreshold(firstThreshold);
    setCurrentPage(0);
  };

  const handleThresholdChange = (newThreshold: string) => {
    setThreshold(newThreshold);
    setCurrentPage(0);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page - 1); // MUI Pagination is 1-based, our API is 0-based
  };

  const handleSort = (field: "hitRate" | "confidenceScore") => {
    setSortDir((current) => {
      if (sortBy === field) {
        return current === "asc" ? "desc" : "asc";
      }
      return "desc"; // Default to descending when changing sort field
    });
    setSortBy(field);
    setCurrentPage(0); // Reset to first page when sorting changes
  };

  const handleRowClick = (playerId: string) => {
    navigate(`/player/${playerId}`);
  };

  // Error alert component
  const ErrorAlert = ({ error }: { error: ApiError }) => (
    <Alert
      severity="error"
      sx={{ mb: 2 }}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => {
            setError(null);
            fetchDashboardStats();
          }}
        >
          Retry
        </Button>
      }
    >
      {error.status ? `Error ${error.status}: ${error.message}` : error.message}
    </Alert>
  );

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
      <Header userInfo={userInfo} showBackButton={false} />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {error && <ErrorAlert error={error} />}

        <StatsOverview
          totalPlayers={totalPlayers}
          totalGames={totalGames}
          highHitRates={allStats.filter((stat) => stat.hitRate >= 80).length}
          highConfidence={
            allStats.filter((stat) => stat.confidenceScore >= 80).length
          }
          loading={loading}
        />

        <FilterBar
          onTimeFrameChange={handleTimeFrameChange}
          onCategoryChange={handleCategoryChange}
          onThresholdChange={handleThresholdChange}
          loading={loading}
          selectedTimeFrame={timeFrame}
          selectedCategory={category}
          selectedThreshold={threshold}
        />

        {loading ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <StatRows
              stats={displayedStats}
              onSort={handleSort}
              sortBy={sortBy}
              sortDir={sortDir}
              loading={loading}
              onRowClick={handleRowClick}
            />
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 4 }}
            >
              <Pagination
                count={totalPages}
                page={currentPage + 1}
                onChange={handlePageChange}
                color="primary"
                disabled={loading}
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
