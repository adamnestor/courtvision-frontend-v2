import { Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
import {
  Assessment,
  SportsBasketball,
  TrendingUp,
  Psychology,
} from "@mui/icons-material";

interface StatsCardProps {
  title: string;
  value: number | React.ReactNode;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 2,
      bgcolor: "background.paper",
      border: "1px solid",
      borderColor: "divider",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>{icon}</Box>
    <Typography variant="h4" component="div" sx={{ mb: 1 }}>
      {value}
    </Typography>
    <Typography color="text.secondary" variant="body2">
      {title}
    </Typography>
  </Paper>
);

interface StatsOverviewProps {
  totalPlayers: number;
  totalGames: number;
  highHitRates: number;
  highConfidence: number;
  loading?: boolean;
}

export function StatsOverview({
  totalPlayers,
  totalGames,
  highHitRates,
  highConfidence,
  loading = false,
}: StatsOverviewProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Total Players"
          value={loading ? <CircularProgress size={24} /> : totalPlayers}
          icon={<Assessment color="primary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Total Number of Games"
          value={loading ? <CircularProgress size={24} /> : totalGames}
          icon={<SportsBasketball color="primary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Hit Rates Above 80%"
          value={loading ? <CircularProgress size={24} /> : highHitRates}
          icon={<TrendingUp color="primary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="High Confidence Scores"
          value={loading ? <CircularProgress size={24} /> : highConfidence}
          icon={<Psychology color="primary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </Grid>
  );
}
