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
import { useSearchParams } from "react-router-dom";
// import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend);

const ManregsChart = ({ kpi, kpiId, theme }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gpwiseKpiChart, setGpwiseKpiChart] = useState();
  const chartRef = useRef();

  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const gp = searchParams.get("gp") || "";
  const getChartData = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi/chart?state=${state}&dist=${dist}&gp=${gp}&kpi=${kpiId}&theme=${theme}`
      );
      setGpwiseKpiChart(data);
    } catch (error) {
      console.error(error);
      setGpwiseKpiChart();
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
  const barData = {
    labels: ["Quarterly 1", "Quarterly 2", "Quarterly 3", "Quarterly 4"],
    datasets: [
      {
        label: kpi.substr(0, 70) + "...",
        data: [
          gpwiseKpiChart?.quarterlyPercentage?.quarter1,
          gpwiseKpiChart?.quarterlyPercentage?.quarter2 || 78,
          gpwiseKpiChart?.quarterlyPercentage?.quarter3 || 94,
          gpwiseKpiChart?.quarterlyPercentage?.quarter4 || 87,
        ],
        backgroundColor: "#00203F",

        borderColor: "#004B86",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    indexAxis: "x",
    maintainAspectRatio: false,

    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },

    plugins: {
      legend: {
        position: "bottom",
        display: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    barThickness: 30, // This controls the thickness of the bars
    maxBarThickness: 40, // This sets the maximum thickness of the bars
  };

  const pieData = {
    labels: ["GP", "State", "Country"],
    datasets: [
      {
        data: [
          gpwiseKpiChart?.yearlyData?.gp.percentage,
          gpwiseKpiChart?.yearlyData?.state.percentage,
          gpwiseKpiChart?.yearlyData?.country.percentage,
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
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="px-2 md:px-10 md:py-8 lg:px-20 lg:py-10">
      <div className="max-w-full overflow-auto">
        <table className="w-full divide-y border border-gray-200 divide-gray-200">
          <thead>
            <tr className="text-white w-full bg-primary">
              <th colspan="4" className="w-full text-center p-2">
                {kpi}
              </th>
            </tr>
            <tr>
              <th className="p-2 border-2 text-center">Quarterly 1</th>
              <th className="p-2 border-2 text-center">Quarterly 2</th>
              <th className="p-2 border-2 text-center">Quarterly 3</th>
              <th className="p-2 border-2 text-center">Quarterly 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-2 text-center">
                {gpwiseKpiChart?.quarterlyPercentage?.quarter1 || "N/A"}
              </td>
              <td className="p-2 border-2 text-center">
                {gpwiseKpiChart?.quarterlyPercentage?.quarter2 || "N/A"}
              </td>
              <td className="p-2 border-2 text-center">
                {gpwiseKpiChart?.quarterlyPercentage?.quarter3 || "N/A"}
              </td>
              <td className="p-2 border-2 text-center">
                {gpwiseKpiChart?.quarterlyPercentage?.quarter4 || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex py-10 flex-col md:flex-row justify-between items-center ">
        <div className="lg:w-1/2  w-full h-screen lg:h-[80vh] border-2 p-1 md:p-10">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className=" flex flex-col justify-center items-center lg:w-1/2 text-center  max-h-screen lg:max-h-[80vh]  border-2 md:p-10 ">
          <h1 className="text-center py-4  text-gray-700 text-3xl font-semibold">
            Financial Year - 2023
          </h1>
          <Pie data={pieData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ManregsChart;
