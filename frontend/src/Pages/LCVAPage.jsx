import CarouselComponent from "@/components/CarouselComponent";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";

const LCVAPage = () => {
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [GpOptions, setGpOptions] = useState([]);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setblock] = useState("");
  const [gp, setGp] = useState("");
  const [search, setSearch] = useState("");
  const [activityType, setActivityType] = useState("");

  const [loading, setLoading] = useState(false);
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
      getAllDistricts();
    }
  }, [state]);

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
  };
  const handleSearch = () => {};
  return (
    <div className="px-5  py-8 md:px-20 md:py-10">
      {/* Header */}
      <div className="flex pb-16 justify-between">
        <div>
          <h1 className="text-5xl md:text-6xl text-primary font-bold">
            Low-cost Voluntary Activities (26)
          </h1>
        </div>
      </div>
      {/* Info Section */}
      <div className="w-full bg-white p-10 rounded flex flex-col md:flex-row justify-between gap-5">
        {/* Carousel */}
        <div className=" w-full md:w-4/6">
          <CarouselComponent />
        </div>
        {/* Info */}
        <div className="w-full md:w-2/6 flex flex-col gap-4 ">
          <div className="bg-gray-200 p-5 flex w-full items-center  justify-between">
            <p className="text-xl text-gray-700 font-semibold">Themes</p>
            <p className="text-[#262675] text-2xl font-bold">9</p>
          </div>
          <div className="bg-gray-200 p-5 flex w-full items-center  justify-between">
            <p className="text-xl text-gray-700 font-semibold">Activities</p>
            <p className="text-[#262675] text-2xl font-bold">1</p>
          </div>
          <div className="bg-gray-200 p-5 flex w-full items-center  justify-between">
            <p className="text-xl text-gray-700 font-semibold">
              Details of LCVA (Doc/PDF)
            </p>
            <p className="text-[#262675] text-2xl font-bold">1</p>
          </div>
          <div className="bg-gray-200 p-5 flex w-full items-center  justify-between">
            <p className="text-xl text-gray-700 font-semibold">Videos</p>
            <p className="text-[#262675] text-2xl font-bold">0</p>
          </div>
        </div>
      </div>

      {/* Details Section */}

      <div className="py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 justify-between mb-4">
          <div className="flex flex-wrap items-end gap-2 sm:gap-5">
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
            <div className="flex flex-col">
              <select
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={activityType}
                onChange={(e) => {
                  setActivityType(e.target.value);
                }}
              >
                <option>Activity Type</option>

                <option value="document">Document</option>
                <option value="video">Video</option>
              </select>
            </div>
            <button
              onClick={handleReset}
              className="bg-primary rounded text-white text-sm p-2 px-4"
            >
              Reset
            </button>
          </div>

          <div>
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2"
            >
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
        </div>
      </div>
    </div>
  );
};

export default LCVAPage;
