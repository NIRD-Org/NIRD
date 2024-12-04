import React from "react";

const Theme7Page = () => {
  return (
    <div className="p-6 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-[#004B86] text-[2.5rem] font-extrabold">
          Socially Just Village
        </h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Fostering equality, inclusivity, and social justice in rural communities.
        </p>
      </div>

      {/* Detailed Description */}
      <div className="mb-12">
        <p className="text-gray-700 text-md leading-relaxed text-justify">
          The <strong>Socially Just Village</strong> initiative aims to ensure equality and fairness for all
          members of rural communities, regardless of their caste, gender, religion, or socio-economic status. 
          The program addresses key challenges related to social inequities by promoting inclusive decision-making, 
          equal access to opportunities, and the eradication of discriminatory practices. By empowering marginalized 
          groups and fostering community solidarity, the initiative strengthens the social fabric and ensures that 
          every individual feels valued and respected.
        </p>
      </div>

      <div className="mb-12">
        <p className="text-gray-700 text-md leading-relaxed font-semibold mb-4">
          Key Focus Areas:
        </p>
        <ul className="list-disc pl-8 space-y-2">
          <li>
            Promoting equal representation of women, marginalized groups, and differently-abled individuals in local governance.
          </li>
          <li>
            Ensuring access to education, healthcare, and welfare schemes for all community members.
          </li>
          <li>
            Addressing social discrimination through community awareness programs and capacity-building workshops.
          </li>
          <li>
            Encouraging inclusive participation in economic activities and skill development initiatives.
          </li>
          <li>
            Strengthening the grievance redressal mechanisms to ensure justice and accountability in resolving community disputes.
          </li>
        </ul>
      </div>

      
    </div>
  );
};

export default Theme7Page;
