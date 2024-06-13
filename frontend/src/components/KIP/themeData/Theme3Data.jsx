import React from "react";
import StaticChart from "../charts/StaticChart";

const kpiData = [
  {
    id: 1,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of children (below 5 years of age) recorded underweight (weight-for-age) in the GP",
    chartType: "Pie",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 2,
    logo: "/theme2/Picture2.jpg",
    description:
      "Percentage of children (below 5 years of age) recorded stunted (height-for-age). ",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 3,
    logo: "/theme2/Picture3.gif",
    description:
      "Percentage of children (below 5 years of age) recorded  wasted (weight-for-height) in the GP ",
    chartType: "Line",
    countryPercentage: "17",
    statePercentage: "11",
    gpPercentage: "3",
  },
  {
    id: 4,
    logo: "/theme2/Picture4.jpg",
    description:
      "Percentage of children (0-6 years) fully vaccinated in the GP  ",
    chartType: "Pie",
    countryPercentage: "80",
    statePercentage: "70",
    gpPercentage: "60",
  },
  {
    id: 5,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of children (0-6 years) partially vaccinated in the GP ",
    chartType: "Doughnut",
    countryPercentage: "90",
    statePercentage: "80",
    gpPercentage: "70",
  },
  {
    id: 6,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of children (6-59 months) recorded anaemic (<11.0 g/dl) in the GP  ",
    chartType: "Polar",
    countryPercentage: "85",
    statePercentage: "75",
    gpPercentage: "65",
  },
  {
    id: 7,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of HHs Having  Nutri-Gardens or Poshan Vatikas created in the GP",
    chartType: "Pie",
    countryPercentage: "55",
    statePercentage: "45",
    gpPercentage: "35",
  },
  {
    id: 8,
    logo: "/theme2/Picture5.jpg",
    description:
      "No. of Play area with facilities for both indoor and outdoor activities created for children in the GP  ",
    chartType: "Bar",
    countryPercentage: "65",
    statePercentage: "55",
    gpPercentage: "45",
  },
  {
    id: 9,
    logo: "/theme2/Picture1.jpg",
    description: "No. of e-library or library created  in the GP. ",
    chartType: "Scatter",
    countryPercentage: "75",
    statePercentage: "65",
    gpPercentage: "55",
  },
  {
    id: 10,
    logo: "/theme2/Picture1.jpg",
    description:
      "No. of facilities for Children with Special Needs such as wheel chair or ramp or hearing or visual assistance etc. made available in the GP ",
    chartType: "Bubble",
    countryPercentage: "95",
    statePercentage: "85",
    gpPercentage: "75",
  },
  {
    id: 11,
    logo: "/theme2/Picture11.jpg",
    description:
      "Percentage of schools where separate toilets for boys and girls were set up in the GP. ",
    chartType: "Polar",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 12,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of children (in the age group of 6-18 years)out of school in the GP  ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 13,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of children (in the age group of 3-6 years), including Children with Special Needs (CwSN) who were availing themselves of Pre-School or Early Childhood Education and provided with Pre-School Education kit (Play and Learning material) in the GP ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 14,
    logo: "/theme2/Picture14.png",
    description:
      "No. of meetings held by the School Management Committee (SMC) in the GP  ",
    chartType: "Line",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 15,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of the students in the primary schools (Class I to V) in the GP having  >90% attendance ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 16,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of children (0 to 6 years) who received Ayushman Bharat Health Account (ABHA - earlier known as Health ID) / (or similar Health IDs under State/UT specific schemes) in the GP ",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 17,
    logo: "/theme2/Picture15.jpg",
    description:
      "No. of facilities for Children with Special Needs such as wheel chair or ramp or hearing or visual assistance etc. made available in the GP  ",
    chartType: "Pie",
    countryPercentage: "70",
    statePercentage: "80",
    gpPercentage: "50",
  },
  {
    id: 18,
    logo: "/theme2/Picture15.jpg",
    description: "No. of Bal Sabhas conducted by the GP ",
    chartType: "Polar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 19,
    logo: "/theme2/Picture15.jpg",
    description:
      "No. of meetings were conducted by the GP or its Standing Committee looking after Child Protection  ",
    chartType: "Scatter",
    countryPercentage: "100",
    statePercentage: "68",
    gpPercentage: "78",
  },
  {
    id: 20,
    logo: "/theme2/Picture20.jpg",
    description:
      "Percentage of the total Budget of the GP allocated for implementing various child development activities/Theme 3 ",
    chartType: "Line",
    countryPercentage: "70",
    statePercentage: "68",
    gpPercentage: "24",
  },
  {
    id: 21,
    logo: "/theme2/Picture21.png",
    description:
      "Percentage of OSR Spent by the GP to address various child development activities(Theme 3) in the GP",
    chartType: "Doughnut",
    countryPercentage: "46",
    statePercentage: "59",
    gpPercentage: "4",
  },
];
const Theme3Data = ({ kpi }) => {
  return (
    <div className="px-4 py-16 md:px-10" id="Child Friendly Village">
      <h1 className="text-3xl mb-5 md:text-3xl font-semibold">
        Child Friendly Village
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

export default Theme3Data;
