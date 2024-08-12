import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-primary text-white site-footer">
      <div className="flex flex-wrap justify-between items-center p-4">
        <div className="mb-4 lg:mb-0">
          <img
            src="/logo/LSDG Logo.png"
            alt="LSDGs Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex flex-1 justify-around text-center lg:text-left flex-wrap">
          <Link
            to="/kpi?tab=Localised+Sustainable+Goals"
            className="mb-4 lg:mb-0"
          >
            <h3 className="text-md  md:font-semibold">
              Key Performance Indicators
            </h3>
          </Link>
          <Link to="/low-cost-voluntary-activities" className="mb-4 lg:mb-0">
            <h3 className="text-md  md:font-semibold">
              Low Cost/No Cost Voluntary Activity
            </h3>
          </Link>
          <Link to={"/training"} className="mb-4 lg:mb-0">
            <h3 className="text-md  md:font-semibold">
              Training & Capacity Building
            </h3>
          </Link>
          <Link to={"/good-practices"} className="mb-4 lg:mb-0">
            <h3 className="text-md  md:font-semibold">
              Good Practices & Achievements
            </h3>
          </Link>
        </div>
      </div>
      <hr className="mt-4 border-gray-500" />
      <div className="p-4 bg-[#2968AC] text-gray-300 flex flex-col md:flex-row justify-between  text-left">
        <p className="mb-4 lg:mb-0">
          Legal Disclaimer:
          <br />
          This Website Belongs to NIRDPR © 2024. All rights reserved with
          National Institute of Rural Development & Panchayati Raj, Hyderabad.
        </p>
        <p>
          Contact us:
          <br />
          <a
            href="mailto:modelgpclusters.nird@gov.in"
            className="underline text-white"
          >
            modelgpclusters.nird@gov.in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
