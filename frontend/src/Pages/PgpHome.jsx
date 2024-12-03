import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUsers,
  FaBullhorn,
  FaHandsHelping,
  FaHouseUser,
  FaHeartbeat,
  FaChild,
  FaTint,
  FaTree,
  FaIndustry,
  FaBalanceScale,
  FaHandHoldingHeart,
  FaFemale,
} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
              Fostering Progress <br /> Through Good Governance in Villages
            </h1>
            <p className="mt-4 text-sm md:text-lg">
              Join us in enhancing lives through sustainable development and empowering communities across India.
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

      {/* Key Goals Section */}
      <section
        className="py-10 bg-cover bg-center relative"
        style={{ backgroundImage: 'url("logo/keygoals.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Our Key Goals</h2>
          <p className="text-lg text-gray-200 mb-6">
            This project aims to achieve <b>Comprehensive and Sustainable Development</b> by focusing on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GoalCard
              icon={<FaUsers size={50} color="#4CAF50" />}
              title="Institutional Strengthening"
              description="Strengthening the capabilities of Gram Panchayats (GPs) to implement sustainable projects effectively."
            />
            <GoalCard
              icon={<FaBullhorn size={50} color="#FF6F61" />}
              title="LSDG-Focused GPDP"
              description="Enabling thematic GPDP by providing mentoring, motivation, and professional support to create model GPs."
            />
            <GoalCard
              icon={<FaHandsHelping size={50} color="#0288D1" />}
              title="Mentoring & Motivation"
              description="Offering additional technical guidance to GPs and inspiring them to follow the project as a model."
            />
          </div>
        </div>
      </section>

      {/* OSR Graph and NGO Cards */}
      {/* OSR Graph and NGO Cards */}
<section className="py-10 bg-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-center text-2xl md:text-4xl font-bold mb-6">Project Analytics</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {/* OSR Graph */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Own Source Revenue (OSR) Trends</h3>
        <div className="w-full h-auto">
          <Line
            data={osrLineData}
            options={lineOptions}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>

      {/* NGO Cards */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">NGOs Associated with the Project</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ngoData.map((ngo, index) => (
            <NGOCard key={index} name={ngo.name} description={ngo.description} />
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Measuring Impact Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Measuring Our Impact and Progress</h2>
          <p className="text-lg text-gray-600 mb-6">
            Tracking our projects and results is a cornerstone of our work to become more transparent, accountable, and
            deliver impact that changes lives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactCards.map((impact, index) => (
              <ImpactCard
                key={index}
                icon={impact.icon}
                title={impact.title}
                value={impact.value}
                description={impact.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Additional Components
const ThemesCarousel = () => {
  const themes = [
    { icon: <FaHouseUser size={41} color="#46117C" />, title: "Poverty-free Village", link: "/Theme1" },
    { icon: <FaHeartbeat size={41} color="#E04811" />, title: "Healthy Village", link: "/Theme2" },
    { icon: <FaChild size={41} color="#F0BF4C" />, title: "Child-friendly Village", link: "/Theme3" },
    { icon: <FaTint size={41} color="#3B9AE1" />, title: "Water-sufficient Village", link: "/Theme4" },
    { icon: <FaTree size={41} color="#2E7D32" />, title: "Clean and Green Village", link: "/theme/5" },
    { icon: <FaIndustry size={41} color="#7F11E0" />, title: "Infrastructure in Village", link: "/theme/6" },
    { icon: <FaBalanceScale size={41} color="#11DCE0" />, title: "Socially Just Village", link: "/theme/7" },
    { icon: <FaHandHoldingHeart size={41} color="#8DE12D" />, title: "Good Governance Village", link: "/theme/8" },
    { icon: <FaFemale size={41} color="#F06292" />, title: "Women-friendly Village", link: "/theme/9" },
  ];

  const carouselRef = useRef(null);
  const [position, setPosition] = useState(0); // Track the current position (0: left, 1: center, 2: right)

  // Positions for scrolling
  const scrollPositions = [
    0, // Left
    Math.ceil((themes.length / 3) * 300), // Center
    Math.ceil((themes.length / 1.5) * 300), // Right
  ];

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % scrollPositions.length); // Cycle through positions
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll to the current position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollTo({ left: scrollPositions[position], behavior: "smooth" });
    }
  }, [position]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden space-x-6 pb-4 themes-carousel"
      >
        {themes.map((theme, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/5 px-2" // Show 5 themes at a time
          >
            <Link to={theme.link} className="flex flex-col items-center text-lg font-semibold">
              {theme.icon}
              <p className="text-sm mt-2 text-center">{theme.title}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Custom Scrollbar */}
      <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex space-x-4">
        {scrollPositions.map((_, index) => (
          <div
            key={index}
            onClick={() => setPosition(index)} // Manual scroll on click
            className={`w-4 h-4 rounded-full cursor-pointer ${
              position === index ? "bg-orange-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const GoalCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
    {icon}
    <h3 className="text-lg font-semibold mt-4">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

const NGOCard = ({ name, description }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
    <h3 className="text-lg font-semibold mb-2">{name}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const ImpactCard = ({ icon, title, value, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center h-[120px] flex flex-col justify-between group relative">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="text-lg font-bold mt-2">{value}</p>
    <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-xs">{description}</p>
    </div>
  </div>
);

// OSR Line Graph Data
const osrLineData = {
  labels: ["2021-22", "2022-23", "2023-24"],
  datasets: [
    {
      label: "Own Source Revenue (OSR) in ₹ Cr",
      data: [13, 15, 19],
      borderColor: "rgba(100, 255, 218, 1)",
      backgroundColor: "rgba(100, 255, 218, 0.2)",
      pointBorderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 0.8)",
      tension: 0.4,
      fill: true,
    },
  ],
};

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

const ngoData = [
  { name: "NGO 1", description: "Focused on education and capacity building." },
  { name: "NGO 2", description: "Specializes in health and sanitation projects." },
  { name: "NGO 3", description: "Promotes environmental sustainability." },
  { name: "NGO 4", description: "Works on rural infrastructure development." },
];

const impactCards = [
  {
    icon: "🏘️",
    title: "Number of GPs Covered",
    value: "1016",
    description: "Gram Panchayats (GPs) covered under the project.",
  },
  {
    icon: "🎓",
    title: "Community Training Programs",
    value: "1,200",
    description: "Training programs conducted for community empowerment.",
  },
  {
    icon: "🌱",
    title: "Environmental Initiatives",
    value: "150",
    description: "Environmental sustainability initiatives launched.",
  },
  {
    icon: "🚰",
    title: "Improved Access to Water",
    value: "50",
    description: "Access to clean water improved in rural areas.",
  },
  {
    icon: "🌾",
    title: "Agricultural Training",
    value: "100",
    description: "Training for farmers on sustainable practices.",
  },
  {
    icon: "💡",
    title: "Renewable Energy Projects",
    value: "30",
    description: "Solar and other renewable energy projects implemented.",
  },
  {
    icon: "💬",
    title: "Community Engagement",
    value: "5,000+",
    description: "Community members engaged in development initiatives.",
  },
  {
    icon: "📚",
    title: "Educational Resources",
    value: "500",
    description: "Educational materials distributed to schools.",
  },
];

export default PgpHome;
