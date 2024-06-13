import React from "react";
import StaticChart from "../charts/StaticChart";

const kpiData = [
  {
    id: 1,
    logo: "/theme2/Picture1.jpg",
    description:
      "No. of meetings conducted by the Village Water & Sanitation Committee (VWSC)/ Paani Samitis or any related Standing Committee as per JJM guidelines",
    chartType: "Pie",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 2,
    logo: "/theme2/Picture2.jpg",
    description:
      "Whether the Village Water & Sanitation Committee (VWSC) prepared the Village Action Plan of 2023-24",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 3,
    logo: "/theme2/Picture3.gif",
    description:
      "Percentage of HHs having Tap Water Connection in the GP (as per Jal Jeevan Mission) ",
    chartType: "Line",
    countryPercentage: "17",
    statePercentage: "11",
    gpPercentage: "3",
  },
  {
    id: 4,
    logo: "/theme2/Picture4.jpg",
    description:
      "Percentage of institutions (Schools, Anganwadi centres, GP buildings, Health centres, wellness centres and community buildings etc.) located in the GP having access to Tap Water Connection ",
    chartType: "Pie",
    countryPercentage: "80",
    statePercentage: "70",
    gpPercentage: "60",
  },
  {
    id: 5,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of Houses/Public Building that are facilitated  with functional rooftop rain water harvesting structure",
    chartType: "Doughnut",
    countryPercentage: "90",
    statePercentage: "80",
    gpPercentage: "70",
  },
  {
    id: 6,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of Houses/Public Building that are facilitated with  Grey water Management Structure",
    chartType: "Polar",
    countryPercentage: "85",
    statePercentage: "75",
    gpPercentage: "65",
  },
  {
    id: 7,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of households in the GPs in avail themselves of 65 LPCD (Litres Per Capita Per Day) water",
    chartType: "Pie",
    countryPercentage: "55",
    statePercentage: "45",
    gpPercentage: "35",
  },
  {
    id: 8,
    logo: "/theme2/Picture5.jpg",
    description:
      "Frequency of cleaning/chlorination of Storage Tanks done in the GP ",
    chartType: "Bar",
    countryPercentage: "65",
    statePercentage: "55",
    gpPercentage: "45",
  },
  {
    id: 9,
    logo: "/theme2/Picture1.jpg",
    description:
      "Whether the GP has taken initiatives on water quality testing using Field Test Kits ",
    chartType: "Scatter",
    countryPercentage: "75",
    statePercentage: "65",
    gpPercentage: "55",
  },
  {
    id: 10,
    logo: "/theme2/Picture1.jpg",
    description:
      "Whether the GP has discussed Water Conservation/Drought Management/related issues in Gram Sabha ",
    chartType: "Bubble",
    countryPercentage: "95",
    statePercentage: "85",
    gpPercentage: "75",
  },
  {
    id: 11,
    logo: "/theme2/Picture11.jpg",
    description:
      "Percentage of the total Budget of the GP allocated for implementing various poverty reduction & livelihood activities other than MGNREGS & NRLM",
    chartType: "Polar",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 12,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of OSR Spent by the GP to address various poverty reduction & livelihood activities in the GP ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
];
const Theme4Data = ({ kpi }) => {
  return (
    <div className="px-4 py-16 md:px-10" id="Water Sufficient Village">
      <h1 className="text-3xl mb-5 md:text-3xl font-semibold">
        Water Sufficient Village
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

export default Theme4Data;
