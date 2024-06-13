import React from "react";
import StaticChart from "../charts/StaticChart";

const kpiData = [
  {
    id: 1,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of child deaths (in the age group of 0-59 months) recorded in the GP",
    chartType: "Pie",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 2,
    logo: "/theme2/Picture2.jpg",
    description:
      "Percentage of Pregnant women (15-49 yrs) recorded as anaemic in the GP",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 3,
    logo: "/theme2/Picture3.gif",
    description:
      "Percentage of Tuberculosis patients who completed their prescribed medicine course without gap in the GP",
    chartType: "Line",
    countryPercentage: "17",
    statePercentage: "11",
    gpPercentage: "3",
  },
  {
    id: 4,
    logo: "/theme2/Picture4.jpg",
    description: "No. of IEC campaigns on Health related activities",
    chartType: "Pie",
    countryPercentage: "80",
    statePercentage: "70",
    gpPercentage: "60",
  },
  {
    id: 5,
    logo: "/theme2/Picture5.jpg",
    description: "No. of mosquito nets distributed in the GP",
    chartType: "Doughnut",
    countryPercentage: "90",
    statePercentage: "80",
    gpPercentage: "70",
  },
  {
    id: 6,
    logo: "/theme2/Picture5.jpg",
    description: "No. of sanitization of public places and houses in the GP ",
    chartType: "Polar",
    countryPercentage: "85",
    statePercentage: "75",
    gpPercentage: "65",
  },
  {
    id: 7,
    logo: "/theme2/Picture5.jpg",
    description: "No. of Health Check-ups organized in the GP ",
    chartType: "Pie",
    countryPercentage: "55",
    statePercentage: "45",
    gpPercentage: "35",
  },
  {
    id: 8,
    logo: "/theme2/Picture5.jpg",
    description:
      "No. of times Free Preventive Medicines were distributed in the GP ",
    chartType: "Bar",
    countryPercentage: "65",
    statePercentage: "55",
    gpPercentage: "45",
  },
  {
    id: 9,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of children (0-6 years) were fully immunized in the GP",
    chartType: "Scatter",
    countryPercentage: "75",
    statePercentage: "65",
    gpPercentage: "55",
  },
  {
    id: 10,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of children (0-6 years) were Partially immunized in the GP ",
    chartType: "Bubble",
    countryPercentage: "95",
    statePercentage: "85",
    gpPercentage: "75",
  },
  {
    id: 11,
    logo: "/theme2/Picture11.jpg",
    description:
      "Percentage of women benefited under Pradhan Mantri Matru Vandana Yojana/similar State scheme",
    chartType: "Polar",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 12,
    logo: "/theme2/Picture1.jpg",
    description: "Percentage of institutional births in the GP ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 13,
    logo: "/theme2/Picture5.jpg",
    description: "No. of IEC campaigns conducted in the GP on Healthy Village",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 14,
    logo: "/theme2/Picture14.png",
    description:
      "No. of Training of the Community Based Organizations and SHGs. ",
    chartType: "Line",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 15,
    logo: "/theme2/Picture15.jpg",
    description: "No. of Cleanliness drives held in the GP ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 16,
    logo: "/theme2/Picture15.jpg",
    description:
      "No. of Sanitization of public places & houses conducted by the GP ",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 17,
    logo: "/theme2/Picture15.jpg",
    description:
      "No. of Special Gram Sabhas organized by the GP on Healthy Village ",
    chartType: "Pie",
    countryPercentage: "70",
    statePercentage: "80",
    gpPercentage: "50",
  },
  {
    id: 18,
    logo: "/theme2/Picture15.jpg",
    description: "No. of Health Check-ups organised in the GP  ",
    chartType: "Polar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 19,
    logo: "/theme2/Picture15.jpg",
    description:
      "No. of times Free Preventive Medicines were distributed in the GP  ",
    chartType: "Scatter",
    countryPercentage: "100",
    statePercentage: "68",
    gpPercentage: "78",
  },
  {
    id: 20,
    logo: "/theme2/Picture20.jpg",
    description:
      "Percentage of beneficiaries in the GP who have Ayushman Cards under Pradhan Mantri Jan Arogya Yojana (PMJAY) /similar State scheme",
    chartType: "Line",
    countryPercentage: "70",
    statePercentage: "68",
    gpPercentage: "24",
  },
  {
    id: 21,
    logo: "/theme2/Picture21.png",
    description:
      "No. of meetings conducted by the Village Health Sanitation & Nutrition Committee (VHSNC) in the GP",
    chartType: "Doughnut",
    countryPercentage: "46",
    statePercentage: "59",
    gpPercentage: "4",
  },
  {
    id: 22,
    logo: "/theme2/Picture21.png",
    description:
      "Percentage of the total Budget of the GP earmarked under GPDP for implementing health related activities",
    chartType: "Scatter",
    countryPercentage: "86",
    statePercentage: "79",
    gpPercentage: "74",
  },
];
const Theme2Data = ({ kpi }) => {
  return (
    <div className="px-4 py-16 md:px-10" id="Healthy Village">
      <h1 className="text-3xl mb-5 md:text-3xl font-semibold">
        Healthy Village
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
              <div className="rounded-sm bg-[#004B86] flex  justify-between items-center gap-5 font-semibold relative">
                <img
                  src={logo}
                  alt="graph"
                  className="relative object-contain p-2 bg-white border rounded-lg left-2 top-3  w-20 h-20"
                />
                <p className="text-sm text-white">
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

export default Theme2Data;
