import React from 'react';
import { FaProjectDiagram, FaLightbulb, FaBullseye, FaUsers, FaAward } from "react-icons/fa";

const SoeprProjectPage = () => {
  return (
    <div className="p-5 sm:px-10 md:px-20 lg:px-32 md:py-10 bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-[#004B86] text-[3rem] font-extrabold leading-tight">
          School of Excellence in Panchayati Raj (SoEPR)
        </h1>
        <p className="text-[#4a90e2] text-lg font-medium mt-2">
          Enhancing Panchayat Performance through Knowledge, Innovation, and Support.
        </p>
      </div>

      {/* Project Details */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaProjectDiagram className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Project Details</h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The School of Excellence in Panchayati Raj (SoEPR) was established at NIRDPR to address the challenges faced by Panchayats across India. The initiative aims to enhance their capabilities through systematic knowledge creation, resource dissemination, and strategic support. It focuses on improving governance and administration for sustainable development.
        </p>
      </div>

      {/* Rationale */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaLightbulb className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Rationale</h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The performance of Panchayats has been hindered by insufficient devolution of powers and low institutional capacity. Most SIRDs/SPRCs lack the resources to effectively train and support Panchayats. The SoEPR was conceived to bridge these gaps by providing additional human resources, creating a body of knowledge, and supporting professional management of Panchayats.
        </p>
      </div>

      {/* Goals and Objectives */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaBullseye className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Goals and Objectives</h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The SoEPR aims to become a National and Global Centre of Excellence in rural governance. It serves as a think tank for MoPR and other stakeholders, focusing on:
        </p>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>Creating and disseminating knowledge in Panchayat governance.</li>
          <li>Providing mentoring and consultancy to enhance Panchayat performance.</li>
          <li>Supporting capacity building and training through SIRDs/SPRCs.</li>
          <li>Encouraging the adoption of sustainable practices aligned with SDGs.</li>
        </ul>
      </div>

      {/* Human Resources */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaUsers className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Human Resources</h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The SoEPR is supported by a robust team, including:
        </p>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>Deputy Director General and Director.</li>
          <li>9 Associate Professors overseeing 9 Centers.</li>
          <li>18 Consultants specializing in Panchayat functions.</li>
          <li>Additional support staff, including Accounts Officers and Training Managers.</li>
        </ul>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          At the SIRD/SPRC level, consultants provide localized support for capacity building and training under RGSA.
        </p>
      </div>

      {/* Expected Achievements */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaAward className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Expected Achievements</h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The SoEPR is expected to achieve significant milestones, such as:
        </p>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>Improved governance through evidence-based policies and practices.</li>
          <li>Enhanced capacity of PRIs for effective service delivery.</li>
          <li>Increased transparency and accountability in Panchayat functions.</li>
          <li>Development of localized SDG-focused GPDPs, BPDPs, and DPDPs.</li>
          <li>Improved quality of life through better health, education, and infrastructure.</li>
        </ul>
      </div>

      {/* Conclusion */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The School of Excellence in Panchayati Raj represents a transformative approach to rural governance, aiming to inspire a new era of empowered and sustainable Panchayats across India.
        </p>
      </div>
    </div>
  );
};

export default SoeprProjectPage;
