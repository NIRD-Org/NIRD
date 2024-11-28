import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { FaUniversity,
  FaMoneyCheckAlt,
  FaGlobe,
  FaHospital,
  FaLeaf,
  FaHammer,
  
  FaHandshake,
  FaChartLine,FaUsers, FaBullhorn, FaChalkboardTeacher, FaHandsHelping, FaCogs, FaSeedling, FaHouseUser, FaHeartbeat, FaChild, FaTint, FaTree, FaIndustry, FaBalanceScale, FaHandHoldingHeart, FaFemale } from 'react-icons/fa';  // Using FontAwesome icons

function Home() {
  return (
    <div>
      {/* Small Banner */}
      <section className="relative bg-cover bg-center h-[40vh]">
        <img
          className="absolute w-full h-full object-cover"
          src="logo/soeprbanner.jpg"
          alt="Small Banner"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold">
            Empowering Panchayats, Enabling Progress <br /> 
            </h1>
            <p className="mt-4 text-sm md:text-lg">
            Advancing Holistic Development with Excellence
            </p>
            <Link
              to={"/project"}
              className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-900"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-8 bg-white">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-6">
          Nine Centres under SoEPR
        </h2>
        <div className="container mx-auto px-4">
          <SchoolCarousel />
        </div>
      </section>
      <section className="py-10 bg-cover bg-center relative" style={{ backgroundImage: 'url("logo/keygoals.jpg")' }}>
  {/* Overlay for better text visibility */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  <div className="container mx-auto px-4 text-center relative z-10">
    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
      Our Key Goals
    </h2>
    <p className="text-lg text-gray-200 mb-8">
      Dedicated to achieving <b>Comprehensive and Sustainable Development</b> through holistic strengthening of Panchayati Raj Institutions (PRIs) and inclusive governance.
    </p>

    {/* Key Goals Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaUniversity size={50} color="#4CAF50" />
        <h3 className="text-lg font-semibold mt-4">Centre of Excellence</h3>
        <p className="text-gray-600 mt-2">
          Establishing SoEPR as a National and Global Centre of Excellence in Panchayati Raj domains.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaChalkboardTeacher size={50} color="#E04811" />
        <h3 className="text-lg font-semibold mt-4">Capacity Building & Training</h3>
        <p className="text-gray-600 mt-2">
          Augmenting SIRDs with skilled resources for CB&T interventions to ensure quality outcomes.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaHandsHelping size={50} color="#0288D1" />
        <h3 className="text-lg font-semibold mt-4">Inclusive Development</h3>
        <p className="text-gray-600 mt-2">
          Enhancing PRIs' capacity to achieve economic development and social justice per Article 243G.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaSeedling size={50} color="#2E7D32" />
        <h3 className="text-lg font-semibold mt-4">Sustainability</h3>
        <p className="text-gray-600 mt-2">
          Promoting environmentally sustainable and resilient rural development initiatives.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaBullhorn size={50} color="#FF6F61" />
        <h3 className="text-lg font-semibold mt-4">Advocacy & Reforms</h3>
        <p className="text-gray-600 mt-2">
          Supporting Panchayat policy reforms, statistics, and advocacy for informed decision-making.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaGlobe size={50} color="#7F11E0" />
        <h3 className="text-lg font-semibold mt-4">Localization of SDGs</h3>
        <p className="text-gray-600 mt-2">
          Aligning PRI plans with the Sustainable Development Goals through integrated approaches.
        </p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

// Themes Links Component with Icons and Hyperlinks (Manually Scrollable)
const SchoolCarousel = () => {
  const centers = [
    { icon: <FaUniversity size={40} color="#46117C" />, title: "Centre for Panchayat Governance, e-Governance and Service Delivery" },
    { icon: <FaMoneyCheckAlt size={40} color="#E04811" />, title: "Centre for Panchayat Finance, Accounts & Audit" },
    { icon: <FaGlobe size={40} color="#F0BF4C" />, title: "Centre for Localization of SDGs, Integrated Panchayat Planning and Convergence" },
    { icon: <FaHospital size={40} color="#3B9AE1" />, title: "Centre for Public Health, Sanitation and Infrastructure Development through Panchayats" },
    { icon: <FaLeaf size={40} color="#2E7D32" />, title: "Centre for Biodiversity, Environmental Upgradation and Built Environment through Panchayats" },
    { icon: <FaHammer size={40} color="#7F11E0" />, title: "Centre for Skilling & Economic Development through Panchayats" },
    { icon: <FaChild size={40} color="#11DCE0" />, title: "Centre for Social Development (Health, Education, Women & Children) through Panchayats" },
    { icon: <FaHandshake size={40} color="#8DE12D" />, title: "Centre for Conflict Management & Dispute Resolution through Panchayats" },
    { icon: <FaChartLine size={40} color="#F06292" />, title: "Centre for Panchayat Statistics, Panchayat Policy Reforms and Advocacy" },
  ];

  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (carousel) {
        if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
          // Reset to the start when reaching the end
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll to the next set of items
          carousel.scrollBy({ left: 500, behavior: "smooth" });
        }
      }
    }, 4000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      ref={carouselRef}
      className="flex overflow-x-auto space-x-6 pb-4 themes-carousel scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100"
    >
      {centers.map((theme, index) => (
        <div key={index} className="flex-shrink-0 w-[calc(33.3333%-16px)] px-2 flex justify-center items-center">
          <Link
            to={theme.link}
            className="flex flex-col items-center text-lg font-semibold"
            style={{ color: theme.icon.props.color }}
          >
            {theme.icon}
            <p className="text-sm mt-2">{theme.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};


export default Home;
