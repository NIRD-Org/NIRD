import {
  FaLightbulb,
  FaProjectDiagram,
  FaUsers,
  FaMapMarkedAlt,
} from "react-icons/fa";

const ProjectOverviewPage = () => {
  const fileUrl = "https://nirdprbucket.s3.ap-south-1.amazonaws.com/List+of+250+Clusters+for+PCMGPCs+++as+on+25.01.2024.pdf"; // Public URL for the PDF

  return (
    <div className="p-5 sm:px-10 md:px-20 lg:px-32 md:py-10 bg-gray-50">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-[#004B86] text-[3rem] font-extrabold leading-tight">
          Creating 250 Model GP Clusters Across India
        </h1>
        <p className="text-[#4a90e2] text-lg font-medium mt-2">
          Transforming Gram Panchayats through Innovation, Governance, and
          Sustainability.
        </p>
      </div>

      {/* Background Section */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaProjectDiagram className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Background</h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          In March 2020, the Ministry of Panchayati Raj (MoPR) advised the
          National Institute of Rural Development and Panchayati Raj (NIRDPR) to
          design and implement a project aimed at creating 250 Model GP Clusters
          across India. These clusters include 1100 Gram Panchayats, selected
          across all states and union territories.
        </p>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          The project received an initial funding of Rs. 15.54 Crore for the
          first year (2020-21), but the implementation was delayed due to the
          COVID-19 pandemic. By October 2021, work began in 157 clusters
          covering 674 GPs. The project was later extended for four more years
          (2022-2026) to continue its momentum and impact.
        </p>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          The project aims to build institutional capacity at the Gram
          Panchayat level, fostering the creation of high-quality GPDPs that
          align with the vision of holistic and sustainable development. Young
          Fellows play a critical role in mentoring, providing technical
          support, and facilitating the integration of key governance
          practices.
        </p>
      </div>

      {/* Rationale Section */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaLightbulb className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">Rationale</h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The institutional capacity of Gram Panchayats (GPs) across India has
          long been a challenge despite multiple interventions through programs
          like BRGF, RGPSA, and RGSA. These programs have highlighted the need
          for focused efforts to empower GPs, enabling them to address
          development challenges effectively. Quality GPDP preparation remains a
          significant gap, limiting the impact of rural development initiatives.
        </p>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          The <b>"Creating 250 Model GP Clusters"</b> project addresses these
          challenges by developing demonstrable models of good governance,
          sustainability, and innovative practices. The project focuses on
          empowering Gram Panchayats (GPs) to prepare and implement high-quality
          Gram Panchayat Development Plans (GPDPs) aligned with Sustainable
          Development Goals (SDGs). By showcasing these models, the project
          aims to inspire replication across the country, ultimately enhancing
          the capacity of GPs to achieve comprehensive and sustainable
          development.
        </p>
      </div>

      {/* Goals and Objectives Section */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaUsers className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">
            Goals and Objectives
          </h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The <b>"Creating 250 Model GP Clusters"</b> project is designed to
          transform governance at the grassroots level by achieving the
          following goals and objectives:
        </p>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>
            Creating scalable and replicable models for sustainable governance
            at the Gram Panchayat level.
          </li>
          <li>
            Strengthening institutional frameworks to support the preparation
            and implementation of thematic GPDPs focused on sustainable
            development.
          </li>
          <li>
            Aligning governance practices with the Sustainable Development
            Goals (SDGs) to promote holistic and inclusive development.
          </li>
          <li>
            Inspiring neighboring Gram Panchayats to adopt demonstrated best
            practices in governance and development.
          </li>
        </ul>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          By 2026, the project aims to create a network of high-performing
          Gram Panchayats that will contribute to India's rural development
          agenda, paving the way for other GPs to follow the model set by these
          250 clusters.
        </p>
      </div>

      {/* Geographic Coverage Section */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaMapMarkedAlt className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">
            Geographic Coverage
          </h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The project spans a diverse range of geographic and demographic
          regions across India. It covers 250 clusters of Gram Panchayats in
          28 states and 3 union territories, with careful selection criteria
          to ensure representation of rural realities across different regions.
        </p>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>Population size of up to 30,000 individuals per cluster.</li>
          <li>Contiguity to facilitate collective action and governance.</li>
          <li>Inclusion in Mission Antyodaya clusters for holistic development.</li>
          <li>Alignment with watershed-based planning approaches.</li>
        </ul>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          These clusters are designed to create a conducive environment for
          participatory governance, sustainable development, and the
          preparation of quality GPDPs, providing a model for other Gram
          Panchayats to follow.
        </p>
      </div>

      {/* Download Button Section */}
      <div className="text-center mt-10">
        <a
          href={fileUrl}
          download
          className="bg-[#004B86] text-white py-2 px-6 rounded-md hover:bg-[#005f8c] transition-all"
        >
          Download PDF - List of 250 Clusters for PCMGPCs as on 25.01.2024
        </a>
      </div>
    </div>
  );
};

export default ProjectOverviewPage;
