import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import API from "@/utils/API";

const AchievementChart = ({
  state = "",
  block = "",
  dist = "",
  gp = "",
  themeId,
}) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with actual API call once backend integration is ready
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi/achievement-chart?gp=${gp}&theme=${themeId}&state=${state}&dist=${dist}&block=${block}`
      );
      setChartData(data[0]);

      // For testing purposes, you can uncomment and use the static data below
      // const testData = {
      //   theme_id: 1,
      //   theme_name: "Education",
      //   gp_name: "Sample GP",
      //   state_name: "Sample State",
      //   dist_name: "Sample District",
      //   block_name: "Sample Block",
      //   chartData: [
      //     // Sample KPI data here...
      //   ],
      // };
      // setChartData(testData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Use Effect");
    fetchData();
  }, [state, dist, gp, themeId]);

  if (loading) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center text-3xl">
        Loading...
      </div>
    );
  }

  if (!chartData && !loading) {
    return (
      <div className="w-full h-[30vh] flex justify-center items-center text-3xl">
        No Data Found
      </div>
    );
  }
  const labels = chartData.chartData.map((item) => item.kpi_name);
  const baselineData = chartData.chartData.map((item) =>
    parseFloat(item.lastPercentage?.percentage || 0)
  );
  const currentData = chartData.chartData.map((item) =>
    parseFloat(item.currentPercentage?.percentage || 0)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Baseline Status (as on 31.03.2022)",
        data: baselineData,
        backgroundColor: "rgba(0, 75, 134, 1)",
      },
      {
        label: "Status as on 31.03.2024",
        data: currentData,
        backgroundColor: "rgba(255, 127, 0,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage",
        },
        ticks: {
          stepSize: 10,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "KPI Names",
        },
        ticks: {
          autoSkip: false,
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.substring(0, 40);
          },
        },
        grid: {
          drawTicks: false,
          offset: true,
        },
      },
    },
    barPercentage: 0.5,
    barThickness: 30,
    maxBarThickness: 40,
    categorySpacing: 0.2,
  };

  return (
    <div className="px-2 py-10">
      <h2 className="text-green-600 text-center mb-4">
        Achievements of Project GPs under Women Friendly Village
      </h2>
      <div className="flex border-2 py-10 justify-between items-center">
        <div className="w-full p-1">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AchievementChart;
