import React, { useState } from "react";
import { FaChartLine, FaClipboardList, FaUsers, FaRegLightbulb, FaHandHoldingHeart, FaBuilding, FaFlagCheckered, FaRecycle, FaTools } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Theme4Page = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);

  // Data for the graph
  const data = [
    {
      label: 'Percentage of households in the project GPs avail themselves of 65 LPCD (Litres Per Capita Per Day) water',
      baseline: 74,
      current: 59,
      target: 80,
    },
    {
      label: 'Percentage of Houses/Public Buildings that are facilitated with Grey Water Management Structure',
      baseline: 23,
      current: 16,
      target: 24,
    },
    {
      label: 'Percentage of Houses/Public Buildings that are facilitated with functional rooftop rain water harvesting structure',
      baseline: 11,
      current: 15,
      target: 15,
    },
    {
      label: 'Percentage of institutions (Schools, Anganwadi centres, GP buildings, Health centres, wellness centres and community buildings etc.) located in Project GP having access to Tap Water Connection',
      baseline: 15,
      current: 15,
      target: 68,
    },
    {
      label: 'Percentage of HHs having Tap Water Connection (as per Jal Jeevan Mission)',
      baseline: 9,
      current: 12,
      target: 15,
    },
  ];

  // Options for the graph
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Achievements of Project GPs under Water Sufficient Village',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Key Indicators',
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Percentage',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  // Toggle function for expandable cards
  const toggleCard = (index) => {
    const newOpenState = [...isOpen];
    newOpenState[index] = !newOpenState[index];
    setIsOpen(newOpenState);
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-[#004B86] text-[2.5rem] font-extrabold">
          Water-Sufficient Village
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Ensuring access to water resources and infrastructure for rural communities.
        </p>
      </div>

     {/* Detailed Description of the Theme */}
<div className="mb-12">
  <p className="text-gray-700 text-md leading-relaxed text-justify">
    The <strong>Water-Sufficient Village</strong> initiative focuses on ensuring that rural communities have access to clean and sufficient water for daily use. This program addresses key areas such as <strong>Household Access to Water</strong>, <strong>Water Management Structures</strong>, and <strong>Tap Water Connections</strong>. Key components of the initiative include providing households with <strong>65 LPCD</strong> (litres per capita per day) of water, setting up <strong>Grey Water Management Structures</strong>, and implementing <strong>Rooftop Rainwater Harvesting Systems</strong> in both residential and public buildings. Additionally, the program promotes increasing access to <strong>Tap Water Connections</strong> in institutions like schools, health centres, and Anganwadi centres. Ultimately, the goal is to create a <strong>Self-Sustaining Water Infrastructure</strong> in rural villages, ensuring that communities have reliable access to water. This contributes to the achievement of the <strong>Sustainable Development Goals (SDGs)</strong>, particularly in areas of health, sanitation, and sustainable water management.
  </p>
</div>

      {/* Section Title for Achievements */}
      <div className="text-center mb-8">
        <h2 className="text-[#004B86] text-2xl font-semibold">
          Achievements
        </h2>
      </div>

      {/* Key Interventions Section - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Row 1 */}
        {data.map((indicator, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:bg-white transition-all">
            <div
              className="flex items-center mb-4 cursor-pointer"
              onClick={() => toggleCard(index)}
            >
              <FaRegLightbulb className="text-[#004B86] text-4xl mr-4" />
              <h3 className="text-[#004B86] text-xl font-semibold">{indicator.label}</h3>
            </div>
            {isOpen[index] && (
              <div className="overflow-x-auto">
                <Bar
                  data={{
                    labels: ['Baseline (31.03.2022)', '(31.03.2024)', '(30.09.2024)'],
                    datasets: [
                      {
                        label: 'Percentage',
                        data: [indicator.baseline, indicator.current, indicator.target],
                        backgroundColor: ['#3b82f6', '#f97316', '#6b7280'], // Blue, Orange, Gray
                        borderColor: ['#3b82f6', '#f97316', '#6b7280'],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={options}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Theme4Page;
