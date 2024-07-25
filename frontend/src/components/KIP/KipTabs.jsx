import React, { useEffect, useState } from "react";
import GpProfile from "./Tabs/GpProfile";
import Indicators from "./Tabs/Indicators";
import Ranking from "./Tabs/Ranking";
import { Link, useSearchParams } from "react-router-dom";
import Achievement from "./Tabs/Achievement";
import GradientLine from "../GradientLine";

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
    "Achievements",
  ];

  return (
    <div className="w-full ">
      <div className="flex px-10 flex-col items-center sm:flex-row lg:px-20 justify-center border-gray-200">
        {" "}
        <Link
          to="/gp-profile/details"
          className="px-4 py-3 text-sm text-gray-600 md:text-lg focus:outline-none"
        >
          Gram Panchayat Profile
        </Link>
        {tabs.map((t) => (
          <button
            key={t}
            className={`px-4 py-3 text-sm md:text-lg focus:outline-none ${
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
        <Link
          to="/view/kpi"
          className="px-4 py-3 text-sm text-gray-600 md:text-lg focus:outline-none"
        >
          SOEPR
        </Link>
      </div>
      <GradientLine />

      <div className="mt-4">
        {tab === "Localised Sustainable Goals" && <GpProfile />}
        {tab === "Institutional Strengthening" && <Indicators />}
        {tab === "Ranking" && <Ranking />}
        {tab === "Achievements" && <Achievement />}
      </div>
    </div>
  );
};

export default KipTabs;
