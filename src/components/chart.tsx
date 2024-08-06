"use client";
import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const data = {
  xAxis: [1, 2, 3, 5, 8, 10],
  series: [
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
      area: true,
      label: "Last 6 months",
      color: "#94d1e0",
    },
    {
      data: [1.5, 3.5, 2.5, 7, 1, 4.5],
      label: "Same period last year",
      color: "#46595e",
    },
  ],
};

export const EarningsSummaryChart = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%", marginTop: "10px" }}>
      <Paper
        sx={{
          p: 2,
          borderRadius: "15px",
          boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Earning Summary
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Mar 2022 - Oct 2024
        </Typography>
        <LineChart
          xAxis={[{ data: data.xAxis }]}
          series={data.series}
          sx={{ width: "100%" }}
          height={300}
        />
      </Paper>
    </Box>
  );
};
