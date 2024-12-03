import React, { useState } from "react";
import { FaChartLine, FaClipboardList, FaUsers, FaRegLightbulb, FaHandHoldingHeart, FaBuilding, FaFlagCheckered, FaRecycle, FaTools } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Theme2Page = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);

  // Data for the graph
  const data = [
    {
      label: 'Percentage of child deaths (in the age group...',
      baseline: 15,
      current: 9,
      target: 2,
    },
    {
      label: 'Percentage of pregnant women (15-49 yrs)...',
      baseline: 2,
      current: 11,
      target: 9,
    },
    {
      label: 'Percentage of children (0-6 years) fully immunized...',
      baseline: 82,
      current: 89,
      target: 95,
    },
    {
      label: 'Percentage of women benefited under...',
      baseline: 58,
      current: 72,
      target: 76,
    },
    {
      label: 'Percentage of households with safe drinking water...',
      baseline: 83,
      current: 91,
      target: 96,
    },
  ];

  // Options for the graph
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Achievements of Project GPs under Healthy Village',
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
          Healthy Village
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Key interventions driving the health and well-being of rural communities.
        </p>
      </div>

      {/* Detailed Description of the Theme */}
<div className="mb-12">
  <p className="text-gray-700 text-md leading-relaxed text-justify">
    The <strong>Healthy Village</strong> initiative focuses on improving the health and well-being of rural communities by addressing crucial health indicators, including <strong>child mortality</strong>, <strong>maternal health</strong>, <strong>immunization coverage</strong>, and access to <strong>safe drinking water</strong>. Key components of the initiative include reducing <strong>child mortality</strong> through better healthcare access, ensuring that <strong>pregnant women</strong> receive adequate care, and expanding the reach of <strong>immunization programs</strong> for children. The initiative also promotes <strong>safe drinking water</strong> initiatives to reduce waterborne diseases and improve overall public health. Furthermore, women’s health is a key focus, with programs aimed at enhancing their health and well-being. Ultimately, the goal is to create a <strong>self-sustaining health infrastructure</strong> in rural villages, where communities have access to essential health services, contributing to the achievement of the <strong>Sustainable Development Goals (SDGs)</strong>, particularly in health and well-being.
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
                    labels: ['Baseline (31.03.2022)', 'Current (31.03.2024)', 'Target (30.09.2024)'],
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

export default Theme2Page;
