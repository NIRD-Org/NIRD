import React from "react";
import StaticChart from "../charts/StaticChart";

const kpiData = [
  {
    id: 1,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of the registered/ eligible persons in the GP who have received benefits/ pension under National Social Assistance Programme (such as Indira Gandhi National Old Age Pension Scheme, Indira Gandhi National Widow Pension Scheme, Indira Gandhi National Disability Pension Scheme, Indira Gandhi National Family Benefit Scheme, Annapurna) as of Central Government or similar State/UT Government schemes",
    chartType: "Pie",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 2,
    logo: "/theme2/Picture2.jpg",
    description:
      "Percentage of differently-abled persons in the GP who have received assistive devices (wheel chairs, crutches, artificial limbs, walking sticks for blind etc.)",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 3,
    logo: "/theme2/Picture3.gif",
    description:
      "Percentage of senior citizens (above 60 years of age) in the GP who have received Physical Aids and Assisted-living Devices (Walking sticks/Elbow crutches, Walkers/Crutches, Tripods/ Quadpods, Hearing Aids, Wheelchair, Artificial Dentures, Spectacles) under the Rashtriya Vayoshri Yojana/other State-specific scheme.   ",
    chartType: "Line",
    countryPercentage: "17",
    statePercentage: "11",
    gpPercentage: "3",
  },
  {
    id: 4,
    logo: "/theme2/Picture4.jpg",
    description:
      "Percentage of differently-abled  persons in the GP received Unique Disability Identity Card (UDID) ",
    chartType: "Pie",
    countryPercentage: "80",
    statePercentage: "70",
    gpPercentage: "60",
  },
  {
    id: 5,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of persons received Ayushman Bharat Card under Pradhan Mantri Jan Arogya Yojana (PMJAY) (or similar card under other State specific schemes) in the GP during the MONTH?",
    chartType: "Doughnut",
    countryPercentage: "90",
    statePercentage: "80",
    gpPercentage: "70",
  },
  {
    id: 6,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of children (0-6 years), pregnant/ lactating mothers received benefits under the Integrated Child Development Scheme in the GP? ",
    chartType: "Polar",
    countryPercentage: "85",
    statePercentage: "75",
    gpPercentage: "65",
  },
  {
    id: 7,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of expenditure incurred by the GP out of the Budget for providing social assistance to persons such as old, widow, disabled etc. ",
    chartType: "Pie",
    countryPercentage: "55",
    statePercentage: "45",
    gpPercentage: "35",
  },
  {
    id: 8,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of OSR (including voluntary contribution) spent by the GP towards the upliftment of marginalized groups [SC/ST/ Women/ Destitute/Old/Senior Citizen/Divyangjan (People with Special Needs)] in the GP",
    chartType: "Bar",
    countryPercentage: "65",
    statePercentage: "55",
    gpPercentage: "45",
  },
];
const Theme7Data = ({ kpi }) => {
  return (
    <div
      className="px-4 py-16 md:px-10"
      id="Socially Just & Socially Secured Village"
    >
      <h1 className="text-3xl mb-5 md:text-3xl font-semibold">
        Socially Just & Socially Secured Village
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

export default Theme7Data;
