import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  Assessment,
  SportsBasketball,
  TrendingUp,
  Psychology,
} from "@mui/icons-material";

interface StatsCardProps {
  title: string;
  value: number;
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
  totalStats: number;
  totalGames: number;
  highHitRates: number;
  highConfidence: number;
}

export function StatsOverview({
  totalStats,
  totalGames,
  highHitRates,
  highConfidence,
}: StatsOverviewProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Total Number of Stats"
          value={totalStats}
          icon={<Assessment color="primary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Total Number of Games"
          value={totalGames}
          icon={<SportsBasketball color="primary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Hit Rates Above 80%"
          value={highHitRates}
          icon={<TrendingUp color="primary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="High Confidence Scores"
          value={highConfidence}
          icon={<Psychology color="primary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </Grid>
  );
}
