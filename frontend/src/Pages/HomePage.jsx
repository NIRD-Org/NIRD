import React from "react";
import KipTabs from "../components/KIP/KipTabs";

const HomePage = () => {
  return (
    <div className="h-full px-10 py-8 lg:px-20 lg:py-12">
      <div className="flex flex-col md:flex-row justify-between pb-10 gap-10">
        <h1 className="text-4xl md:text-5xl font-bold lg:text-7xl text-[#004B86]">
          Key Performance Indicators
        </h1>
        <p className="text-sm md:text-xl lg:text-xl w-full md:w-1/2">
          Find data from 500 Aspirational Blocks across India and view
          indicators for various themes
        </p>
      </div>
      <div>
        <KipTabs />
      </div>
    </div>
  );
};

export default HomePage;
