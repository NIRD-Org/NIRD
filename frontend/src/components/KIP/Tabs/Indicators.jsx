import React, { useEffect, useState } from "react";
import Themes from "../Themes";
import API from "@/utils/API";
import Progress from "../Progress";
import Select from "react-select";
const Indicators = () => {
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [GpOptions, setGpOptions] = useState([]);

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setblock] = useState("");
  const [gp, setGp] = useState("");

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStateOptions(data?.states);
    console.log(data?.states);
  };
  const getAllDistricts = async () => {
    const { data } = await API.get(`/api/v1/dist/state/${state}`);
    setDistrictOptions(data?.districts);
  };

  const getAllBlocks = async () => {
    const { data } = await API.get(`/api/v1/block/get?dist=${district}`);
    setBlockOptions(data?.blocks);
  };

  const getAllGp = async () => {
    const { data } = await API.get(`/api/v1/gram/get?block=${block}`);
    setGpOptions(data?.gram);
  };

  useEffect(() => {
    setDistrict("");
    setblock("");
    setGp("");
    // getAllKpiData();
    getAllStates();
    getAllDistricts();
  }, [state]);

  useEffect(() => {
    if (district) {
      getAllBlocks();
    }
  }, [district]);

  useEffect(() => {
    if (block) getAllGp();
  }, [block]);

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

  // Old
  const [indicator, setIndicator] = useState([]);
  const [gpData, setGpData] = useState([]);
  const [gpWiseKpiData, setGpWiseKpiData] = useState([]);
  const getAllKpi = async () => {
    try {
      const { data } = await API.get("/api/v1/indicator/all");
      setIndicator(data.indicators);
      console.log(data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  // const getAllKpiData = async () => {
  //   const { data } = await API.get(`/api/v1/gp-wise-kpi?page=${1}`);
  //   setGpData(data?.data);
  // };

  const getGpWiseKpiData = async () => {
    try {
      const { data } = await API.get("/api/v1/gp-wise-indicator/indicators");
      setGpWiseKpiData(data.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    // getAllKpiData();
    getGpWiseKpiData();
    getAllKpi();
  }, []);

  return (
    <div className="px-10 pb-8 lg:px-20 lg:pb-12">
      <h1 className="text-xl font-bold mb-4">Institutional Strengthening</h1>
      <div className="flex flex-col md:flex-row items-center gap-10 justify-between pt-10  ">
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
              Select Block/block
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={blockOptions1[0]}
              isClearable={true}
              isSearchable={true}
              name="States"
              options={blockOptions1}
              onChange={(e) => setblock(e.value)}
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
      <div className="flex relative pt-5 pb-20">
        <div class="ml-1/4 flex-1 overflow-hidden">
          <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th>
                          <h1 className="text-3xl">Gram Panchayat</h1>
                        </th>
                        {indicator?.map((i) => (
                          <th
                            scope="col"
                            class="px-4 w-[10rem] py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            key={i.id}
                          >
                            {i.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {gpWiseKpiData.map((gpData, index) => (
                        <tr key={index}>
                          <td>
                            <div class="mb-4">
                              <h3 class="text-xl font-semibold">
                                {gpData.gp_name}
                              </h3>
                              <p>{gpData.block_name}</p>
                              <p className="text-lg">{gpData.district_name} </p>
                              <p className="text-sm">{gpData.state_name}</p>
                            </div>
                          </td>
                          {indicator.map((i) => {
                            const indicatorData = gpData.gp_percentage.find(
                              (item) => item.indicator_id === i.id
                            );
                            return (
                              <td className="px-4" key={i.id}>
                                {indicatorData ? (
                                  <Progress
                                    value={indicatorData.percentage.toFixed(2)}
                                  />
                                ) : (
                                  "N/A"
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indicators;
