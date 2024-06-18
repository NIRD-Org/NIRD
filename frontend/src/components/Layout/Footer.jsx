import React from "react";

const Footer = () => {
  return (
    <div className="bg-primary text-white">
      <div className="flex flex-wrap justify-between items-center p-4">
        <div className="mb-4 lg:mb-0">
          <img
            src="/logo/LSDG Logo.png"
            alt="LSDGs Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex flex-1 justify-around text-center lg:text-left flex-wrap">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-md  md:font-semibold">
              Key Performance Indicators
            </h3>
          </div>
          <div className="mb-4 lg:mb-0">
            <h3 className="text-md  md:font-semibold">
              Low cost{" "}
              <a href="#" className="underline">
                Voluntary Activities
              </a>
            </h3>
          </div>
          <div className="mb-4 lg:mb-0">
            <h3 className="text-md  md:font-semibold">
              Training & Capacity Building
            </h3>
          </div>
          <div className="mb-4 lg:mb-0">
            <h3 className="text-md  md:font-semibold">
              Good Practices & Achievements
            </h3>
          </div>
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
