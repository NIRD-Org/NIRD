import React, { useState } from "react";
import { FaChartLine, FaRegLightbulb } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Theme5Page = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);

  // Data for the graph
  const data = [
    {
      label: 'Percentage of households reached by solar street lights in project GPs',
      baseline: 55,
      current: 65,
      target: 72,
    },
    {
      label: 'Percentage of BPL households as per BPL survey availing benefits',
      baseline: 50,
      current: 60,
      target: 65,
    },
    {
      label: 'Percentage of solar-based irrigation pumps created',
      baseline: 10,
      current: 24,
      target: 27,
    },
    {
      label: 'Percentage of solar-based street lights created',
      baseline: 29,
      current: 41,
      target: 49,
    },
  ];

  // Options for the graph
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Achievements of Project GPs under Clean and Green Village',
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
          Clean and Green Village
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Empowering rural communities with sustainable, clean, and eco-friendly infrastructure.
        </p>
      </div>

      {/* Detailed Description of the Theme */}
      <div className="mb-12">
        <p className="text-gray-700 text-md leading-relaxed text-justify">
          The <strong>Clean and Green Village</strong> initiative focuses on creating eco-friendly infrastructure for rural communities. This includes the installation of <strong>solar street lights</strong>, <strong>solar-based irrigation systems</strong>, and <strong>green energy solutions</strong>. By ensuring sustainable energy practices and empowering communities, this initiative supports the <strong>Sustainable Development Goals (SDGs)</strong>, particularly in environmental sustainability, energy access, and rural infrastructure development.
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

export default Theme5Page;
