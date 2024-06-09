import React, { useEffect, useState } from "react";
import SelectComponent from "../../SelectComponent";
import GpProfileCard from "../GpProfileCard";
import API from "../../../utils/API";
const GpProfile = () => {
  const [gpData, setGpData] = useState([]);
  const getAllKpiData = async () => {
    const { data } = await API.get(`/api/v1/gp-wise-kpi?page=${1}`);
    setGpData(data?.data);
  };

  useEffect(() => {
    getAllKpiData();
  }, []);

  const stateOptions = [
    { value: "all", label: "All States" },
    { value: "state1", label: "State 1" },
    { value: "state2", label: "State 2" },
    { value: "state3", label: "State 3" },
  ];

  const districtOptions = [
    { value: "all", label: "All Districts" },
    { value: "district1", label: "District 1" },
    { value: "district2", label: "District 2" },
    { value: "district3", label: "District 3" },
  ];

  const blockOptions = [
    { value: "all", label: "All Blocks" },
    { value: "block1", label: "Block 1" },
    { value: "block2", label: "Block 2" },
    { value: "block3", label: "Block 3" },
  ];

  const GpOptions = [
    { value: "all", label: "All GPs" },
    { value: "Gram1", label: "Gram 1" },
    { value: "Gram2", label: "Gram 2" },
    { value: "Gram3", label: "Gram 3" },
  ];

  const handlePageClick = () => {};

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-10 justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select State</label>
            <SelectComponent data={stateOptions} name="District" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">
              Select District
            </label>
            <SelectComponent data={districtOptions} name="District" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select Blocks</label>
            <SelectComponent data={blockOptions} name="District" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select GP</label>
            <SelectComponent data={GpOptions} name="District" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search for States, Districts and Blocks"
            className="border border-gray-300 p-2 rounded w-full lg:w-64 focus:ring focus:ring-orange-200"
          />
          <button className="bg-orange-500 text-white p-2 rounded focus:outline-none focus:ring focus:ring-orange-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr />
      <p>Showing 1 to 12 of 500 Results</p>
      <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {Array.isArray(gpData) &&
          gpData?.map((gp) => (
            <GpProfileCard
              key={gp._id}
              gpDistrict={gp?.district.name}
              gpName={gp?.gp.name}
              gpState={gp?.state.name}
              gptaluk={gp?.taluk.name}
            />
          ))}
      </div>

      {/* Pagination */}
    </div>
  );
};
export default GpProfile;
