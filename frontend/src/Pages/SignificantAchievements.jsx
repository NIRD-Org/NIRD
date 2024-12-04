import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SignificantAchievements = () => {
  const [isOpen, setIsOpen] = useState([true, true]); // Default to expanded

  // Data for OSR Collection Graph
  const osrData = {
    labels: [
      "OSR collected by Project GPs during 2021-22 (in ₹)",
      "OSR collected by Project GPs during 2022-23 (in ₹)",
      "OSR collected by Project GPs during 2023-24 (in ₹)",
    ],
    datasets: [
      {
        label: "OSR Amount (₹)",
        data: [ 121282306 
          ,  137219626 
          ,  154716551 
        ],
        backgroundColor: "#3b82f6", // Blue
        borderColor: "#2563eb",
        borderWidth: 1,
      },
    ],
  };

  // Options for OSR Collection Graph
  const osrOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Amount (₹) of OSR Collected in Project GPs",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Financial Year",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₹)",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 20000000,
        },
      },
    },
  };

  // Data for Gram Sabha Performance Graph
  const gramSabhaData = {
    labels: [
      "Baseline Status (as on 31.03.2022)",
      "Status as on 31.03.2023",
      "Status as on 31.03.2024",
    ],
    datasets: [
      {
        label: "Percentage of Gram Sabha Members Participated",
        data: [9.3, 11.5, 13.0],
        backgroundColor: "#3b82f6", // Blue
        borderColor: "#2563eb",
        borderWidth: 1,
      },
      {
        label: "Average No. of Gram Sabha Meetings Conducted",
        data: [3.3, 4.5, 5.2],
        backgroundColor: "#f97316", // Orange
        borderColor: "#ea580c",
        borderWidth: 1,
      },
    ],
  };

  // Options for Gram Sabha Performance Graph
  const gramSabhaOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Performance of Project GPs on Gram Sabhas",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Period",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  // Toggle collapsible sections
  const toggleSection = (index) => {
    const updatedOpen = [...isOpen];
    updatedOpen[index] = !updatedOpen[index];
    setIsOpen(updatedOpen);
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-[#004B86] text-[2.5rem] font-extrabold">
          Significant Achievements in Project GPs
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          A detailed representation of achievements in Own Source Revenue (OSR) collection and performance in Gram Sabha meetings.
        </p>
      </div>
      <div className="mb-12 text-gray-700 leading-relaxed">
 
  <p>
    Gram Panchayats (GPs) serve as the foundation of rural governance in India, 
    playing a pivotal role in ensuring inclusive growth, development, and welfare 
    at the grassroots level. Over the years, focused interventions and capacity-building 
    initiatives have been implemented to strengthen GPs and make them self-sufficient in terms 
    of resources and governance.
  </p>
  
  <p className="mt-4">
    One of the most significant achievements of this initiative is the improvement in{" "}
    <strong>Own Source Revenue (OSR)</strong> collection. OSR refers to the revenue generated 
    by Gram Panchayats through taxes, fees, and other local levies. These funds are essential for 
    financing development projects and meeting the operational costs of the GP without depending 
    entirely on external assistance. As the data indicates, there has been a consistent increase in 
    OSR collection over the last three financial years, highlighting the growing financial independence 
    of GPs and their ability to mobilize local resources effectively.
  </p>
  <p className="mt-4">
    Another area of remarkable progress is the active participation of villagers in{" "}
    <strong>Gram Sabha meetings</strong>, which are critical for community-based planning and decision-making. 
    Increased attendance and the regular conduction of Gram Sabha meetings indicate improved governance and a 
    higher level of civic engagement. These meetings empower the community to voice their opinions, monitor 
    projects, and ensure transparency and accountability in local governance.
  </p>
  <p className="mt-4">
    This page presents an analytical view of these significant achievements, highlighting the progress 
    made in OSR collection and Gram Sabha performance, supported by dynamic, interactive graphs. Let’s 
    explore how these milestones are shaping the future of rural governance.
  </p>
</div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OSR Collection Section */}
        <div className="bg-white shadow-md rounded-lg">
          <div
            className="flex justify-between items-center bg-white shadow-sm p-4 cursor-pointer"
            onClick={() => toggleSection(0)}
          >
            <h2 className="text-[#004B86] text-xl font-semibold">
              Total Amount (₹) of OSR Collected in Project GPs
            </h2>
            {isOpen[0] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen[0] && (
            <div className="p-4">
              <Bar data={osrData} options={osrOptions} />
            </div>
          )}
        </div>

        {/* Gram Sabha Performance Section */}
        <div className="bg-white shadow-md rounded-lg">
          <div
            className="flex justify-between items-center bg-white shadow-sm p-4 cursor-pointer"
            onClick={() => toggleSection(1)}
          >
            <h2 className="text-[#004B86] text-xl font-semibold">
              Performance of Project GPs on Gram Sabhas
            </h2>
            {isOpen[1] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen[1] && (
            <div className="p-4">
              <Bar data={gramSabhaData} options={gramSabhaOptions} />
            </div>
          )}
        </div>
      </div>

      {/* Link to Detailed Achievements Page */}
  <div className="text-center mt-10">
        <a
          href="/kpi?tab=Localised+Sustainable+Goals"
          className="text-[#004B86] text-lg font-semibold hover:underline"
        >
          View Detailed Progress in KPIs & Indicaators
        </a>
      </div>
    </div>
    
  );
};

export default SignificantAchievements;
