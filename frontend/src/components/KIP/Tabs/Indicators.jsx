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
    setDistrictOptions([]);
    setBlockOptions([]);
    setGpOptions([]);
    setblock("");
    setGp("");
    // getAllKpiData();
    getAllStates();
    getAllDistricts();
  }, [state]);

  useEffect(() => {
    if (district) {
      setGpOptions([]);
      getAllBlocks();
    }
  }, [district]);

  useEffect(() => {
    if (block) getAllGp();
  }, [block]);

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
      const { data } = await API.get(`/api/v1/gp-wise-indicator/indicators`);
      if (data.success) {
        setGpWiseKpiData(data.data);
      } else {
        setGpWiseKpiData([]);
      }
    } catch (error) {
      setGpWiseKpiData([]);
      console.log("Error: " + error);
    }
  };

  const getGpWiseKpiDataFilters = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/gp-wise-indicator/indicators?state=${state}&dist=${district}&block=${block}&gp=${gp}`
      );
      if (data.success) {
        setGpWiseKpiData(data.data);
      } else {
        setGpWiseKpiData([]);
      }
    } catch (error) {
      setGpWiseKpiData([]);
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    // getAllKpiData();
    getGpWiseKpiData();
    getAllKpi();
  }, []);

  useEffect(() => {
    if (state === "All States") {
      getGpWiseKpiData();
      return;
    }
    if (state || district || block || gp) {
      getGpWiseKpiDataFilters();
    }
  }, [state, district, block, gp]);

  const handleReset = () => {
    setState("");
    setDistrict("");
    setblock("");
    setGp("");
    getGpWiseKpiData();
  };

  return (
    <div className="px-10 pb-8 lg:px-20 lg:pb-12">
      <h1 className="text-xl font-bold mb-4">Institutional Strengthening</h1>
      <div className="flex flex-col md:flex-row items-center gap-10 justify-between pt-10  ">
        <div className="flex flex-wrap items-start py-10 gap-2 sm:gap-5">
          <div className="flex flex-col">
            <select
              className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            >
              <option>All States</option>
              {stateOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            {/* <SelectComponent data={districtOptions} name="District" /> */}
            <select
              className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
            >
              <option>All Districts</option>
              {districtOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <select
              className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
              value={block}
              onChange={(e) => {
                setblock(e.target.value);
              }}
            >
              <option>All Blocks</option>
              {blockOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <select
              className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
              value={gp}
              onChange={(e) => {
                setGp(e.target.value);
              }}
            >
              <option>All GPs</option>
              {GpOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleReset}
            className="bg-sky-900 rounded text-white text-sm p-2 px-4"
          >
            Reset
          </button>
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
        <div className="ml-1/4 flex-1 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-x-hidden max-h-screen">
                  {gpWiseKpiData && gpWiseKpiData.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-white sticky top-0 z-0">
                        <tr>
                          <th className="pl-5">
                            <h1 className="text-3xl">Gram Panchayat</h1>
                          </th>
                          {indicator?.map((i) => (
                            <th
                              scope="col"
                              className="px-4 w-[10rem] py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              key={i.id}
                            >
                              {i.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y border-2 border-red-600 divide-gray-200">
                        {gpWiseKpiData.map((gpData, index) => (
                          <tr key={index}>
                            <td className="pl-5">
                              <div className="mb-4">
                                <h3 className="text-xl font-semibold">
                                  {gpData.gp_name}
                                </h3>
                                <p>{gpData.block_name}</p>
                                <p className="text-lg">
                                  {gpData.district_name}
                                </p>
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
                                      value={indicatorData.percentage.toFixed(
                                        2
                                      )}
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
                  ) : (
                    <h1 className="text-center font-semibold text-gray-700 text-5xl">
                      No Data Found
                    </h1>
                  )}
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
