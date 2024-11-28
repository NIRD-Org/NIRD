import {
  FaLightbulb,
  FaProjectDiagram,
  FaUsers,
  FaMapMarkedAlt,
} from "react-icons/fa";

const ProjectOverviewPage = () => {
  return (
    <div className="p-5 sm:px-10 md:px-20 lg:px-32 md:py-10 bg-gray-50">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-[#004B86] text-[3rem] font-extrabold leading-tight">
          Creating 250 Model GP Clusters
        </h1>
        <p className="text-[#4a90e2] text-lg font-medium mt-2">
          Transforming Gram Panchayats through innovation, governance, and
          sustainability.
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
          The project for <b>"Creating 250 Model GP Clusters"</b> is a response
          to these challenges. By developing models that showcase good
          governance, sustainability, and innovative practices, the project aims
          to inspire replication across India's vast network of GPs. The
          rationale focuses on enhancing institutional capacity while fostering
          localized solutions aligned with Sustainable Development Goals (SDGs).
        </p>
      </div>

      {/* Project Overview Section */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaProjectDiagram className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">
            Project Overview
          </h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The Ministry of Panchayati Raj (MoPR) launched this project under the
          Rashtriya Gram Swaraj Abhiyan (RGSA) to address critical governance
          challenges at the grassroots level. Covering 250 clusters of Gram
          Panchayats across 28 states and 3 union territories, the project
          provides professional mentoring, technical handholding, and
          institutional support to enable GPs to serve as sustainable models.
        </p>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          Initially scheduled for 2020–22, the project's implementation was
          delayed due to COVID-19 and later extended to 2026. This extension
          allows for continued guidance and refinement of thematic GPDPs, with a
          focus on holistic development and inclusive governance.
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
          Spanning a diverse range of geographic and demographic regions, the
          project ensures that selected clusters represent India's rural
          realities. Gram Panchayats were chosen based on:-
        </p>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>Population size (up to 30,000 individuals per cluster).</li>
          <li>Contiguity to facilitate collective action and governance.</li>
          <li>
            Inclusion in Mission Antyodaya clusters for holistic development.
          </li>
          <li>Alignment with watershed-based planning approaches.</li>
        </ul>
      </div>

      {/* Goals Section */}
      <div className="bg-white shadow-xl rounded-lg p-10 mb-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <FaUsers className="text-[#004B86] text-5xl mr-4" />
          <h2 className="text-[#004B86] text-2xl font-semibold">
            Goals and Objectives
          </h2>
        </div>
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The project aims to transform governance structures in Gram Panchayats
          by focusing on:
        </p>
        <ul className="list-disc px-10 py-4 text-md leading-relaxed text-gray-700">
          <li>
            Creating scalable and replicable models for sustainable governance.
          </li>
          <li>
            Strengthening institutional frameworks to support thematic GPDPs.
          </li>
          <li>
            Promoting SDG alignment through localized governance practices.
          </li>
          <li>
            Inspiring neighboring Gram Panchayats to adopt demonstrated best
            practices.
          </li>
        </ul>
        <p className="text-justify text-md leading-relaxed text-gray-700 mt-4">
          By 2026, the project envisions creating a network of high-performing
          Gram Panchayats that collectively contribute to India's rural
          development agenda.
        </p>
      </div>
    </div>
  );
};

export default ProjectOverviewPage;
