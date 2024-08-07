"use client";

import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import * as React from "react";

type SeriesData = React.ComponentProps<
  typeof PieChart
>["series"][number]["data"];

const data = [
  { label: "Group A", value: 54, color: "#006AFF" },
  { label: "Group B", value: 20, color: "green" },
  { label: "Group C", value: 25, color: "red" },
] satisfies SeriesData;

export function PieChartWithPaddingAngle() {
  return (
    <Stack direction="row">
      <PieChart
        series={[
          {
            innerRadius: 60,
            outerRadius: 80,
            data,
          },
        ]}
        margin={{ right: 5 }}
        width={200}
        height={200}
        legend={{ hidden: true }}
      />
    </Stack>
  );
}
