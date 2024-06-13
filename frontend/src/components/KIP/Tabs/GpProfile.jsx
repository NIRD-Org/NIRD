import React, { useEffect, useState } from "react";
import SelectComponent from "../../SelectComponent";
import GpProfileCard from "../GpProfileCard";
import API from "../../../utils/API";
import Select from "react-select";

const GpProfile = () => {
  const [gpData, setGpData] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [GpOptions, setGpOptions] = useState([]);

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [taluk, setTaluk] = useState("");
  const [gp, setGp] = useState("");

  const getAllKpiData = async () => {
    const { data } = await API.get(
      `/api/v1/gp-wise-kpi?page=${1}&state=${state}&taluk=${taluk}&dist=${district}&gp=${gp}`
    );
    setGpData(data?.data);
  };

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStateOptions(data?.states);
    console.log(data?.states);
  };
  const getAllDistricts = async () => {
    console.log(state);
    const { data } = await API.get(`/api/v1/dist/state/${state}`);
    setDistrictOptions(data?.districts);
  };

  const getAllBlocks = async () => {
    const { data } = await API.get(`/api/v1/taluk/get?dist=${district}`);
    setBlockOptions(data?.taluks);
  };

  const getAllGp = async () => {
    const { data } = await API.get(`/api/v1/gram/get?taluk=${taluk}`);
    setGpOptions(data?.gram);
  };

  useEffect(() => {
    setDistrict("");
    setTaluk("");
    setGp("");
    getAllKpiData();
    getAllStates();
    getAllDistricts();
  }, [state]);

  useEffect(() => {
    getAllKpiData();
  }, [district, taluk, gp]);

  useEffect(() => {
    if (district) {
      getAllBlocks();
    }
  }, [district]);

  useEffect(() => {
    if (taluk) getAllGp();
  }, [taluk]);

  const stateOptions1 = stateOptions.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const districtOptions1 = districtOptions.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const blockOptions1 = blockOptions.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const GpOptions1 = GpOptions.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "15px", // Adjust the font size as needed
      width: "100%", // Adjust the width as needed
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "15px", // Adjust the font size as needed
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "14px", // Adjust the font size of the options as needed
    }),
    menu: (provided) => ({
      ...provided,
      width: "max-content", // Adjust the width of the dropdown menu as needed
    }),
  };

  const handlePageClick = () => {};

  return (
    <div className="px-5 pb-8 lg:px-20 lg:pb-12">
      <div className="flex flex-col md:flex-row items-center gap-10 justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select State</label>

            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={stateOptions1[0]}
              isClearable="true"
              isSearchable="true"
              name="States"
              options={stateOptions1}
              onChange={(e) => setState(e.value)}
              classNames="text-black w-full text-sm"
              styles={customStyles}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">
              Select District
            </label>
            {/* <SelectComponent data={districtOptions} name="District" /> */}
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={districtOptions1[0]}
              isClearable={true}
              isSearchable={true}
              name="States"
              options={districtOptions1}
              onChange={(e) => setDistrict(e.value)}
              classNames="text-black w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">
              Select Block/Taluk
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={blockOptions1[0]}
              isClearable={true}
              isSearchable={true}
              name="States"
              options={blockOptions1}
              onChange={(e) => setTaluk(e.value)}
              classNames="text-black w-full text-sm"
              styles={customStyles}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select GP</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={GpOptions1[0]}
              isClearable={true}
              isSearchable={true}
              name="States"
              options={GpOptions1}
              onChange={(e) => setGp(e.value)}
              classNames="text-black w-full text-sm"
              styles={customStyles}
            />
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
      <p>Showing 1 to 35 of 500 Results</p>
      <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {Array.isArray(gpData) &&
          gpData?.map((gp) => (
            <GpProfileCard
              key={gp._id}
              gpDistrict={gp?.district}
              gpName={gp?.gp}
              gpState={gp?.state}
              gptaluk={gp?.taluk}
              gp={gp?.gp}
            />
          ))}
      </div>

      {/* Pagination */}
    </div>
  );
};
export default GpProfile;
