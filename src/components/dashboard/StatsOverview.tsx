import { Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
import {
  Assessment,
  SportsBasketball,
  TrendingUp,
  Psychology,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Theme, SxProps } from "@mui/material/styles";

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

const IconWrapper = styled(Box)(({ theme, color }: { theme: Theme; color: string }) => ({
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
    color: color === "#EDE7F6" 
      ? "#5E35B1"
      : color === "#A0D2FA"
      ? "#1D87E4"
      : theme.palette.common.white,
  },
}));

const TextContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

interface StatsCardProps {
  title: string;
  value: number | React.ReactNode;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon, color }: StatsCardProps & { color: string }) => (
  <StyledPaper elevation={0}>
    <IconWrapper color={color}>{icon}</IconWrapper>
    <TextContent>
      <Typography 
        variant="h2"
        component="div" 
        sx={{ 
          mb: 0.5,
          fontWeight: 700,
          color: "text.primary",
          fontSize: "2.5rem",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Typography 
        color="text.primary"
        variant="subtitle1"
        sx={{
          fontSize: "0.95rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </Typography>
    </TextContent>
  </StyledPaper>
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
  sx,
}: StatsOverviewProps & { sx?: SxProps }) {
  return (
    <Grid container spacing={3} sx={sx}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Hit Rates Above 80%"
          value={loading ? <CircularProgress size={24} /> : highHitRates}
          icon={<TrendingUp />}
          color="#5E35B1"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="High Confidence Scores"
          value={loading ? <CircularProgress size={24} /> : highConfidence}
          icon={<Psychology />}
          color="#1D87E4"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Total Players"
          value={loading ? <CircularProgress size={24} /> : totalPlayers}
          icon={<Assessment />}
          color="#EDE7F6"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Total Number of Games"
          value={loading ? <CircularProgress size={24} /> : totalGames}
          icon={<SportsBasketball />}
          color="#A0D2FA"
        />
      </Grid>
    </Grid>
  );
}
