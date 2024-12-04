import React, { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Theme9Page = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);

  // Data for the graph
  const data = [
    {
      label: 'Percentage of girl children (6-13 years) are out of school',
      baseline: 15,
      current: 3,
      target: 2,
    },
    {
      label: 'Percentage of girl children (0-5 years) recorded as malnourished',
      baseline: 9,
      current: 1,
      target: 1,
    },
    {
      label: 'Percentage of all children (0-5 years) recorded as malnourished',
      baseline: 6,
      current: 1,
      target: 1,
    },
    {
      label: 'Percentage of girl children (0-13 years) were immunized',
      baseline: 11,
      current: 2,
      target: 2,
    },
    {
      label: 'Percentage of pregnant/lactating women (15-49 years) receiving nutrition support',
      baseline: 7,
      current: 4,
      target: 2,
    },
  ];

  // Options for the graph
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Achievements of Project GPs under Women-Friendly Village',
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
          stepSize: 2,
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
          Women-Friendly Village
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Creating inclusive environments to empower women and improve their quality of life.
        </p>
      </div>

      {/* Detailed Description of the Theme */}
      <div className="mb-12">
        <p className="text-gray-700 text-md leading-relaxed text-justify">
          The <strong>Women-Friendly Village</strong> initiative aims to enhance the well-being of women and girl 
          children in rural areas by focusing on their education, nutrition, and health. This program seeks to 
          reduce malnutrition among children, increase school enrollment for girl children, and provide adequate 
          support to pregnant and lactating women. By ensuring access to health and nutrition services, the initiative 
          empowers women to lead healthier and more secure lives while fostering gender equality in rural communities.
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

export default Theme9Page;
