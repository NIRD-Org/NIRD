import React, { useEffect, useState, useRef } from "react";
import Themes from "../Themes";
import API from "@/utils/API";
import Progress from "../Progress";
import Select from "react-select";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Indicators = () => {
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [GpOptions, setGpOptions] = useState([]);
  const [financialYear, setFinancialYear] = useState();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [gp, setGp] = useState("");
  const [loading, setLoading] = useState(false);

  const tableRef = useRef(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const scrollLeft = () => {
    tableRef.current.scrollBy({
      top: 0,
      left: window.screen.width > 700 ? -700 : -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    tableRef.current.scrollBy({
      top: 0,
      left: window.screen.width > 700 ? 800 : 300,
      behavior: "smooth",
    });
  };

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStateOptions(data?.states);
  };

  const getAllDistricts = async () => {
    try {
      const { data } = await API.get(`/api/v1/dist/state/${state}`);
      setDistrictOptions(data?.districts);
    } catch (error) {
      setDistrictOptions([]);
      console.log("Error getting district");
    }
  };

  const getAllBlocks = async () => {
    try {
      const { data } = await API.get(`/api/v1/block/get?dist=${district}`);
      setBlockOptions(data?.blocks);
    } catch (error) {
      setBlockOptions([]);
    }
  };

  const getAllGp = async () => {
    try {
      const { data } = await API.get(`/api/v1/gram/get?block=${block}`);
      setGpOptions(data?.gram);
    } catch (error) {
      setGpOptions([]);
    }
  };

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    if (state) {
      setDistrict("");
      setDistrictOptions([]);
      setBlockOptions([]);
      setGpOptions([]);
      setBlock("");
      setGp("");
      getAllDistricts();
    }
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

  const [indicator, setIndicator] = useState([]);
  const [gpWiseKpiData, setGpWiseKpiData] = useState([]);
  const [search, setSearch] = useState("");

  const getAllKpi = async () => {
    try {
      const { data } = await API.get("/api/v1/indicator/all");
      setIndicator(data.indicators);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const getGpWiseKpiData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/api/v1/gp-wise-indicator/indicators`);
      if (data.success) {
        setGpWiseKpiData(data.data);
      } else {
        setGpWiseKpiData([]);
      }
    } catch (error) {
      setGpWiseKpiData([]);
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  const getGpWiseKpiDataFilters = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    setBlock("");
    setGp("");
    getGpWiseKpiData();
  };

  const getGpWiseKpiSearchData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `/api/v1/gp-wise-indicator/indicators?search=${search}&fy=${financialYear}`
      );
      if (data.success) {
        setGpWiseKpiData(data.data);
      } else {
        setGpWiseKpiData([]);
      }
    } catch (error) {
      setGpWiseKpiData([]);
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getGpWiseKpiSearchData();
  };

  useEffect(() => {
    getGpWiseKpiSearchData();
  }, [financialYear]);

  const financialYears = [];

  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const sortedData = [...gpWiseKpiData].sort((a, b) => {
      const valueA =
        a.gp_percentage.find((item) => item.indicator_id === key)?.percentage ||
        0;
      const valueB =
        b.gp_percentage.find((item) => item.indicator_id === key)?.percentage ||
        0;

      if (direction === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
    setGpWiseKpiData(sortedData);
  };

  return (
    <div className="px-4 pb-8 lg:px-20 lg:pb-12">
      <h1 className="text-xl font-bold mb-4">Institutional Strengthening</h1>
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 justify-between mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5  items-end gap-2 sm:gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select State</label>

            <select
              className="border w-full md:max-w-40 text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
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
                setBlock(e.target.value);
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
            className="bg-primary rounded text-white text-sm p-2 px-2"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="text-center p-2 rounded"
          >
            <option value="">Select Financial Year</option>
            {financialYears.map((year, index) => (
              <option key={index} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for States, Districts and Blocks"
              className="border border-gray-300 p-2 rounded w-full lg:w-40 focus:ring focus:ring-orange-200"
            />
            <button className="bg-primary text-white p-2 rounded focus:outline-none focus:ring focus:ring-orange-200">
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
          </form>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-5 mb-1">
        <button
          onClick={scrollLeft}
          className="bg-primary text-white  px-3 rounded focus:outline-none focus:ring text-[1.25rem] focus:ring-orange-200"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className="bg-primary text-white text-[1.25rem] p-2 px-3 rounded focus:outline-none focus:ring focus:ring-orange-200"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex relative pb-20">
        <div className="ml-1/4 flex-1 overflow-hidden">
          <div className="flex flex-col h-full">
            <div
              className="overflow-x-auto"
              style={{ maxWidth: "100%", overflowX: "auto" }}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary text-white sticky top-0 z-0">
                  <tr>
                    <th className="pl-5 sticky -left-1 bg-primary">
                      <h1 className="text-3xl">Gram Panchayat</h1>
                    </th>
                    {indicator?.map((i) => (
                      <th
                        scope="col"
                        className="px-4 w-[10rem] py-3 text-start text-xs font-medium text-white uppercase cursor-pointer"
                        key={i.id}
                        onClick={() => sortData(i.id)}
                      >
                        {i.name}{" "}
                        {sortConfig.key === i.id &&
                          (sortConfig.direction === "asc" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 inline"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 inline"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          ))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y border-2 border-red-600 divide-gray-200">
                  {gpWiseKpiData.map((gpData, index) => (
                    <tr key={index}>
                      <td className="pl-5 sticky -left-1 bg-white">
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold">
                            {gpData.gp_name}
                          </h3>
                          <p>{gpData.block_name}</p>
                          <p className="text-md">{gpData.dist_name}</p>
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
                              <>
                                <p className="text-[0.8em] font-semibold">
                                  Max Range: {indicatorData.max_range}
                                </p>
                                <p className="text-[0.8rem] font-semibold">
                                  Input: {indicatorData.input_data}
                                </p>

                                <Progress
                                  value={indicatorData.percentage.toFixed(2)}
                                />
                              </>
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
              {loading && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
                  <h1 className="text-center py-10 text-2xl text-gray-500">
                    Loading...
                  </h1>
                </div>
              )}
              {!loading && gpWiseKpiData.length === 0 && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
                  <h1 className="text-center font-semibold text-gray-700 text-5xl">
                    No Data Found
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indicators;
