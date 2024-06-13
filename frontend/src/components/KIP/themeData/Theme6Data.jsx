import React from "react";
import StaticChart from "../charts/StaticChart";

const kpiData = [
  {
    id: 1,
    logo: "/theme2/Picture1.jpg",
    description: "Percentage of Households living in Kutcha houses in the GP",
    chartType: "Pie",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 2,
    logo: "/theme2/Picture2.jpg",
    description: "Percentage of solarized street lights created in the GP ",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 3,
    logo: "/theme2/Picture3.gif",
    description:
      "Percentage of Households Having no Houses(Living under tree, under bridge etc.) in the GP    ",
    chartType: "Line",
    countryPercentage: "17",
    statePercentage: "11",
    gpPercentage: "3",
  },
  {
    id: 4,
    logo: "/theme2/Picture4.jpg",
    description:
      "Whether the Common Service Centre/similar facility is co-located in the GP building during ",
    chartType: "Pie",
    countryPercentage: "80",
    statePercentage: "70",
    gpPercentage: "60",
  },
  {
    id: 5,
    logo: "/theme2/Picture5.jpg",
    description:
      "Whether Basic Infrastructure Facilities (Computer, Internet, separate toilet for men and women, Drinking Water facility, Furniture  etcc.) are available in the GP Bhawan ",
    chartType: "Doughnut",
    countryPercentage: "90",
    statePercentage: "80",
    gpPercentage: "70",
  },
  {
    id: 6,
    logo: "/theme2/Picture5.jpg",
    description:
      "Whether other Infrastructure Facilities (Library, Community Centre, Anganwadi Centre, Playground, Park etc.) are available in the GP  ",
    chartType: "Polar",
    countryPercentage: "85",
    statePercentage: "75",
    gpPercentage: "65",
  },
  {
    id: 7,
    logo: "/theme2/Picture5.jpg",
    description:
      "Percentage of Villages of the GP are connected with all-weather roads ",
    chartType: "Pie",
    countryPercentage: "55",
    statePercentage: "45",
    gpPercentage: "35",
  },
  {
    id: 8,
    logo: "/theme2/Picture5.jpg",
    description:
      "Whether the GP has Public transport facility e.g. bus, taxi, e-riksha etc., Disabled friendly bus shed Toilet facility in the waiting area of bus stop facility, Benches in the bus shed for waiting,  Drinking Water facility in the waiting area of bus stop etc. at the end of the MONTH?",
    chartType: "Bar",
    countryPercentage: "65",
    statePercentage: "55",
    gpPercentage: "45",
  },
  {
    id: 9,
    logo: "/theme2/Picture1.jpg",
    description:
      "Percentage of GP Wards having street lighting facilities on the roads    ",
    chartType: "Scatter",
    countryPercentage: "75",
    statePercentage: "65",
    gpPercentage: "55",
  },
  {
    id: 10,
    logo: "/theme2/Picture1.jpg",
    description:
      "At what frequency the Electricity facility for domestic use available in all households under the GP ",
    chartType: "Bubble",
    countryPercentage: "95",
    statePercentage: "85",
    gpPercentage: "75",
  },
  {
    id: 11,
    logo: "/theme2/Picture11.jpg",
    description: "Percentage of HHs not having electricity facility.  ",
    chartType: "Polar",
    countryPercentage: "50",
    statePercentage: "40",
    gpPercentage: "30",
  },
  {
    id: 12,
    logo: "/theme2/Picture1.jpg",
    description:
      "Whether the GP has any flood/cyclone/ disaster relief centre in the GP ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 13,
    logo: "/theme2/Picture5.jpg",
    description:
      "Whether the GP has Storage Tank for water storage facility available ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 14,
    logo: "/theme2/Picture14.png",
    description:
      "Percentage of Functional Health Sub centre/Health & wellness centre in the GP",
    chartType: "Line",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 15,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of Functional  Health Sub centre/Health & wellness centre to which the GP has provided infrastructure for access  ",
    chartType: "Pie",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 16,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of HHs having access to the Livestock Aid centre for treatment of the ailing animals ",
    chartType: "Bar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 17,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of Primary/Secondary Schools in the GP having play ground  ",
    chartType: "Pie",
    countryPercentage: "70",
    statePercentage: "80",
    gpPercentage: "50",
  },
  {
    id: 18,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of the total Budget of the GP allocated for infrastructure-related activities in the GPDP ",
    chartType: "Polar",
    countryPercentage: "60",
    statePercentage: "50",
    gpPercentage: "40",
  },
  {
    id: 19,
    logo: "/theme2/Picture15.jpg",
    description:
      "Percentage of OSR spent by the GP for implementing infrastructure-related activities  ",
    chartType: "Scatter",
    countryPercentage: "100",
    statePercentage: "68",
    gpPercentage: "78",
  },
];
const Theme6Data = ({ kpi }) => {
  return (
    <div className="px-4 py-16 md:px-10" id="Self-Sufficient">
      <h1 className="text-3xl mb-5 md:text-3xl font-semibold">
        Self-Sufficient Infrastructure in Village
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

export default Theme6Data;
