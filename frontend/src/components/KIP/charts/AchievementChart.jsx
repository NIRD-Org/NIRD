import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import API from "@/utils/API";

const AchievementChart = ({
  state = "",
  block = "",
  dist = "",
  gp = "",
  fy,
  themeId,
  theme,
  fy2,
}) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with actual API call once backend integration is ready
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi/achievement-chart?gp=${gp}&theme=${themeId}&state=${state}&dist=${dist}&block=${block}&financial_year=${fy}&financial_year2=${fy2}`
      );
      setChartData(data[0]);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fy || !fy2) return;
    fetchData();
  }, [gp, themeId, fy, fy2]);

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
        label: `Baseline Status as on ${fy2}`,
        data: baselineData,
        backgroundColor: "darkOrange",
      },
      {
        label: `Status as on ${fy}`,
        data: currentData,
        backgroundColor: "#0a2c4e",
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#333",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage",
          color: "#333",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "KPI Names",
          color: "#333",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          color: "#333",
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.length > 40 ? label.substring(0, 40) + "..." : label;
          },
        },
      },
    },
    barPercentage: 1,
    categoryPercentage: 0.7,
  };

  return (
    <div className="px-2 py-10">
      <h2 className="text-green-600 text-center mb-4">
        Achievements of Project GPs Under {"  " + theme}
      </h2>
      <div className="flex border-2 py-10 justify-between items-center">
        <div className="w-full p-1">
          <Bar data={data} height={null} width={null} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AchievementChart;
