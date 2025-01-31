import { Box, ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { thresholdOptions } from "../../constants/thresholds";

const FilterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const FilterGroupsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  "& .MuiToggleButton-root": {
    border: "none",
    borderRadius: theme.shape.borderRadius,
    margin: "0 2px",
    padding: "6px 16px",
    color: theme.palette.text.primary,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1.12rem",
    backgroundColor: "transparent",
    
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

export type TimeFrame = "L5" | "L10" | "L15" | "L20" | "SEASON";
export type Category = "POINTS" | "ASSISTS" | "REBOUNDS";

interface FilterBarProps {
  onTimeFrameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onThresholdChange: (value: string) => void;
  loading?: boolean;
  selectedTimeFrame: string;
  selectedCategory: string;
  selectedThreshold: string;
}

export function FilterBar({
  onTimeFrameChange,
  onCategoryChange,
  onThresholdChange,
  loading = false,
  selectedTimeFrame,
  selectedCategory,
  selectedThreshold,
}: FilterBarProps) {
  const handleTimeFrameChange = (_: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      onTimeFrameChange(value);
    }
  };

  const handleCategoryChange = (_: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      onCategoryChange(value);
    }
  };

  const handleThresholdChange = (_: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      onThresholdChange(value);
    }
  };

  return (
    <FilterContainer elevation={0}>
      <FilterGroupsWrapper>
        <StyledToggleButtonGroup
          value={selectedTimeFrame}
          exclusive
          onChange={handleTimeFrameChange}
          aria-label="time frame"
          disabled={loading}
        >
          <ToggleButton value="L5">Last 5</ToggleButton>
          <ToggleButton value="L10">Last 10</ToggleButton>
          <ToggleButton value="L15">Last 15</ToggleButton>
          <ToggleButton value="L20">Last 20</ToggleButton>
          <ToggleButton value="SEASON">Season</ToggleButton>
        </StyledToggleButtonGroup>

        <StyledToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="category"
          disabled={loading}
        >
          <ToggleButton value="POINTS">Points</ToggleButton>
          <ToggleButton value="ASSISTS">Assists</ToggleButton>
          <ToggleButton value="REBOUNDS">Rebounds</ToggleButton>
        </StyledToggleButtonGroup>

        <StyledToggleButtonGroup
          value={selectedThreshold}
          exclusive
          onChange={handleThresholdChange}
          aria-label="threshold"
          disabled={loading}
        >
          {thresholdOptions[selectedCategory]?.map((option) => (
            <ToggleButton key={option} value={option}>
              {option}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </FilterGroupsWrapper>
    </FilterContainer>
  );
}
