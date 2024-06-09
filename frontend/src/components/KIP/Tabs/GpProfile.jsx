import React from "react";
import MultiSelect from "../../MultiSelect";
const GpProfile = () => {
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

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-10 justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-5 lg:space-x-10">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select State</label>
            <MultiSelect options={stateOptions} placeholder="Select States" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">
              Select District
            </label>
            <MultiSelect
              options={districtOptions}
              placeholder="Select Districts"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select Blocks</label>
            <MultiSelect options={blockOptions} placeholder="Select Block" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select GP</label>
            <MultiSelect options={GpOptions} placeholder="Select GP" />
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
      <p>Showing 1 to 12 of 500 Results</p>
    </div>
  );
};
export default GpProfile;
