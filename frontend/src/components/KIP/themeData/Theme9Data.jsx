import React from "react";
import StaticChart from "../charts/StaticChart";

const kpiData = [
  {
    id: 1,
    logo: "/theme2/Picture1.jpg",
    description: "No. of Mahila Sabhas conducted by the GP ",
    chartType: "Pie",
    countryPercentage: "88",
    statePercentage: "82",
    gpPercentage: "78",
  },
  {
    id: 2,
    logo: "/theme2/Picture2.jpg",
    description:
      "Percentage of girl children (6-18 years) are out of school in the GP ",
    chartType: "Bar",
    countryPercentage: "23",
    statePercentage: "12",
    gpPercentage: "5",
  },
  {
    id: 3,
    logo: "/theme2/Picture3.gif",
    description:
      "Percentage of girl children (0-5 years) recorded as underweight in the GP ",
    chartType: "Line",
    countryPercentage: "17",
    statePercentage: "11",
    gpPercentage: "3",
  },
  {
    id: 4,
    logo: "/theme2/Picture4.jpg",
    description:
      "Percentage of girl children (0-5 years) recorded as stunted in the GP ",
    chartType: "Pie",
    countryPercentage: "4",
    statePercentage: "2",
    gpPercentage: "1",
  },
  {
    id: 5,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of girl children (0-18 years) were recorded anaemic in the GP ",
    countryPercentage: "11",
    statePercentage: "5",
    gpPercentage: "2",
  },
  {
    id: 6,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of pregnant /lactating women (15-49 years) were anaemic in the GP  ",
    chartType: "Polar",
    countryPercentage: "6",
    statePercentage: "4",
    gpPercentage: "1",
  },
  {
    id: 7,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of women-headed households were covered under Ayushman Bharat/ Pradhan Mantri Jan Arogya Yojana (PMJAY)/ similar State Govt Health scheme /health insurance ",
    chartType: "Pie",
    countryPercentage: "78",
    statePercentage: "89",
    gpPercentage: "67",
  },
  {
    id: 8,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of registered women who received their cash benefit under Pradhan Mantri Matru Vandana Yojana (PMMVY)/similar state scheme/ ",
    chartType: "Bar",
    countryPercentage: "89",
    statePercentage: "76",
    gpPercentage: "78",
  },
  {
    id: 9,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of women belonging to BPL HHs (as per SECC 2011) who have become members of Self-Help Groups (SHGs) in the GP",
    chartType: "Scatter",
    countryPercentage: "54",
    statePercentage: "34",
    gpPercentage: "15",
  },
  {
    id: 10,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of the total Budget of the GP allocated for  women development-related activities in the GPDP ",
    chartType: "Bubble",
    countryPercentage: "95",
    statePercentage: "15",
    gpPercentage: "45",
  },
  {
    id: 11,
    logo: "/theme2/Picture11.jpg",
    description:
      "Percentage of OSR spent by the GP for implementing infrastructure-related activities",
    chartType: "Polar",
    countryPercentage: "80",
    statePercentage: "76",
    gpPercentage: "33",
  },
];
const Theme9Data = () => {
  return (
    <div className="px-4 py-16 md:px-10" id="Healthy Village">
      <h1 className="text-3xl mb-5 md:text-3xl font-semibold">
        Women Friendly Village
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

export default Theme9Data;
