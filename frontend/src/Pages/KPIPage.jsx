import React, { useState } from "react";
import KipTabs from "../components/KIP/KipTabs";

const KPIPage = () => {
  const [tagline, setTagline] = useState(
    "Find data from 1016 Gram Panchayats across India and view indicators for 9 themes"
  );
  return (
    <>
      <div className="h-full relative px-10 pt-8 lg:px-20 lg:pt-12 bg-gray-100">
        <div className="relative flex flex-col md:flex-row justify-between pb-10 gap-10">
          <h1 className="text-4xl md:text-5xl font-bold lg:text-6xl text-[#004B86]">
            Key Performance Indicators
          </h1>
          <p className="text-sm md:text-xl lg:text-xl w-full md:w-1/2">
            {tagline}
          </p>
          <div className="absolute right-0 top-1/3 ">
            <img src="/logo/nirdpr.png" className="opacity-50 w-28" alt="" />
          </div>
        </div>
      </div>

      <div>
        <KipTabs setTagline={setTagline} />
      </div>
    </>
  );
};

export default KPIPage;
