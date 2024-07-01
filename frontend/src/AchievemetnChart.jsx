//3
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const AchievementChart = ({ state, block, dist, gp, themeId }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API call
        // const { data } = await API.get(
        //   `/api/v1/gp-wise-kpi/achievement-chart?gp=${gp}&theme=${themeId}&state=${state}&dist=${dist}&block=${block}`
        // );
        // setChartData(data[0]);

        // Dummy data based on the provided table
        const dummyData = {
          theme_id: 1,
          theme_name: "Poverty Free and Enhanced Livelihoods Village",
          gp_name: "E. Lungdar",
          state_name: "Mizoram",
          dist_name: "Serchhip",
          block_name: "East Lungdar",
          chartData: [
            {
              kpi_name: "Percentage of job card holders in the GP that received wage employment under MGNREGS",
              lastPercentage: { percentage: 70 },
              currentPercentage: { percentage: 65 },
            },
            {
              kpi_name:
                "Percentage of Households (HHs) in the GP covered under Pradhan Mantri Awas Yojana-Grameen (PMAY-G)/Similar State schemes.",
              lastPercentage: { percentage: 75 },
              currentPercentage: { percentage: 60 },
            },
            {
              kpi_name:
                "Percentage of farmers in the GP benefited under the Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) Scheme",
              lastPercentage: { percentage: 80 },
              currentPercentage: { percentage: 90 },
            },
            {
              kpi_name: "Percentage of population of the GP covered under National Food Security Act, 2013",
              lastPercentage: { percentage: 85 },
              currentPercentage: { percentage: 88 },
            },
            {
              kpi_name:
                "Percentage of population in the GP covered under National Social Assistance Programme (NSAP)/similar State pension scheme in the State/UT",
              lastPercentage: { percentage: 40 },
              currentPercentage: { percentage: 42 },
            },
            {
              kpi_name: "Percentage of population in the GP covered under Pradhan Mantri Jan-Dhan Yojana (PMJDY)",
              lastPercentage: { percentage: 65 },
              currentPercentage: { percentage: 70 },
            },
            {
              kpi_name:
                "Percentage of women belonging to BPL HHs (as per SECC 2011) in the GP who became members of Self-Help Groups (SHGs) in the GP.",
              lastPercentage: { percentage: 55 },
              currentPercentage: { percentage: 58 },
            },
            {
              kpi_name: "Percentage of SHGs in the GP which availed themselves of Bank loan.",
              lastPercentage: { percentage: 45 },
              currentPercentage: { percentage: 48 },
            },
            {
              kpi_name: "Percentage of SHGs engaged in income generation activities in the GP",
              lastPercentage: { percentage: 50 },
              currentPercentage: { percentage: 55 },
            },
            {
              kpi_name:
                "Percentage of persons certified through the skill development training institutes/ITIs in the GP",
              lastPercentage: { percentage: 60 },
              currentPercentage: { percentage: 62 },
            },
            {
              kpi_name:
                "Percentage of the total Budget of the GP allocated for implementing various poverty reduction & livelihood activities other than MGNREGS & NRLM",
              lastPercentage: { percentage: 75 },
              currentPercentage: { percentage: 78 },
            },
            {
              kpi_name:
                "Percentage of OSR Spent by the GP to address various poverty reduction & livelihood activities in the GP",
              lastPercentage: { percentage: 80 },
              currentPercentage: { percentage: 85 },
            },
          ],
        };

        setChartData(dummyData);
      } catch (error) {
        setError("Error fetching chart data");
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, [state, dist, gp, themeId]);

  if (!chartData) {
    return <div className="w-full h-[50vh] flex justify-center items-center text-3xl">{error || "Loading..."}</div>;
  }

  const labels = chartData.chartData.map(item => item.kpi_name);
  const lastYearData = chartData.chartData.map(item => parseFloat(item.lastPercentage.percentage || 0));
  const currentYearData = chartData.chartData.map(item => parseFloat(item.currentPercentage.percentage || 0));

  const data = {
    labels,
    datasets: [
      {
        label: "Baseline Status (Last Year)",
        data: lastYearData,
        backgroundColor: "rgba(0, 75, 134, 1)",
      },
      {
        label: "Status as on 31.03.2024",
        data: currentYearData,
        backgroundColor: "rgba(255, 127, 0,1)",
      },
    ],
  };

  const options = {
    responsive: true,
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
          text: "KPI Names",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          // maxTicksLimit: 10,
          // padding: 5,
          callback: function (value) {
            const label = this.getLabelForValue(value);
            const words = label.split(" ");
            let lines = [];
            let currentLine = [];

            words.forEach(word => {
              if (currentLine.join(" ").length + word.length + 1 <= 20) {
                currentLine.push(word);
              } else {
                lines.push(currentLine.join(" "));
                currentLine = [word];
              }
            });
            lines.push(currentLine.join(" "));

            return lines.join("\n");
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage",
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
    barPercentage: 0.4,
    barThickness: 20,
    maxBarThickness: 30,
    categorySpacing: 0.5,
  };

  return (
    <div className="px-2 py-10">
      <h2 className="text-green-600 text-center mb-4">Achievements of Project GPs under Women Friendly Village</h2>
      <div className="flex border-2 py-10 justify-between items-center">
        <div className="w-full p-1">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AchievementChart;
