import React from "react";
import StaticChart from "../charts/StaticChart";

const kpiData = [
  {
    id: 1,
    logo: "/theme2/Picture1.jpg",
    description:
      "Whether the GP has been equipped with own computers and accessories for providing services to the citizen.",
    chartType: "Pie",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 2,
    logo: "/theme2/Picture2.jpg",
    description: "No. of Gram Sabha meetings were held in the GP",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 3,
    logo: "/theme2/Picture3.gif",
    description:
      "Whether the GP used e-GramSwaraj portal for various purposes of Panchayat functioning (planning, reporting, geotagging, accounting and online payments)",
    chartType: "Line",
    countryPercentage: "17",
    statePercentage: "11",
    gpPercentage: "3",
  },
  {
    id: 4,
    logo: "/theme2/Picture4.jpg",
    description:
      "Whether Basic Profile including LGD, Connectivity details, Election details, Elected Member details, Panchayat Committee details, Panchayat Committee Member details are available in the e-GramSwaraj Application.",
    chartType: "Pie",
    countryPercentage: "80",
    statePercentage: "70",
    gpPercentage: "60",
  },
  {
    id: 5,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of the total amount (utilised by the GP under CSS, State Schemes, SFC Grant, OSR etc.) booked in the Accounting module",
    chartType: "Doughnut",
    countryPercentage: "90",
    statePercentage: "80",
    gpPercentage: "70",
  },
  {
    id: 6,
    logo: "/theme2/Picture5.jpg",
    description:
      "Whether year book/Accounts for last financial year has been closed by 31st march of Current Financial Year ",
    chartType: "Polar",
    countryPercentage: "85",
    statePercentage: "75",
    gpPercentage: "65",
  },
  {
    id: 7,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of Mission Antyodaya (MA) Gaps attempted to address in the GPDP  ",
    chartType: "Pie",
    countryPercentage: "55",
    statePercentage: "45",
    gpPercentage: "35",
  },
  {
    id: 8,
    logo: "/theme2/Picture5.jpg",
    description: "Whether the approved GPDP is uploaded online ",
    chartType: "Bar",
    countryPercentage: "65",
    statePercentage: "55",
    gpPercentage: "45",
  },
  {
    id: 9,
    logo: "/theme2/Picture1.jpg",
    description:
      "Whether the GP account under central finanace commission has been audited through Audit online ",
    chartType: "Scatter",
    countryPercentage: "75",
    statePercentage: "65",
    gpPercentage: "55",
  },
  {
    id: 10,
    logo: "/theme2/Picture1.jpg",
    description: "Does the GP have its own active/Functional website  ",
    chartType: "Bubble",
    countryPercentage: "95",
    statePercentage: "85",
    gpPercentage: "75",
  },
  {
    id: 11,
    logo: "/theme2/Picture11.jpg",
    description: "Percentage of villages under the GP mapped with LGD",
    chartType: "Polar",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 12,
    logo: "/theme2/Picture1.jpg",
    description:
      "Status of Regulatory Services (like trade license, permit for construction of buildings, vehicle registration, income certificate, land valuation certificate etc.) being provided electronically under the following categories at GP level ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 13,
    logo: "/theme2/Picture5.jpg",
    description:
      "Status of Statutory Services (like Issuance of Birth/Death certificate, Senior Citizen Certificate, issuance of passes to Goods Vehicle etc.) being provided electronically under the following categories at GP level",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 14,
    logo: "/theme2/Picture14.png",
    description:
      "Status of Developmental Services or schemes (like NREGS, PMAY-G, Old age Pension etc.) being provided electronically at GP level ",
    chartType: "Line",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 15,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of the total Budget of the GP allocated for infrastructure-related activities in the GPDP ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 16,
    logo: "/theme2/Picture15.jpg",
    description:
      "Status of Developmental Services or schemes (like NREGS, PMAY-G, Old age Pension etc.) being provided electronically at GP level",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 17,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of Own Source Revenue/voluntary contribution etc. of the GP till the end of the previous menth utilised  to promote Good Governance (Video documentation, e-library, Website development,  Manpower hiring for e-Services, Training of vulnerable and marginalized section etc.)",
    chartType: "Pie",
    countryPercentage: "70",
    statePercentage: "80",
    gpPercentage: "50",
  },
];
const Theme8Data = () => {
  return (
    <div className="px-4 py-16 md:px-10" id="Village With Good Goverance">
      <h1 className="text-3xl mb-5 md:text-3xl font-semibold">
        Village With Good Goverance
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

export default Theme8Data;
