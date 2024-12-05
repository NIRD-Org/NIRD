import React, { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Theme6Page = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);

  // Data for the graph
  const data = [
    {
      label: 'Percentage of Functional Health Sub centre/Health & wellness centre',
      baseline: 18,
      current: 20,
      target: 25,
    },
    {
      label: 'Percentage of HHs not having electricity facility',
      baseline: 33,
      current: 34,
      target: 27,
    },
    {
      label: 'Percentage of Project GP Wards having street lighting facilities on the roads',
      baseline: 54,
      current: 69,
      target: 72,
    },
    {
      label: 'Percentage of Villages that are connected with all-weather roads',
      baseline: 72,
      current: 74,
      target: 80,
    },
    {
      label: 'Percentage of Households living in Kutcha houses in Project GPs',
      baseline: 29,
      current: 24,
      target: 27,
    },
  ];

  // Options for the graph
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Achievements of Project GPs under Village with Self-Sufficient Infrastructure',
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
          Village with Self-Sufficient Infrastructure
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Enhancing rural infrastructure to create self-sufficient, sustainable, and empowered communities.
        </p>
      </div>

      {/* Detailed Description of the Theme */}
      <div className="mb-12">
        <p className="text-gray-700 text-md leading-relaxed text-justify">
          The <strong>Village with Self-Sufficient Infrastructure</strong> initiative aims to provide reliable infrastructure for rural communities. This includes improving health facilities, electricity access, street lighting, and road connectivity. By upgrading essential infrastructure, the program strives to enhance the quality of life and promote rural development. These efforts contribute to the achievement of <strong>Sustainable Development Goals (SDGs)</strong> by addressing challenges in health, energy, and transportation.
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

export default Theme6Page;
