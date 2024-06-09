import React, { useState } from "react";
import GpProfile from "./Tabs/GpProfile";
import Indicators from "./Tabs/Indicators";
import Ranking from "./Tabs/Ranking";

const KipTabs = () => {
  const [activeTab, setActiveTab] = useState("GP Profile");

  const tabs = ["GP Profile", "Indicators", "Ranking"];

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 focus:outline-none ${
              activeTab === tab
                ? "border-b-4 border-orange-500 text-black font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "GP Profile" && <GpProfile />}
        {activeTab === "Indicators" && <Indicators />}
        {activeTab === "Ranking" && <Ranking />}
      </div>
    </div>
  );
};

export default KipTabs;
