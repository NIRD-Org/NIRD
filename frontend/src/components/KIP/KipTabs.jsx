import React, { useEffect, useState } from "react";
import GpProfile from "./Tabs/GpProfile";
import Indicators from "./Tabs/Indicators";
import Ranking from "./Tabs/Ranking";

const KipTabs = ({ setTagline }) => {
  const [activeTab, setActiveTab] = useState("Localised Sustainable Goals");

  useEffect(() => {
    if (activeTab === "Localised Sustainable Goals") {
      setTagline(
        "Find data from 1016 Gram Panchayats across India and view indicators for 9 themes"
      );
    } else if (activeTab === "Institutional Strengthening") {
      setTagline(
        "Find data from 1016 Gram Panchayats across India and view indicators for Institutional Strengthening"
      );
    }
  }, [activeTab]);

  const tabs = ["Localised Sustainable Goals", "Institutional Strengthening"];

  return (
    <div className="w-full ">
      <div className="flex px-10 lg:px-20 justify-center border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 focus:outline-none ${
              activeTab === tab
                ? "bg-gray-100 text-black font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        class="w-full h-1"
        style={{
          background:
            "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff1493, #00ced1)",
        }}
      ></div>

      <div className="mt-4">
        {activeTab === "Localised Sustainable Goals" && <GpProfile />}
        {activeTab === "Institutional Strengthening" && <Indicators />}
      </div>
    </div>
  );
};

export default KipTabs;
