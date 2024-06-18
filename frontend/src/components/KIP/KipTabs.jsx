import React, { useEffect, useState } from "react";
import GpProfile from "./Tabs/GpProfile";
import Indicators from "./Tabs/Indicators";
import Ranking from "./Tabs/Ranking";
import { Link, useSearchParams } from "react-router-dom";

const KipTabs = ({ setTagline }) => {
  const [searchparams, setSearchParams] = useSearchParams();
  const tab = searchparams.get("tab") || "";

  useEffect(() => {
    if (!tab) {
      setSearchParams({ tab: "Localised Sustainable Goals" });
    }
  }, []);

  useEffect(() => {
    if (tab === "Localised Sustainable Goals") {
      setTagline(
        "Find data from 1016 Gram Panchayats across India and view indicators for 9 themes"
      );
    } else if (tab === "Institutional Strengthening") {
      setTagline(
        "Find data from 1016 Gram Panchayats across India and view indicators for Institutional Strengthening"
      );
    }
  }, [tab]);

  const tabs = [
    "Localised Sustainable Goals",
    "Institutional Strengthening",
    "Ranking",
  ];

  return (
    <div className="w-full ">
      <div className="flex px-10  lg:px-20 justify-center border-gray-200">
        {" "}
        <Link
          to="/gp-profile/details"
          className="px-4 py-3 text-sm text-gray-600 md:text-xl focus:outline-none"
        >
          Gram Panchayat Profile
        </Link>
        {tabs.map((t) => (
          <button
            key={t}
            className={`px-4 py-3 text-sm md:text-xl focus:outline-none ${
              tab === t
                ? "bg-primary text-white  font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => {
              setSearchParams({ tab: t });
            }}
          >
            {t}
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
        {tab === "Localised Sustainable Goals" && <GpProfile />}
        {tab === "Institutional Strengthening" && <Indicators />}
        {tab === "Ranking" && <Ranking />}
      </div>
    </div>
  );
};

export default KipTabs;
