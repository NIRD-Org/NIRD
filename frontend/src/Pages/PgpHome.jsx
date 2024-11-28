import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { FaUsers, FaBullhorn, FaChalkboardTeacher, FaHandsHelping, FaCogs, FaSeedling, FaHouseUser, FaHeartbeat, FaChild, FaTint, FaTree, FaIndustry, FaBalanceScale, FaHandHoldingHeart, FaFemale } from 'react-icons/fa';  // Using FontAwesome icons

function PgpHome() {
  return (
    <div>
      {/* Small Banner */}
      <section className="relative bg-cover bg-center h-[40vh]">
        <img
          className="absolute w-full h-full object-cover"
          src="logo/banner.png"
          alt="Small Banner"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold">
            Fostering Progress  <br /> Through Good Governance in Villages
            </h1>
            <p className="mt-4 text-sm md:text-lg">
              Join us in enhancing lives through sustainable development and
              empowering communities across India.
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

      {/* Themes Section */}
      <section className="py-8 bg-white">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-6">
          Explore Themes Related to the Project
        </h2>
        <div className="container mx-auto px-4">
          <ThemesCarousel />
        </div>
      </section>
      <section className="py-10 bg-cover bg-center relative" style={{ backgroundImage: 'url("logo/keygoals.jpg")' }}>
  {/* Overlay for text visibility */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  <div className="container mx-auto px-4 text-center relative z-10">
    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
      Our Key Goals
    </h2>
    <p className="text-lg text-gray-200 mb-6">
      This project aims to achieve <b>Comprehensive and Sustainable Development</b> by focusing on:
    </p>

    {/* Key Goals Representation */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaUsers size={50} color="#4CAF50" />
        <h3 className="text-lg font-semibold mt-4">Institutional Strengthening</h3>
        <p className="text-gray-600 mt-2">
          Strengthening the capabilities of Gram Panchayats (GPs) to implement sustainable projects effectively.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaBullhorn size={50} color="#FF6F61" />
        <h3 className="text-lg font-semibold mt-4">LSDG-Focused GPDP</h3>
        <p className="text-gray-600 mt-2">
          Enabling thematic GPDP by providing mentoring, motivation, and professional support to create model GPs.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <FaHandsHelping size={50} color="#0288D1" />
        <h3 className="text-lg font-semibold mt-4">Mentoring & Motivation</h3>
        <p className="text-gray-600 mt-2">
          Offering additional technical guidance to GPs and inspiring them to follow the project as a model.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* OSR Graph and NGO Cards */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-6">
            Project Analytics
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* OSR Graph */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Own Source Revenue (OSR) Trends</h3>
              <Line data={osrLineData} options={lineOptions} />
            </div>

            {/* NGO Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">NGOs Associated with the Project</h3>
              <div className="grid grid-cols-2 gap-4">
                {ngoData.map((ngo, index) => (
                  <NGOCard key={index} name={ngo.name} description={ngo.description} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> {/* Measuring Impact Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Measuring Our Impact and Progress
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Tracking our projects and results is a cornerstone of our work to
            become more transparent, accountable, and deliver impact that
            changes lives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ImpactCard
              icon="🏘️"
              title="Number of GPs Covered"
              value="1016"
              description="Gram Panchayats (GPs) covered under the project."
            />
            <ImpactCard
              icon="🎓"
              title="Community Training Programs"
              value="1,200"
              description="Training programs conducted for community empowerment."
            />
            <ImpactCard
              icon="🌱"
              title="Environmental Initiatives"
              value="150"
              description="Environmental sustainability initiatives launched."
            />
            <ImpactCard
              icon="🚰"
              title="Improved Access to Water"
              value="50"
              description="Access to clean water improved in rural areas."
            />
            <ImpactCard
              icon="🌾"
              title="Agricultural Training"
              value="100"
              description="Training for farmers on sustainable practices."
            />
            <ImpactCard
              icon="💡"
              title="Renewable Energy Projects"
              value="30"
              description="Solar and other renewable energy projects implemented."
            />
            <ImpactCard
              icon="💬"
              title="Community Engagement"
              value="5,000+"
              description="Community members engaged in development initiatives."
            />
            <ImpactCard
              icon="📚"
              title="Educational Resources"
              value="500"
              description="Educational materials distributed to schools."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Themes Links Component with Icons and Hyperlinks (Manually Scrollable)
const ThemesCarousel = () => {
  const themes = [
    { icon: <FaHouseUser size={40} color="#46117C" />, title: "Poverty-free village and enhanced livelihood village", link: "/theme/1" },
    { icon: <FaHeartbeat size={40} color="#E04811" />, title: "Healthy village", link: "/theme/2" },
    { icon: <FaChild size={40} color="#F0BF4C" />, title: "Child-friendly village", link: "/theme/3" },
    { icon: <FaTint size={40} color="#3B9AE1 " />, title: "Water-sufficient village", link: "/theme/4" },
    { icon: <FaTree size={40} color="#2E7D32" />, title: "Clean and Green village", link: "/theme/5" },
    { icon: <FaIndustry size={40} color="#7F11E0" />, title: "Self-sufficient infrastructure in village", link: "/theme/6" },
    { icon: <FaBalanceScale size={40} color="#11DCE0" />, title: "Socially just and socially secured village", link: "/theme/7" },
    { icon: <FaHandHoldingHeart size={40} color="#8DE12D" />, title: "Village with Good Governance", link: "/theme/8" },
    { icon: <FaFemale size={40} color="#F06292" />, title: "Women-friendly village", link: "/theme/9" },
  ];

  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (carousel) {
        if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
          // Reset to the start when reaching the end
          carousel.scrollTo({ left: 10, behavior: "smooth" });
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
      {themes.map((theme, index) => (
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
// Impact Card Component
const ImpactCard = ({ icon, title, value, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center h-[120px] flex flex-col justify-between group relative">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="text-lg font-bold mt-2">{value}</p>
    {/* Hidden description, shown on hover */}
    <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-xs">{description}</p>
    </div>
  </div>
);

// NGO Card Component
const NGOCard = ({ name, description }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
    <h3 className="text-lg font-semibold mb-2">{name}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// OSR Line Graph Data
const osrLineData = {
  labels: ["2021-22", "2022-23", "2023-24"],
  datasets: [
    {
      label: "Own Source Revenue (OSR) in ₹ Cr",
      data: [13, 15, 19],
      borderColor: "rgba(100, 255, 218, 1)",  // Light Green
      backgroundColor: "rgba(100, 255, 218, 0.2)",  // Light Green Background
      pointBorderColor: "rgba(255, 99, 132, 1)", // Red
      pointBackgroundColor: "rgba(255, 99, 132, 0.8)", // Red
      tension: 0.4, // Smooth curve
      fill: true,
    },
  ],
};

// Line Graph Options
const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ₹${context.raw} Cr`,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Financial Year",
      },
    },
    y: {
      title: {
        display: true,
        text: "OSR in ₹ Crore",
      },
      ticks: {
        callback: (value) => `₹${value} Cr`,
      },
    },
  },
};

// NGO Data
const ngoData = [
  { name: "NGO 1", description: "Focused on education and capacity building." },
  { name: "NGO 2", description: "Specializes in health and sanitation projects." },
  { name: "NGO 3", description: "Promotes environmental sustainability." },
  { name: "NGO 4", description: "Works on rural infrastructure development." },
];

export default PgpHome;
