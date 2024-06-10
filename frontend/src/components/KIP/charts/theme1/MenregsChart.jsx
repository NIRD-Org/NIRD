import React, { useEffect, useRef, useState } from "react";
import {
  Bar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Scatter,
  Chart as Charts,
  Bubble,
} from "react-chartjs-2";
import "chart.js/auto";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import API from "@/utils/API";
// import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend);

const ManregsChart = ({ kpi, chartType, state, gp, dist }) => {
  const [gpwiseKpiChart, setGpwiseKpiChart] = useState();
  const chartRef = useRef();
  const getChartData = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi/chart?state=${state}&dist=${dist}&gp=${gp}&kpi=${kpi}`
      );
      setGpwiseKpiChart(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, [gpwiseKpiChart]);

  useEffect(() => {
    getChartData();
  }, []);

  // Data for the doughnut chart
  const data = {
    labels: ["GP", "State", "Country"],
    datasets: [
      {
        label: "Percentage of Job Card Holders Employed",
        data: [
          gpwiseKpiChart?.gp.percentage,
          gpwiseKpiChart?.state.percentage,
          gpwiseKpiChart?.country.percentage,
        ],
        fill: true,
        backgroundColor: ["#004B86", "darkOrange", "gray"],
        borderColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Options for the doughnut chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <>
      {chartType === "Pie" && (
        <Pie
          style={{ width: "95%", height: "95%" }}
          data={data}
          options={options}
        />
      )}
      {chartType === "Bar" && <Bar data={data} options={options} />}
      {chartType === "Line" && <Line data={data} options={options} />}
      {chartType === "Polar" && <PolarArea data={data} options={options} />}
      {chartType === "Doughnut" && (
        <Doughnut
          style={{ width: "90%", height: "90%" }}
          data={data}
          options={options}
        />
      )}
      {chartType === "Scatter" && <Scatter data={data} options={options} />}
      {chartType === "Bubble" && <Bubble data={data} options={options} />}
      {/* {chartType === "Chart" && (
        <Charts data={data}  options={options} />
      )} */}
    </>
  );
};

export default ManregsChart;
