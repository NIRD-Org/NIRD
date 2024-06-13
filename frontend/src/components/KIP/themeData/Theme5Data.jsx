import React from "react";
import StaticChart from "../charts/StaticChart";

const kpiData = [
  {
    id: 1,
    logo: "/theme2/Picture1.jpg",
    description:
      "No. of meetings conducted by the Village Water and Sanitation Committee (VWSC)/ Paani Samitis",
    chartType: "Pie",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 2,
    logo: "/theme2/Picture2.jpg",
    description:
      "If the GP has been declared as ODF Plus Model, whether third party verification also was done by inter-Block/District Teams after self-declaration",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 3,
    logo: "/theme2/Picture3.gif",
    description:
      "Whether Operation and Maintenance of Solid & Liquid Waste Management (SLWM) assets was being carried out by Gram Panchayat during Appraisal Year? ",
    chartType: "Line",
    countryPercentage: "17",
    statePercentage: "11",
    gpPercentage: "3",
  },
  {
    id: 4,
    logo: "/theme2/Picture4.jpg",
    description:
      "Whether the Biodiversity Management Committee (BMC) of the GP maintain People’s Biodiversity Register ",
    chartType: "Pie",
    countryPercentage: "80",
    statePercentage: "70",
    gpPercentage: "60",
  },
  {
    id: 5,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of households in the GP received benefits under UJALA (Domestic Efficient Lighting Programme)/ Similar State/UT schemes",
    chartType: "Doughnut",
    countryPercentage: "90",
    statePercentage: "80",
    gpPercentage: "70",
  },
  {
    id: 6,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of BPL Households (as per BPL survey prevalent in State/UT) in the GP received deposit free LPG connections under the Pradhan Mantri Ujjwala Yojana (PMUY)/ Similar State/UT schemes ",
    chartType: "Polar",
    countryPercentage: "85",
    statePercentage: "75",
    gpPercentage: "65",
  },
  {
    id: 7,
    logo: "/theme2/Picture5.jpg",
    description:
      "No. of meetings were conducted by the Standing Committee / Sub Committee on Environment Preservation / Natural Resource Management of the GP",
    chartType: "Pie",
    countryPercentage: "55",
    statePercentage: "45",
    gpPercentage: "35",
  },
  {
    id: 8,
    logo: "/theme2/Picture5.jpg",
    description: "Percentage of solarized irrigation pumps created in the GP ",
    chartType: "Bar",
    countryPercentage: "65",
    statePercentage: "55",
    gpPercentage: "45",
  },
  {
    id: 9,
    logo: "/theme2/Picture1.jpg",
    description: "Percentage of solarized street lights created in the GP ",
    chartType: "Scatter",
    countryPercentage: "75",
    statePercentage: "65",
    gpPercentage: "55",
  },
  {
    id: 10,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of the total Budget of the GP allocated for Clean & Green Village in the GPDP ",
    chartType: "Bubble",
    countryPercentage: "95",
    statePercentage: "85",
    gpPercentage: "75",
  },
  {
    id: 11,
    logo: "/theme2/Picture11.jpg",
    description:
      "Percentage of OSR spent by the GP for clean and green village ",
    chartType: "Polar",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
];
const Theme5Data = ({ kpi }) => {
  return (
    <div className="px-4 py-16 md:px-10" id="Clean and Green Village">
      <h1 className="text-3xl mb-5 md:text-3xl font-semibold">
        Clean and Green Village
        <hr />
      </h1>
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {kpiData.map(
          ({
            id,
            logo,
            description,
            chartType,
            countryPercentage,
            gpPercentage,
            statePercentage,
          }) => (
            <div
              key={id}
              className="w-80 min-h-72 flex flex-col justify-between items-center h-auto border rounded"
            >
              <div className="rounded-sm bg-[#004B86] flex gap-5 justify-between items-center font-semibold">
                <img
                  src={logo}
                  alt="graph"
                  className="relative object-contain p-2 bg-white border rounded-lg left-2 top-3  w-20 h-20"
                />
                <p className="text-sm text-white">
                  {" "}
                  {description.slice(0, 60) + "..."}
                </p>
              </div>
              <div className="w-fit flex justify-center items-center">
                <StaticChart
                  countryPercentage={countryPercentage}
                  gpPercentage={gpPercentage}
                  statePercentage={statePercentage}
                  chartType={chartType}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Theme5Data;
