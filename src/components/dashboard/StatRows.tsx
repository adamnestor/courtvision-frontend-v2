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
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiTable-root": {
    borderCollapse: "separate",
    borderSpacing: "0",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: "1.12rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
  "&.header-cell": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& .sort-icon": {
      verticalAlign: "middle",
      marginLeft: theme.spacing(0.5),
      opacity: 0.8,
      color: theme.palette.common.white,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
    "& .MuiTableCell-root": {
      color: theme.palette.text.primary,
    },
  },
  "&:last-child td": {
    borderBottom: 0,
  },
}));

interface StatRow {
  id: string;
  playerName: string;
  teamAbbr: string;
  opponent: string;
  statLine: string;
  hitRate: number;
  confidenceScore: number;
}

interface StatRowsProps {
  stats: StatRow[];
  onSort: (field: "hitRate" | "confidenceScore") => void;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  loading?: boolean;
  onRowClick?: (playerId: string) => void;
}

export function StatRows({
  stats,
  onSort,
  sortBy,
  sortDir,
  loading,
  onRowClick,
}: StatRowsProps) {
  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortDir === "asc" ? (
      <ArrowUpward className="sort-icon" fontSize="small" />
    ) : (
      <ArrowDownward className="sort-icon" fontSize="small" />
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "success.main";
    if (score >= 60) return "warning.main";
    return "error.main";
  };

  return (
    <StyledTableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell className="header-cell">Player</StyledTableCell>
            <StyledTableCell className="header-cell">Team</StyledTableCell>
            <StyledTableCell className="header-cell">Opponent</StyledTableCell>
            <StyledTableCell className="header-cell">Stat Line</StyledTableCell>
            <StyledTableCell 
              className="header-cell" 
              onClick={() => !loading && onSort("hitRate")}
              align="right"
            >
              Hit Rate {getSortIcon("hitRate")}
            </StyledTableCell>
            <StyledTableCell 
              className="header-cell" 
              onClick={() => !loading && onSort("confidenceScore")}
              align="right"
            >
              Confidence {getSortIcon("confidenceScore")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((row) => (
            <StyledTableRow 
              key={row.id} 
              onClick={() => onRowClick?.(row.id)}
            >
              <StyledTableCell>
                <Typography 
                  variant="body1" 
                  fontWeight={500}
                  fontSize="1.12rem"
                >
                  {row.playerName}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>{row.teamAbbr}</StyledTableCell>
              <StyledTableCell>{row.opponent}</StyledTableCell>
              <StyledTableCell>{row.statLine}</StyledTableCell>
              <StyledTableCell align="right">
                <Typography 
                  variant="body2" 
                  fontWeight={500}
                  fontSize="1.12rem"
                  color={getScoreColor(row.hitRate)}
                >
                  {row.hitRate}%
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography 
                  variant="body2" 
                  fontWeight={600}
                  fontSize="1.12rem"
                  color={getScoreColor(row.confidenceScore)}
                >
                  {row.confidenceScore}%
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
