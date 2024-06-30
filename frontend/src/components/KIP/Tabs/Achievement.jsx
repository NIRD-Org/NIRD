import API from "@/utils/API";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AchievementChart from "../charts/AchievementChart";

const Achievement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [GpOptions, setGpOptions] = useState([]);
  const [stateData, setStateData] = useState();
  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const block = searchParams.get("block") || "";
  const gp = searchParams.get("gp") || "";
  const tab = searchParams.get("tab");
  const navigate = useNavigate();

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
    const { data } = await API.get(`/api/v1/block/get?dist=${dist}`);
    setBlockOptions(data.blocks);
  };

  const getAllGp = async () => {
    const { data } = await API.get(`/api/v1/gram/get?block=${block}`);
    setGpOptions(data.gram);
  };

  useEffect(() => {
    setGpOptions([]);
    setBlockOptions([]);

    getAllStates();
    getAllDistricts();
  }, [state]);

  useEffect(() => {
    if (dist) {
      getAllBlocks();
    }
  }, [dist]);

  useEffect(() => {
    if (block) getAllGp();
  }, [block]);

  const getStateById = async (stateId) => {
    try {
      const { data } = await API.get(`/api/v1/state/${stateId}`);
      setStateData(data.state);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStateById(state);
  }, [state]);

  return (
    <div className="relative py-10 pt-16 px-5 lg:px-20">
      <h1 className="text-3xl text-primary text-center font-bold">
        Achievements Data
      </h1>
      <div className="flex flex-col justify-between items-center  lg:flex-row text-center text-3xl h-full">
        {/* Info */}
        <div className="w-full  h-fit">
          <div className="flex flex-wrap items-end py-10 gap-2 sm:gap-5">
            <div className="flex flex-col">
              <label
                className="text-sm text-primary text-start px-4 py-2 font-semibold"
                htmlFor=""
              >
                State
              </label>
              <select
                className="border max-w-full md:max-w-48 text-sm border-gray-200 p-2 rounded-md focus:ring focus:ring-orange-200"
                value={state}
                onChange={(e) => {
                  setSearchParams({ tab, state: e.target.value });
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
              <label
                className="text-sm text-primary text-start px-4 py-2 font-semibold"
                htmlFor=""
              >
                District
              </label>

              <select
                className="border text-sm border-gray-200 p-2 rounded-md focus:ring focus:ring-orange-200"
                value={dist}
                disabled={!districtOptions.length}
                onChange={(e) => {
                  setSearchParams({ tab, state, dist: e.target.value });
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
              <label
                className="text-sm text-primary text-start px-4 py-2 font-semibold"
                htmlFor=""
              >
                Block
              </label>

              <select
                className="border text-sm border-gray-200 p-2 rounded-md focus:ring focus:ring-orange-200"
                value={block}
                disabled={!blockOptions.length}
                onChange={(e) => {
                  setSearchParams({ tab, state, dist, block: e.target.value });
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
              <label
                className="text-sm text-primary text-start px-4 py-2 font-semibold"
                htmlFor=""
              >
                Gram Panchayat
              </label>

              <select
                className="border text-sm border-gray-200 p-2 rounded-md focus:ring focus:ring-orange-200"
                value={gp}
                disabled={!GpOptions.length}
                onChange={(e) => {
                  setSearchParams({
                    tab,
                    state,
                    dist,
                    block,
                    gp: e.target.value,
                  });
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
          </div>
        </div>
        {/* img */}
        <div className="w-full md:w-1/3 flex justify-center items-center lg:w-1/2 h-full ">
          <img
            src={stateData?.state_icon}
            alt=""
            className="w-full  max-h-[40vh] xl:max-h-[30vh]"
          />
          {/* {stateData && <StateMap stateName={stateData?.name} />} */}
        </div>
      </div>

      <div className="py-10">
        <AchievementChart block={1} state={1} dist={1} gp={1} themeId={1} />
      </div>
    </div>
  );
};

export default Achievement;
