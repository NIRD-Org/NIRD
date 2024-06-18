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

const ManregsChart = ({ kpi, kpiId, theme, kpi_img }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gpwiseKpiChart, setGpwiseKpiChart] = useState();
  const chartRef = useRef();
  const [chartType, setChartType] = useState("doughnut");
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
    labels: [" Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
    datasets: [
      {
        label: kpi.substr(0, 50) + "...",
        data: [
          gpwiseKpiChart?.quarterlyPercentage?.quarter1,
          gpwiseKpiChart?.quarterlyPercentage?.quarter2,
          gpwiseKpiChart?.quarterlyPercentage?.quarter3,
          gpwiseKpiChart?.quarterlyPercentage?.quarter4,
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
        enabled: true,
      },
    },
    barThickness: 30, // This controls the thickness of the bars
    maxBarThickness: 40, // This sets the maximum thickness of the bars
  };

  const pieData = {
    labels: ["GP", "State", "250 Model GP Cluster"],
    datasets: [
      {
        label: kpi?.substr(0, 40),
        data: [
          gpwiseKpiChart?.yearlyData?.gp[0]?.percentage?.toFixed(2),
          gpwiseKpiChart?.yearlyData?.state?.percentage?.toFixed(2),
          gpwiseKpiChart?.yearlyData?.country?.percentage?.toFixed(2),
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
    <div className="px-2 py-10">
      <div className="max-w-full overflow-auto">
        <table className="w-full divide-y border border-gray-200 divide-gray-200">
          <thead>
            <tr className="text-white w-full  h-[12vh] max-h-[12vh] bg-primary">
              <th>
                <div className="w-[4rem] h-fit bg-white rounded-xl p-1  ">
                  <img
                    src={kpi_img}
                    alt=""
                    className="w-full border border-gray-300 p-1 rounded-xl h-full"
                  />
                </div>
              </th>
              <th colspan="4" className="w-full text-center  p-2">
                {kpi}
              </th>
            </tr>
            <tr>
              <th className="p-2 min-w-[8rem] border-2 text-center">
                Quarter 1 <br /> (Apr - Jun)
              </th>
              <th className="p-2 border-2 text-center">
                Quarter 2 <br /> (Jul - Sep)
              </th>
              <th className="p-2 border-2 text-center">
                Quarter 3 <br /> (Oct - Dec)
              </th>
              <th className="p-2 border-2 text-center">
                Quarter 4 <br /> (Jan - Mar){" "}
              </th>
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

      <div className="flex border-2 py-10 flex-col md:flex-row justify-between items-center ">
        <div className="  w-full h-[70vh]  lg:w-2/3 lg:h-[60vh]  p-1 ">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="w-full h-[70vh] lg:w-1/2 flex flex-col justify-center items-center  text-center  max-h-screen  lg:max-h-[45vh]">
          <div>
            <label htmlFor="">Chart Type: </label>
            <select
              name=""
              id=""
              onChange={(e) => setChartType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="doughnut">Doughnut</option>
              <option value="pie">Pie</option>
              <option value="bar">Bar</option>

              <option value="polar">Polar</option>
            </select>
          </div>
          <h1 className="text-center py-4  text-gray-700 textxgl font-semibold">
            FY 2023-24
          </h1>

          {chartType === "pie" && <Pie data={pieData} options={options} />}
          {chartType === "polar" && (
            <PolarArea data={pieData} options={options} />
          )}
          {chartType === "doughnut" && (
            <Doughnut data={pieData} options={options} />
          )}
          {chartType === "bar" && (
            <Bar
              className="w-full h-full"
              data={pieData}
              options={barOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManregsChart;
