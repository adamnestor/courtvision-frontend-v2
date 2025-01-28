import { Box, ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { thresholdOptions } from "../../constants/thresholds";

export type TimeFrame = "L5" | "L10" | "L15" | "L20" | "SEASON";
export type Category = "POINTS" | "ASSISTS" | "REBOUNDS";

interface FilterBarProps {
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
  onCategoryChange: (category: Category) => void;
  onThresholdChange: (threshold: string) => void;
  loading?: boolean;
  selectedTimeFrame: TimeFrame;
  selectedCategory: Category;
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
  const handleTimeFrameChange = (
    _: React.MouseEvent<HTMLElement>,
    newTimeFrame: TimeFrame
  ) => {
    if (newTimeFrame !== null) {
      onTimeFrameChange(newTimeFrame);
    }
  };

  const handleCategoryChange = (
    _: React.MouseEvent<HTMLElement>,
    newCategory: Category
  ) => {
    if (newCategory !== null) {
      onCategoryChange(newCategory);
    }
  };

  const handleThresholdChange = (
    _: React.MouseEvent<HTMLElement>,
    newThreshold: string
  ) => {
    if (newThreshold !== null) {
      onThresholdChange(newThreshold);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/* Time Frame Filter */}
        <ToggleButtonGroup
          value={selectedTimeFrame}
          exclusive
          onChange={handleTimeFrameChange}
          aria-label="time frame"
          size="small"
          disabled={loading}
        >
          {["L5", "L10", "L15", "L20", "SEASON"].map((option) => (
            <ToggleButton
              key={option}
              value={option}
              sx={{ width: "80px" }} // Fixed width for time frame buttons
            >
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Category Filter */}
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="category"
          size="small"
          disabled={loading}
        >
          {["POINTS", "ASSISTS", "REBOUNDS"].map((option) => (
            <ToggleButton
              key={option}
              value={option}
              sx={{ width: "100px" }} // Fixed width for category buttons
            >
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Threshold Filter */}
        <ToggleButtonGroup
          value={selectedThreshold}
          exclusive
          onChange={handleThresholdChange}
          aria-label="threshold"
          size="small"
          disabled={loading}
        >
          {thresholdOptions[selectedCategory]?.map((option) => (
            <ToggleButton
              key={option}
              value={option}
              sx={{ width: "70px" }} // Fixed width for threshold buttons
            >
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}
