import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface StatRow {
  id: string;
  playerName: string;
  teamAbbr: string;
  opponent: string;
  statLine: string;
  hitRate: number;
  confidenceScore: number;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    cursor: "pointer",
    transform: "translateY(-1px)",
    transition: "all 0.2s ease-in-out",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:first-of-type": {
    paddingLeft: theme.spacing(3),
  },
  "&:last-of-type": {
    paddingRight: theme.spacing(3),
  },
}));

interface StatRowsProps {
  stats: StatRow[];
}

export function StatRows({ stats }: StatRowsProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Player</StyledTableCell>
            <StyledTableCell>Team</StyledTableCell>
            <StyledTableCell>Opponent</StyledTableCell>
            <StyledTableCell>Stat Line</StyledTableCell>
            <StyledTableCell align="right">Hit Rate</StyledTableCell>
            <StyledTableCell align="right">Confidence</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>
                <Typography variant="body1" fontWeight="medium">
                  {row.playerName}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>{row.teamAbbr}</StyledTableCell>
              <StyledTableCell>{row.opponent}</StyledTableCell>
              <StyledTableCell>{row.statLine}</StyledTableCell>
              <StyledTableCell align="right">
                <Typography
                  variant="body2"
                  color={row.hitRate >= 80 ? "success.main" : "text.primary"}
                  fontWeight="medium"
                >
                  {row.hitRate}%
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography
                  variant="body2"
                  color={
                    row.confidenceScore >= 80 ? "success.main" : "text.primary"
                  }
                  fontWeight="medium"
                >
                  {row.confidenceScore}%
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
