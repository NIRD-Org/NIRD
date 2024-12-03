import React, { useState } from "react";
import { FaChartLine, FaClipboardList, FaUsers, FaRegLightbulb, FaHandHoldingHeart, FaBuilding, FaFlagCheckered, FaRecycle, FaTools } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Theme1Page = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);

  // Data for the graph
  const data = [
    {
      label: 'Percentage of job cardholders receiving employment under MGNREGA',
      baseline: 75,
      current: 80,
      target: 83,
    },
    {
      label: 'Percentage of Households covered under Pradhan Mantri Awas Yojana (PMAY)',
      baseline: 38,
      current: 52,
      target: 55,
    },
    {
      label: 'Percentage of population covered under National Social Assistance Programme (NSAP)',
      baseline: 48,
      current: 58,
      target: 60,
    },
    {
      label: 'Percentage of population covered under Pradhan Mantri Jan Dhan Yojana (PMJDY)',
      baseline: 64,
      current: 78,
      target: 83,
    },
    {
      label: 'Percentage of women belonging to BPL families under Self-Help Groups (SHG)',
      baseline: 37,
      current: 48,
      target: 50,
    },
  ];

  // Options for the graph
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Achievements of Project GPs under Poverty Free and Enhanced Livelihoods in Village',
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
          Poverty-Free and Enhanced Livelihoods Village
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          A comprehensive initiative aimed at alleviating rural poverty through economic empowerment, employment, and community development.
        </p>
      </div>

  {/* Detailed Description of the Theme */}
<div className="mb-12">
  <p className="text-gray-700 text-md leading-relaxed text-justify">
    The <strong>Poverty-Free and Enhanced Livelihoods Village</strong> initiative focuses on providing rural communities with resources and opportunities to break the cycle of poverty. It targets marginalized communities to ensure access to <strong>employment</strong>, <strong>safe housing</strong>, and <strong>social welfare programs</strong>. Core components include <strong>employment generation</strong> through <strong>MGNREGA</strong>, affordable housing via <strong>PMAY</strong>, and <strong>financial inclusion</strong> through <strong>PMJDY</strong>. Additionally, the program empowers women through <strong>Self-Help Groups (SHGs)</strong>, promotes <strong>community participation</strong>, and fosters <strong>environmental sustainability</strong>. The initiative also promotes active involvement in <strong>Gram Sabhas</strong>, ensuring that local people contribute to decision-making and planning, especially for the <strong>Gram Panchayat Development Plans (GPDP)</strong>. Ultimately, this program seeks to create a <strong>self-sustaining rural economy</strong> where every individual has the opportunity to succeed, contributing to the achievement of the <strong>Sustainable Development Goals (SDGs)</strong>.
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

export default Theme1Page;
