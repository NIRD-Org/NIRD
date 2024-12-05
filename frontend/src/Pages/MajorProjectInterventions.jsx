import React from "react";
import { FaRegLightbulb, FaUsers, FaTools, FaChartLine, FaHandHoldingHeart, FaClipboardList, FaBuilding, FaFlagCheckered, FaRecycle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MajorProjectInterventionsPage = () => {
  return (
    <div className="p-6 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-[#004B86] text-[2.5rem] font-extrabold">
          Major Project Interventions
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
        Strategic Actions Aligned with the Project's Core Objectives
        </p>
      </div>

      {/* Key Themes Section - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Row 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaRegLightbulb className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Community Empowerment</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Empowering communities through active participation in decision-making, planning, and implementation of key initiatives.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Sustainable Development</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Fostering sustainable growth through practices that ensure long-term social, environmental, and economic well-being.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaUsers className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Inclusive Governance</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Ensuring that all community members, especially marginalized groups, have a voice in governance and policy-making.
          </p>
        </div>

        {/* Row 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Economic Opportunities</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Providing sustainable economic opportunities, particularly through self-help groups and local entrepreneurship.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaBuilding className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Infrastructure Development</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Developing the necessary physical infrastructure to support community growth, including roads, sanitation, and energy.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaHandHoldingHeart className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Health and Well-Being</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Promoting better health outcomes through improved access to healthcare services, sanitation, and nutrition.
          </p>
        </div>

        {/* Row 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaFlagCheckered className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Education and Skill Development</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Focusing on education, literacy, and skill development programs to prepare community members for a better future.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaRecycle className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Environmental Sustainability</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Encouraging environmentally sustainable practices, including waste management, water conservation, and renewable energy.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaTools className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Empowered Local Leadership</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Fostering empowered local leadership to drive positive change and ensure effective community governance and development.
          </p>
        </div>

        {/* Row 4 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Improved Access to Information</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Facilitating access to vital information through technology, media, and community-based platforms.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaFlagCheckered className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Monitoring and Evaluation</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Regular monitoring and evaluation to ensure that project activities align with goals and deliver the expected outcomes.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Data-Driven Decision Making</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Using data analytics to inform decision-making and ensure that interventions are responsive to community needs.
          </p>
        </div>
      </div>

      {/* Link to Detailed Themes Page */}
      <div className="text-center mt-10">
        <Link
          to="/themes"
          className="text-[#004B86] text-lg font-semibold hover:underline"
        >
          View Detailed Themes and Interventions
        </Link>
      </div>
    </div>
  );
};

export default MajorProjectInterventionsPage;
