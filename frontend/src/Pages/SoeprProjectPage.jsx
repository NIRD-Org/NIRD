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
        It is observed that overall performance of 3-tier Panchayats in most States/UTs is poor to moderate, except in a few cases, because of lack of adequate devolution and low to moderate capacity in Panchayats. 
Most of the SIRDs/SPRCs do not have adequate Human Resources, to be able to outreach to around 31.5 lakh Elected Representatives and around 30 lakh functionaries.
The SoEPR is expected to augment the efforts of RGSA by providing holistic knowledge base and systematic capacity development of Panchayats.
<br/><br/><b>The SoEPR has been conceived of mainly  </b><br/>
<ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
<li>To create a body of knowledge at the National level with support from domain experts </li>
 <li>To  provide additional Human Resources to SIRDs/SPRCs for widespread dissemination of knowledge and for better outreach to the Panchayats</li>  
 <li>To provide support to professionalise management and administration of Panchayats</li> </ul>
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
          <li>Creating and disseminating knowledge in Panchayat governance</li>
          <li>Providing mentoring and consultancy to enhance Panchayat performance</li>
          <li>Supporting capacity building and training through SIRDs/SPRCs</li>
          <li>Encouraging the adoption of sustainable practices aligned with SDGs</li>
        </ul>
      </div>
      {/* Major Achievements Expected */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaAward className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Major Achievements Expected</h2>
        </div>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>Development of a strong body of knowledge on rural local governance and dissemination of the same to all concerned stakeholders.</li>
          <li>Expanded vision of the Panchayati Raj Departments/Directorates and their proactive roles in supporting PRIs to function effectively.</li>
          <li>Attainment of capability by SIRDPRs and other training institutions to deliver efficiently, resulting in attainment of capability by the ERs and functionaries of PRIs.</li>
          <li>Institutional strengthening of PRIs to grow and function as institutions of self-government and good governance.</li>
          <li>Strong resource base in PRIs through augmented Own Source Revenue.</li>
          <li>Improved service delivery by PRIs to citizens through effective e-Governance.</li>
          <li>Data-driven, evidence-based, multi-sectoral, Localized SDG-focused, Theme-based & convergent GPDP, BPDP & DPDP and synergy among them.</li>
          <li>Skilling of the poor and vulnerable sections and their economic development through expanded livelihood opportunities.</li>
          <li>Equity, social justice and inclusiveness in functioning of PRIs.</li>
          <li>Transparency in functioning of PRIs and their enhanced accountability to citizens.</li>
          <li>Access of all citizens to safe drinking water, sanitation and improved infrastructure.</li>
          <li>Environmental upgradation and maintenance of upgraded environment including built environment through PRIs.</li>
          <li>Improvement in community health care management and quality of education through focused Human Development measures.</li>
          <li>Social consciousness, dispute resolution & harmony among citizens through PRIs.</li>
          <li>Need-based Policy Reforms in Panchayat Acts, Rules, Regulations etc. by the States/UTs for significant devolution on PRIs and their growth as institutions of self-government.</li>
        </ul>
      </div>

      {/* Human Resources */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaUsers className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Human Resources</h2>
        </div>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>1 Deputy Director General, SoEPR (to be in exclusive charge of SoEPR).</li>
          <li>1 Director, SoEPR.</li>
          <li>2 Associate Professors (to oversee the functioning of 9 new Centres).</li>
          <li>9 Assistant Professors.</li>
          <li>18 Consultants with profound work experience and in-depth understanding about Panchayat functioning + 2 Consultants for IT & MIS.</li>
          <li>1 Accounts Officer; 3 Accounts Staff; 3 Training Managers; 5 Technical Personnel in AV Lab; 1 Project Assistant; and 5 Multi-Task Assistants.</li>
        </ul>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          Thus, there would be a total number of 51 Staff in the School Component of the SoEPR at NIRDPR. The main job of the Consultants & Faculty at School Level will be to create KNOWLEDGE in different domains of Panchayati Raj system for dissemination to Panchayats.
        </p>
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
