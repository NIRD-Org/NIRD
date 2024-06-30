import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import API from "@/utils/API";

const AchievementChart = ({ state, block, dist, gp, themeId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API call once backend integration is ready
        const { data } = await API.get(
          `/api/v1/gp-wise-kpi/achievement-chart?gp=${gp}&theme=${themeId}&state=${state}&dist=${dist}&block=${block}`
        );
        setChartData(data[0]);

        // For testing purposes, using static data
        // const testData = {
        //   theme_id: 1,
        //   theme_name: "Education",
        //   gp_name: "Sample GP",
        //   state_name: "Sample State",
        //   dist_name: "Sample District",
        //   block_name: "Sample Block",
        //   chartData: [
        //     {
        //       kpi_id: "1",
        //       kpi_name: "Literacy Rate",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "85.50",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "82.30",
        //       },
        //     },
        //     {
        //       kpi_id: "2",
        //       kpi_name: "School Enrollment",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "92.10",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "91.80",
        //       },
        //     },
        //     {
        //       kpi_id: "3",
        //       kpi_name: "Teacher-Student Ratio",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "15.20",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "14.50",
        //       },
        //     },
        //     {
        //       kpi_id: "4",
        //       kpi_name: "Dropout Rate",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "3.80",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "4.20",
        //       },
        //     },
        //     {
        //       kpi_id: "5",
        //       kpi_name: "Student Performance",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "87.50",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "86.20",
        //       },
        //     },
        //     {
        //       kpi_id: "6",
        //       kpi_name: "Infrastructure Development",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "68.90",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "67.80",
        //       },
        //     },
        //     {
        //       kpi_id: "7",
        //       kpi_name: "Digital Literacy",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "42.10",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "40.50",
        //       },
        //     },
        //     {
        //       kpi_id: "8",
        //       kpi_name: "Teacher Training",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "57.80",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "55.90",
        //       },
        //     },
        //     {
        //       kpi_id: "9",
        //       kpi_name: "Parental Involvement",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "72.30",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "70.50",
        //       },
        //     },
        //     {
        //       kpi_id: "10",
        //       kpi_name: "Gender Parity Index",
        //       currentPercentage: {
        //         financial_year: "FY2023-2024",
        //         percentage: "0.94",
        //       },
        //       lastPercentage: {
        //         financial_year: "FY2022-2023",
        //         percentage: "0.92",
        //       },
        //     },
        //   ],
        // };

        // setChartData(testData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, [state, dist, gp, themeId]);

  if (!chartData) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center text-3xl">
        Loading...
      </div>
    );
  }

  const labels = chartData?.chartData.map((item) => item.kpi_name);
  const baselineData = chartData?.chartData.map((item) =>
    parseFloat(item.lastPercentage?.percentage || 0)
  );
  const currentData = chartData?.chartData.map((item) =>
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
            return label.length > 10
              ? label.match(/.{1,10}/g).join("\n")
              : label;
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
