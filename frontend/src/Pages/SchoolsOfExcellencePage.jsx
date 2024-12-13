import React from 'react';
import { FaSeedling, FaGlobe, FaTree, FaUsers, FaChartPie, FaHandsHelping, FaSchool, FaRecycle, FaCity } from "react-icons/fa";

const SchoolsOfExcellencePage = () => {
  const centers = [
    {
      icon: <FaGlobe className="text-red-500 text-5xl" />, 
      title: "Centre for Localization of SDGs, Integrated Panchayat Planning and Convergence", 
      description: "This center is committed to localizing Sustainable Development Goals (SDGs) by integrating them into Panchayat-level planning and governance. It focuses on fostering partnerships and ensuring that developmental initiatives are aligned with global and national objectives, while also addressing the specific needs of local communities." 
    },
    {
      icon: <FaTree className="text-green-500 text-5xl" />, 
      title: "Centre for Biodiversity, Environmental Upgradation and Built Environment through Panchayats", 
      description: "This center promotes environmental conservation and sustainable development within Panchayat jurisdictions. It advocates for biodiversity preservation, eco-friendly infrastructure development, and the adoption of practices that enhance environmental quality, ensuring a harmonious coexistence with nature." 
    },
    {
      icon: <FaUsers className="text-blue-500 text-5xl" />, 
      title: "Centre for Social Development (Health, Education, Women & Children) through Panchayats", 
      description: "Focusing on social welfare, this center aims to improve health, education, and social services, particularly for women and children. It empowers Panchayats to implement inclusive policies and programs that promote equitable social development and enhance the quality of life in rural areas." 
    },
    {
      icon: <FaChartPie className="text-yellow-500 text-5xl" />, 
      title: "Centre for Panchayat Statistics, Panchayat Policy Reforms and Advocacy", 
      description: "This center specializes in data-driven governance by providing statistical insights and supporting policy reforms for Panchayats. It advocates for evidence-based decision-making and ensures that Panchayat policies are well-informed, effective, and aligned with the broader goals of rural development." 
    },
    {
      icon: <FaHandsHelping className="text-orange-500 text-5xl" />, 
      title: "Centre for Community Empowerment and Inclusive Development", 
      description: "Dedicated to building capacities of marginalized communities, this center works to promote inclusivity in governance and development. It facilitates programs to empower vulnerable populations through awareness, skill-building, and active participation in governance processes." 
    },
    {
      icon: <FaSchool className="text-teal-500 text-5xl" />, 
      title: "Centre for Capacity Building and Knowledge Management", 
      description: "Focused on enhancing the skills and knowledge base of Panchayat members, this center offers comprehensive training and resources. It aims to strengthen governance through continuous learning and by fostering a culture of knowledge sharing." 
    },
    {
      icon: <FaRecycle className="text-purple-500 text-5xl" />, 
      title: "Centre for Sustainable Resource Management", 
      description: "This center guides Panchayats on sustainable resource utilization. By promoting renewable energy, efficient water usage, and waste management practices, it ensures ecological balance and resource sustainability at the local level." 
    },
    {
      icon: <FaCity className="text-pink-500 text-5xl" />, 
      title: "Centre for Urban and Rural Synergy", 
      description: "Bridging the urban-rural divide, this center fosters collaboration between urban and rural governance models. It focuses on shared growth strategies, infrastructure development, and effective utilization of resources across regions." 
    },
    {
      icon: <FaSeedling className="text-gray-500 text-5xl" />, 
      title: "Centre for Innovation in Agricultural Practices", 
      description: "Promoting sustainable and innovative agricultural methods, this center supports Panchayats in enhancing productivity and ensuring food security. It emphasizes modern techniques, organic farming, and farmer education." 
    }
  ];

  return (
    <div className="p-5 sm:px-10 md:px-20 lg:px-32 md:py-10 bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-[#004B86] text-[3rem] font-extrabold leading-tight">
          Centres of Excellence
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
