import React from 'react';
import { FaRegBuilding, FaChalkboardTeacher, FaGlobeAsia, FaHandshake, FaSeedling, FaBalanceScale, FaRegMoneyBillAlt, FaUsers, FaNetworkWired } from "react-icons/fa";

const SchoolsOfExcellencePage = () => {
  const centers = [
    {
      icon: <FaRegBuilding className="text-red-500 text-5xl" />,
      title: "Governance and Policy",
      description: "Focuses on improving governance structures and policy frameworks to enhance the effectiveness of Panchayats."
    },
    {
      icon: <FaChalkboardTeacher className="text-green-500 text-5xl" />,
      title: "Education and Training",
      description: "Dedicated to the training and development of Panchayat members to boost their administrative and operational capabilities."
    },
    {
      icon: <FaGlobeAsia className="text-blue-500 text-5xl" />,
      title: "Global Collaboration",
      description: "Encourages international partnerships to bring global best practices to local governance models."
    },
    {
      icon: <FaHandshake className="text-yellow-500 text-5xl" />,
      title: "Community Engagement",
      description: "Enhances community participation in governance through innovative engagement strategies."
    },
    {
      icon: <FaSeedling className="text-purple-500 text-5xl" />,
      title: "Environmental Governance",
      description: "Promotes sustainable practices within Panchayats to address environmental challenges."
    },
    {
      icon: <FaBalanceScale className="text-pink-500 text-5xl" />,
      title: "Legal and Regulatory",
      description: "Provides legal support and regulatory guidance to ensure compliance with national and state laws."
    },
    {
      icon: <FaRegMoneyBillAlt className="text-orange-500 text-5xl" />,
      title: "Financial Management",
      description: "Focuses on financial accountability and revenue generation for Panchayats."
    },
    {
      icon: <FaUsers className="text-teal-500 text-5xl" />,
      title: "Human Resources",
      description: "Aims to enhance HR practices within Panchayats to attract and retain talented individuals."
    },
    {
      icon: <FaNetworkWired className="text-gray-500 text-5xl" />,
      title: "Technology and Innovation",
      description: "Integrates modern technology solutions to streamline Panchayat operations and services."
    }
  ];

  return (
    <div className="p-5 sm:px-10 md:px-20 lg:px-32 md:py-10 bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-[#004B86] text-[3rem] font-extrabold leading-tight">
          Nine Schools of Excellence
        </h1>
        <p className="text-[#4a90e2] text-lg font-medium mt-2">
          Specializing in Various Domains of Panchayati Raj Governance
        </p>
      </div>

      {centers.map((center, index) => (
        <div key={index} className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            {center.icon}
            <h2 className="text-[#004B86] text-2xl font-semibold ml-4">{center.title}</h2>
          </div>
          <p className="text-justify text-md leading-relaxed text-gray-700">
            {center.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SchoolsOfExcellencePage;
