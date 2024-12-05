import React, { useState } from "react";
import { FaChartLine, FaClipboardList, FaUsers, FaRegLightbulb, FaHandHoldingHeart, FaBuilding, FaFlagCheckered, FaRecycle, FaTools } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Theme3Page = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false, false, false, false, false]);

  // Data for the graph
  const data = [
    {
      label: 'Percentage of children (0 to 6 years) who received Ayushman Bharat Health Account (ABHA)',
      baseline: 34,
      current: 57,
      target: 59,
    },
    {
      label: 'Percentage of children (6-18 years) out of school',
      baseline: 12,
      current: 9,
      target: 11,
    },
    {
      label: 'Percentage of schools where separate toilets for boys and girls were set up',
      baseline: 64,
      current: 80,
      target: 84,
    },
    {
      label: 'Percentage of Halls having Nutri-Gardens or Poshan Vatikas created in the GP',
      baseline: 19,
      current: 26,
      target: 34,
    },
    {
      label: 'Percentage of children (6-59 months) recorded anemic (<11.0 g/dl)',
      baseline: 5,
      current: 6,
      target: 5,
    },
    {
      label: 'Percentage of children (0-6 years) fully vaccinated',
      baseline: 80,
      current: 88,
      target: 95,
    },
    {
      label: 'Percentage of children (below 5 years of age) recorded wasted',
      baseline: 4,
      current: 5,
      target: 4,
    },
    {
      label: 'Percentage of children (below 5 years of age) recorded stunted',
      baseline: 3,
      current: 4,
      target: 3,
    },
  ];

  // Options for the graph
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Achievements of Project GPs under Child-Friendly Village',
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
          Child-Friendly Village
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Ensuring the well-being and development of children in rural communities.
        </p>
      </div>

     {/* Detailed Description of the Theme */}
<div className="mb-12">
  <p className="text-gray-700 text-md leading-relaxed text-justify">
    The <strong>Child-Friendly Village</strong> initiative focuses on improving the health, education, and overall well-being of children in rural areas. This program targets key areas such as access to <strong>Healthcare</strong>, <strong>Education</strong>, <strong>Nutrition</strong>, and <strong>Sanitation</strong>. Key components include providing <strong>Healthcare access</strong> through the Ayushman Bharat Health Account (ABHA) program, reducing <strong>Child drop-out rates</strong> from schools, and setting up <strong>separate sanitation facilities</strong> for boys and girls in schools. The program also promotes the creation of <strong>Nutri-Gardens</strong> and <strong>Poshan Vatikas</strong> for better nutritional outcomes in communities. Immunization programs aim to ensure that children are fully vaccinated, and nutritional health is tracked to prevent issues such as <strong>Malnutrition</strong>, <strong>Stunting</strong>, and <strong>Wasting</strong>. The program seeks to create a <strong>Self-sustaining, Child-friendly Environment</strong> where children grow up with access to essential services that allow them to thrive, contributing to the achievement of the <strong>Sustainable Development Goals (SDGs)</strong>, especially in health and education.
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

export default Theme3Page;
