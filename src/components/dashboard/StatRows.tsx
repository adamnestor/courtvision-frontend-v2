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
  "&.sortable": {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "&.header-cell": {
    textAlign: "right",
    paddingRight: theme.spacing(3),
    minWidth: "180px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "& .sort-icon": {
      marginLeft: theme.spacing(1),
      verticalAlign: "middle",
      display: "inline-block",
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "&.value-cell": {
    textAlign: "right",
    paddingRight: theme.spacing(3),
    minWidth: "180px",
  },
  "&.player-cell": {
    minWidth: "200px",
  },
  "&.team-cell": {
    minWidth: "80px",
  },
  "&.opponent-cell": {
    minWidth: "100px",
  },
  "&.stat-cell": {
    minWidth: "180px",
    textAlign: "center",
  },
}));

interface StatRowsProps {
  stats: StatRow[];
  onSort: (field: "hitRate" | "confidenceScore") => void;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  loading?: boolean;
}

export function StatRows({
  stats,
  onSort,
  sortBy,
  sortDir,
  loading,
}: StatRowsProps) {
  const renderSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortDir === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );
  };

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
            <StyledTableCell className="player-cell">Player</StyledTableCell>
            <StyledTableCell className="team-cell">Team</StyledTableCell>
            <StyledTableCell className="opponent-cell">
              Opponent
            </StyledTableCell>
            <StyledTableCell className="stat-cell">Stat Line</StyledTableCell>
            <StyledTableCell
              className="header-cell"
              onClick={() => !loading && onSort("hitRate")}
            >
              Hit Rate{" "}
              <span className="sort-icon">{renderSortIcon("hitRate")}</span>
            </StyledTableCell>
            <StyledTableCell
              className="header-cell"
              onClick={() => !loading && onSort("confidenceScore")}
            >
              Confidence{" "}
              <span className="sort-icon">
                {renderSortIcon("confidenceScore")}
              </span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell className="player-cell">
                <Typography variant="body1" fontWeight="medium">
                  {row.playerName}
                </Typography>
              </StyledTableCell>
              <StyledTableCell className="team-cell">
                {row.teamAbbr}
              </StyledTableCell>
              <StyledTableCell className="opponent-cell">
                {row.opponent}
              </StyledTableCell>
              <StyledTableCell className="stat-cell">
                {row.statLine}
              </StyledTableCell>
              <StyledTableCell className="value-cell">
                <Typography
                  variant="body2"
                  color={row.hitRate >= 80 ? "success.main" : "text.primary"}
                  fontWeight="medium"
                >
                  {row.hitRate}%
                </Typography>
              </StyledTableCell>
              <StyledTableCell className="value-cell">
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
