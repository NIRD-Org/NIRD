import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const KeyPartners = () => {
  const data = {
    labels: ["MoPR", "NIRDPR", "SIRDs"],
    datasets: [
      {
        data: [41, 10, 49],
        backgroundColor: ["#FFA726", "#42A5F5", "#66BB6A"],
        hoverBackgroundColor: ["#FF7043", "#2196F3", "#43A047"], // Hover effects
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#ffffff", // Label color
        font: {
          size: 14, // Size of labels
          weight: "bold",
        },
        formatter: (value, context) => {
          const percentage = value;
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n${percentage}%`; // Show label and percentage
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value}% (${percentage}%)`;
          },
        },
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        bodyColor: "#000000",
        borderColor: "#ccc",
        borderWidth: 1,
      },
      legend: {
        display: false, // Legend is not needed as labels are inside the chart
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h1 className="text-[#004B86] text-[2.2rem] font-extrabold">
          Key Partners and their Financial Contribution
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          A detailed overview of the financial contributions by key stakeholders involved in the project.
        </p>
      </div>

      {/* Chart and Explanation */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Chart */}
        <div className="relative w-[300px] h-[300px]">
          <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
          {/* Centered Text */}
          <div className="absolute inset-0 flex justify-center items-center">
            <p className="text-xl font-bold text-gray-700 text-center">
              Financial <br/>Contribution
            </p>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
          
          <p className="text-gray-700 text-md leading-relaxed mb-4">
            The project is financially supported by three key partners, each
            contributing to critical areas of implementation. These partners
            include the Ministry of Panchayati Raj (MoPR), the National
            Institute of Rural Development and Panchayati Raj (NIRDPR), and the
            State Rural Development & Panchayati Raj Departments/SIRDs. Below
            is a detailed explanation of their roles:
          </p>
          <ul className="list-disc px-5 text-gray-700 text-md leading-relaxed">
            <li>
              <b>MoPR (41% Contribution):</b> The Ministry of Panchayati Raj
              provides funding for human resources and project management
              costs. This ensures that qualified personnel and effective
              management systems are in place for seamless execution.
            </li>
            <li className="mt-3">
              <b>NIRDPR (10% Contribution):</b> NIRDPR is responsible for
              capacity-building and training activities for project staff and
              nodal officers. This contribution plays a crucial role in
              equipping the workforce with the knowledge and skills required to
              implement the project's objectives successfully.
            </li>
            <li className="mt-3">
              <b>SIRDs (49% Contribution):</b> The largest share comes from the
              State Rural Development & Panchayati Raj Departments and the
              State Institutes of Rural Development (SIRDs). This funding
              supports various capacity-building initiatives, technical
              guidance, and additional project requirements at the state level.
            </li>
          </ul>
        </div>
      </div>

      {/* Additional Section */}
      <div className="mt-10 bg-gray-100 rounded-lg shadow p-6">
        <h2 className="text-[#004B86] text-xl font-semibold mb-4">
          Why These Contributions Matter
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The financial contributions of these stakeholders highlight the
          collaborative nature of the project. Each partner plays a vital role
          in ensuring that resources, training, and management are optimized to
          achieve the project's goals of building model Gram Panchayat clusters
          across India. The division of responsibilities also ensures
          accountability and strategic focus on specific project areas, leading
          to holistic and sustainable development.
        </p>
      </div>
    </div>
  );
};

export default KeyPartners;
