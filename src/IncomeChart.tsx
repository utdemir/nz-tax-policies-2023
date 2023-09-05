import { ReactNode, useMemo, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { INCOME_DATA_LABELS } from "./policies/utils";
import { Policy } from "./policies/policy";
import { IconButton, Stack } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import { formatNZD } from "./utils";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip
);

type Props = {
  policies: Policy<any>[];
};

export function IncomeChart(props: Props): ReactNode {
  const data = useMemo(
    () => ({
      datasets: props.policies.map((policy) => ({
        label: policy.name,
        data: policy.netIncomeData(),
        borderColor: policy.color,
        pointRadius: 0,
        backgroundColor: policy.color,
      })),
      labels: INCOME_DATA_LABELS.map((x) => formatNZD(x)),
    }),
    [props.policies]
  );

  const ABSOLUTE_MIN = 0;
  const ABSOLUTE_MAX = 1000;

  const [rangeMin, setRangeMin] = useState<number>(ABSOLUTE_MIN);
  const [rangeMax, setRangeMax] = useState<number>(150);

  function zoom(factor: number) {
    const currentSize = rangeMax - rangeMin;
    const currentMid = (rangeMax + rangeMin) / 2;

    const newSize = Math.max(currentSize / factor, 5);

    setRangeMin(Math.max(ABSOLUTE_MIN, currentMid - newSize / 2));
    setRangeMax(Math.min(ABSOLUTE_MAX, rangeMin + newSize));
  }

  function pan(direction: "left" | "right") {
    const currentSize = rangeMax - rangeMin;
    const inc = direction === "left" ? -1 : 1;

    const panAmount = currentSize / 4;

    const newMin = clamp(
      rangeMin + panAmount * inc,
      ABSOLUTE_MIN,
      ABSOLUTE_MAX - currentSize
    );
    const newMax = Math.min(ABSOLUTE_MAX, newMin + currentSize);

    setRangeMin(newMin);
    setRangeMax(newMax);
  }

  return (
    <>
      <Chart
        type="line"
        data={data}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: "Income",
              },
              min: rangeMin,
              max: rangeMax,
            },
            y: {
              title: {
                display: true,
                text: "Take Home Pay",
              },
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          plugins: {
            tooltip: {
              enabled: true,
              mode: "index",
              callbacks: {
                title: (context) => {
                  const label = context[0].label;
                  return "Income: " + label;
                },
                label: (context) => {
                  const datasetIndex = context.datasetIndex!;
                  const dataset = context.chart.data.datasets![datasetIndex];
                  const value = context.parsed.y!;
                  const label = dataset.label!;
                  return `${label}: ${formatNZD(value)} `;
                },
              },

              itemSort: (a, b) => b.parsed.y - a.parsed.y,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
      <Stack direction={"row-reverse"}>
        <IconButton onClick={() => zoom(1.2)}>
          <ZoomIn />
        </IconButton>
        <IconButton onClick={() => zoom(0.8)}>
          <ZoomOut />
        </IconButton>
        <IconButton onClick={() => pan("right")}>
          <ChevronRight />
        </IconButton>
        <IconButton onClick={() => pan("left")}>
          <ChevronLeft />
        </IconButton>
      </Stack>
    </>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
