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
  const [block, setblock] = useState("");
  const [gp, setGp] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const getAllKpiData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi?page=${1}&state=${state}&block=${block}&dist=${district}&gp=${gp}`
      );
      setGpData(data?.data);
    } catch (error) {
      console.log(error.message);
      setGpData([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllKpiSearchData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi?page=${1}&search=${search}`
      );
      setGpData(data?.data);
    } catch (error) {
      console.log(error.message);
      setGpData([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStateOptions(data?.states);
    // console.log(data?.states);
  };
  const getAllDistricts = async () => {
    try {
      const { data } = await API.get(`/api/v1/dist/state/${state}`);
      setDistrictOptions(data?.districts);
    } catch (error) {
      setDistrictOptions([]);
      console.log("Error gettign district");
    }
  };

  const getAllBlocks = async () => {
    try {
      const { data } = await API.get(`/api/v1/block/get?dist=${district}`);
      setBlockOptions(data?.blocks);
    } catch (error) {
      console.log("Error getting block");
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
      setblock("");
      setGp("");
      getAllKpiData();
      getAllDistricts();
    }
  }, [state]);

  useEffect(() => {
    getAllKpiData();
  }, [district, block, gp]);

  useEffect(() => {
    if (district) {
      getAllBlocks();
    }
  }, [district]);

  useEffect(() => {
    if (block) getAllGp();
  }, [block]);

  const handleReset = () => {
    setState("");
    setDistrict("");
    setblock("");
    setGp("");
    getAllKpiData();
  };

  const handlePageClick = () => {};

  const handleSearch = (e) => {
    e.preventDefault();
    getAllKpiSearchData();
  };
  return (
    <div className="px-5 pb-8 lg:px-20 lg:pb-12">
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 justify-between mb-4">
        <div className="flex flex-wrap items-end gap-2 sm:gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select State</label>

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
            className="bg-primary rounded text-white text-sm p-2 px-4"
          >
            Reset
          </button>
        </div>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for States, Districts and Blocks"
            className="border border-gray-300 p-2 rounded w-full lg:w-64 focus:ring focus:ring-orange-200"
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
      <hr />
      {loading ? (
        <h1 className="text-center py-10 text-2xl text-gray-500">Loading...</h1>
      ) : (
        <>
          <p>Showing {gpData.length} Results</p>
          {Array.isArray(gpData) && gpData.length > 0 ? (
            <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
              {gpData?.map((gp) => (
                <GpProfileCard
                  key={gp._id}
                  gpDistrict={gp?.district}
                  gpName={gp?.gp}
                  gpState={gp?.state}
                  gpblock={gp?.block}
                  gp={gp?.gp}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-center text-gray-600 text-4xl">
              No Data Found
            </h1>
          )}
        </>
      )}

      {/* Pagination */}
    </div>
  );
};
export default GpProfile;
