import React, { useState } from "react";

const sections = [
  {
    title: "Key Partners, Resources and Functionaries",
    content: (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-10">
          Key Partners and their Financial Contribution
        </h1>
        <div className="w-full md:w-1/2">
          <img src="/contri.png" alt="" className="w-full" />
        </div>
        <div className="my-2">
          <li>MoPR (HR & PM Cost under Central Component of RGSA: 41%)</li>
          <li>NIRDPR (CB&T of Project Staff and Nodal Officers: 10%)</li>
          <li>State RD&PR Departments/SIRDPRs (CB&T & other support: 49%)</li>
        </div>
      </div>
    ),
  },
  {
    title: "Key Project Functionaries",
    content: (
      <div>
        <li>PMU Officials managing the Project.</li>
        <li>
          State Programme Coordinators (1 to coordinate with 2-4 States/UTs)
        </li>
        <li>
          Young Fellows (1 per Cluster for Handholding Support to Project GPs)
        </li>
        <li>Beacon Panchayat Leaders to motivate GPs in 2 Clusters</li>
      </div>
    ),
  },
  {
    title: "Selection of 250 Model GP Clusters",
    content: (
      <div>
        <p className="text-lg mb-2 font-semibold">
          Rationale for Cluster Approach & Criteria for Selection of Project GPs
        </p>
        <p className="text-justify">
          The size of population of GPs varies widely across the country. Hence,
          Cluster approach is envisaged to have the benefit of optimal
          population size in selection of GPs for the Project, based more or
          less on the following criteria:
        </p>
        <div className="py-5">
          <li>Contiguity of the GPs</li>
          <li>Population of the GPs under each Cluster (up to 30000)</li>
          <li>Watershed of the GPs</li>
          <li>Enlistment as Mission Antyodaya GPs in Aspirational Districts</li>
        </div>
      </div>
    ),
  },
  {
    title: "Training & Capacity Building",
    content: (
      <div>
        <p className="text-lg mb-2 text-justify font-semibold">
          Capacity Building & Training of the Young Fellows & Other Project
          Staff under the Project for Creating Model GP Clusters
        </p>
        <p className="text-justify">
          The Young Fellows (YFs), State Programme Coordinators (SPC) and other
          Project Staff are imparted 2 weeks’ Induction Level Orientation in
          batches at NIRDPR. After six months or so, they are imparted 1 week’s
          Refresher Training in batches at NIRDPR every year. Besides, the SPCs
          and YFs are given several rounds of orientation intermittently by
          almost all the SIRDs with focus on the State initiatives for Panchayat
          strengthening and rural development. The senior Officers of the MoPR
          frequently address the Young Fellows, mainly online, on many issues
          including Localization of SDGs, Panchayat Development Index (PDI) and
          the Portals of the MoPR. NIRDPR orients the State Nodal Officers,
          District Panchayat Officers and Block Development Officers concerned
          on the Project objectives and activities both offline and online to
          motivate them to support the Project. NIRDPR also orients the Elected
          Representatives and functionaries of the Project GPs, mostly online
          and in hybrid mode, on Localization of SDGs, preparation of Thematic
          GPDP and PDI. Weekly and/or fortnightly calls with the SPCs and Young
          Fellows are organized by NIRDPR to clarify and resolve critical issues
          concerning the Project. A lot of Learning Materials and Operational
          Guidelines on the most important activities are regularly sent to the
          SPCs and Young Fellows, based on which they provide complementary
          training to the Project GPs for enhancing their capability.
        </p>
      </div>
    ),
  },
];
const ProjectPage = () => {
  const [expandedSectionIndex, setExpandedSectionIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedSectionIndex(expandedSectionIndex === index ? null : index);
  };

  return (
    <div className="p-5 sm:px-10 md:px-20 lg:px-32 md:py-10">
      <div className="space-y-4">
        <h1 className="my-8 font-semibold text-[#004B86] text-[2rem]">
          Rationale for the Project for Creating 250 Model GP Clusters{" "}
        </h1>
        <p>
          In spite of a lot of Capacity Building & Training initiatives in India
          through various programmes supported by the MoPR, Government of India,
          for example BRGF (Backward Regions Grant Fund) from 2007-08 to
          2012-13, RGPSA (Rajiv Gandhi Panchayat Sashaktikaran Abhiyan) from
          2012-13 and RGSA (Rashtriya Gram Swaraj Abhiyan) from 2018-19,
          institutional capacity of three-tier Panchayats, particularly Gram
          Panchayats (GP) still remains weak except in a few cases in a few
          States.
        </p>
        <p>
          Further, in spite of People’s Plan Campaign for GPDP from 2018 across
          India under the caption ‘Sabki Yojana Sabka Vikash’, very few GPs in
          the States were able to prepare quality GPDP.
        </p>
        <p>
          In order to find a solution to the above constraints, in 2020 the MoPR
          started supporting NIRDPR in implementation of a 2-year Project for
          Creating 250 Model GP Clusters covering about 1100 GPs across India.
          Subsequently, MoPR extended the Project for four more years viz.
          2022-26 i.e. for the tenure of revamped RGSA.
        </p>
        <p>
          The rationale of the Project is to create successful Models of GPs on
          Cluster basis to achieve institutional capacity of GPs and enablement
          of quality GPDP - so that the successes achieved by around 1000
          Project GPs can motivate other GPs to follow them as Models and
          achieve similar results.
        </p>
      </div>

      <div>
        <h1 className="my-8 font-semibold text-[#004B86] text-[2rem]">
          Overview of the Project{" "}
        </h1>
        <p className="text-justify text-md text-wrap">
          In June 2020, the Ministry of Panchayati Raj (MoPR), Government of
          India, approved in favour of NIRDPR, Hyderabad a Project for Creating
          250 Model GP Clusters across India under Rashtriya Gram Swaraj Abhiyan
          (RGSA) for implementation over 2020-22. But mainly owing to COVID-19,
          the Project could be started in mid-October 2021, giving only five
          months and a half during 2020-22 for implementation of the activities.
          In June 2022, the MoPR approved extension of the tenure of the Project
          for 4 (four) more years – from 2022 to 2026. There are 250 Clusters
          covering 1016 GPs in 28 Sattes and 3 UTs (A&N Island, J&K, DNHD&D).
          The purpose of the Project is to create 250 demonstrable models of GP
          Clusters to achieve holistic and sustainable development through
          institutional strengthening of GPs and enablement of LSDG-Focused
          Thematic GPDP, by providing mentoring, motivation, technical guidance
          and professional handholding support through qualified Young Fellows
          in order to motivate other GPs to follow the Project GPs as models.
        </p>
      </div>

      <div>
        <h1 className="my-8 font-semibold text-[#004B86] text-[2rem]">
          Goal of the Project
        </h1>
        <p className="text-justify">
          To create demonstrable models of GP Clusters to achieve Comprehensive
          and Sustainable Development through-
          <ul className="px-10 py-5">
            <li className="list-disc">Institutional Strengthening of GPs</li>
            <li className="list-disc">Enablement of LSDG-Focused</li>
          </ul>
          Thematic GPDP by providing mentoring, motivation, additional technical
          guidance and professional Handholding Support in order to motivate
          other GPs to follow the Project GPs as models.
        </p>
      </div>

      <div>
        {sections.map((section, index) => (
          <div key={index}>
            <div className="flex gap-5 items-center justify-start">
              <h1 className="my-8 font-semibold text-[#004B86] text-[1.8rem]">
                {section.title}
              </h1>
              <button
                onClick={() => toggleExpand(index)}
                className="px-3 bg-[#004B86] py-0 text-white text-2xl font-bold rounded"
              >
                {expandedSectionIndex === index ? "↑" : "↓"}
              </button>
            </div>
            {expandedSectionIndex === index && section.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
