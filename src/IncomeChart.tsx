import { ReactNode, useMemo } from "react";
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
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
  zoomPlugin
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
              min: 0,
              max: 120,
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
            zoom: {
              limits: {
                x: {
                  minRange: 10,
                },
              },
              pan: {
                enabled: true,
                mode: "x",
                modifierKey: "shift",
              },
              zoom: {
                wheel: {
                  enabled: true,
                  speed: 0.005,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        }}
      />
    </>
  );
}

function formatNZD(nzd: number): string {
  // group by triplets
  const nzdStr = nzd
    .toFixed(0)
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)!
    .join(",")
    .split("")
    .reverse()
    .join("");
  return "$" + nzdStr;
}
