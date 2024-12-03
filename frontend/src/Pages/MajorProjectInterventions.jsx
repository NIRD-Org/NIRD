import React from "react";
import { FaRegLightbulb, FaUsers, FaTools, FaChartLine, FaHandHoldingHeart, FaClipboardList, FaBuilding, FaFlagCheckered, FaRecycle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MajorProjectInterventions = () => {
  return (
    <div className="p-6 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-[#004B86] text-[2.5rem] font-extrabold">
          Major Project Interventions
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Key interventions driving the success and sustainability of the project.
        </p>
      </div>

      {/* Key Interventions Section - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Row 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaRegLightbulb className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Implementation of Weekly Project Activities</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Project activities are based on weekly plans prepared by Young Fellows, supervised by State Programme Coordinators (SPCs).
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Stock-taking & Monitoring of Activities</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Stock-taking and monitoring of project activities is done monthly and quarterly by the PMU, based on Key Performance Indicators (KPIs).
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaUsers className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">CB&T for ERs on Institutional Strengthening</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Capacity Building and Training (CB&T) for ERs of GPs focuses on institutional strengthening for Thematic GPDPs, SDGs, and PDI measurement.
          </p>
        </div>

        {/* Row 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">At Least 6 Gram Sabhas Every Year</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Ensuring that at least 6 Gram Sabhas are conducted in every GP annually to enhance community participation in planning and decision-making.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaBuilding className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Ward Sabha, Mahila Sabha & Bal Sabha</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Conducting Ward Sabha, Mahila Sabha, and Bal Sabha before Gram Sabhas to ensure broad-based community engagement in GPDPs.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaHandHoldingHeart className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Economic Empowerment Through SHGs</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Promoting economic empowerment of women through Self-Help Groups (SHGs) as part of the project’s community-driven initiatives.
          </p>
        </div>

        {/* Row 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaFlagCheckered className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">GP-SHG Convergence and VPRP Integration</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Fostering convergence between GP-SHGs and integrating Village Poverty Reduction Plans (VPRP) into GPDPs for better development outcomes.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaRecycle className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Environmental Upgradation</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Communities are involved in environmental upgrades, including solid waste management and cleanliness drives as no-cost activities.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaTools className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">No-Cost Voluntary Activities (NCVAs)</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Encouraging communities to take part in No-Cost Voluntary Activities (NCVAs) to support GPDP implementation and local development.
          </p>
        </div>

        {/* Row 4 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Support for Education, Health & Nutrition</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Special support is being provided to communities in the areas of Education, Health, and Nutrition to improve overall well-being.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaFlagCheckered className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Evidence-based GPDPs</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Every GP prepares evidence-based, data-driven GPDPs, which are localized to meet the Sustainable Development Goals (SDGs).
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-100 transition-all">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-[#004B86] text-4xl mr-4" />
            <h3 className="text-[#004B86] text-xl font-semibold">Dashboard for Weekly Updates</h3>
          </div>
          <p className="text-gray-700 text-md leading-relaxed">
            Young Fellows document good practices and update the project’s achievements on a weekly basis through a centralized dashboard.
          </p>
        </div>
      </div>

      {/* Link to Detailed Achievements Page */}
      <div className="text-center mt-10">
        <Link
          to="/achievements"
          className="text-[#004B86] text-lg font-semibold hover:underline"
        >
          View Detailed Achievements and Interventions
        </Link>
      </div>
    </div>
  );
};

export default MajorProjectInterventions;
