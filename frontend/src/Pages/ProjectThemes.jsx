import React from "react";
import { Link } from "react-router-dom";

const ThemesPage = () => {
  const themes = [
    { id: 1, name: "Poverty-Free and Enhanced Livelihoods Village", link: "/theme1" },
    { id: 2, name: "Healthy Village", link: "/theme2" },
    { id: 3, name: "Child-Friendly Village", link: "/theme3" },
    { id: 4, name: "Water-Sufficient Village", link: "/theme4" },
    { id: 5, name: "Clean and Green Village", link: "/theme5" },
    { id: 6, name: "Village with Self-Sufficient Infrastructure", link: "/theme6" },
    { id: 7, name: "Socially Just Village", link: "/theme7" },
    { id: 8, name: "Village with Good Governance", link: "/theme8" },
    { id: 9, name: "Women-Friendly Village", link: "/theme9" },
  ];

  return (
    <div className="p-6 bg-gray-50">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-[#004B86] text-[2.5rem] font-extrabold">Thematic Interventions</h1>
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          This project aims to transform Gram Panchayats (GPs) into model villages by addressing critical areas
          of rural development. The interventions are strategically categorized into 9 themes, each focusing on
          specific aspects such as poverty alleviation, health, education, water sufficiency, and women's empowerment.
          By leveraging these thematic areas, the initiative drives holistic and sustainable development across the GPs.
        </p>
      </div>

      {/* Themes Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Link
            to={theme.link}
            key={theme.id}
            className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition-all"
          >
            <h2 className="text-[#004B86] text-xl font-semibold">{theme.name}</h2>
            <p className="mt-2 text-gray-600">
              Explore the initiatives and achievements under the <strong>{theme.name}</strong>.
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThemesPage;
