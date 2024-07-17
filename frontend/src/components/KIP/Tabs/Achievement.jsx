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
  const [themes, setThemes] = useState([]);
  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const block = searchParams.get("block") || "";
  const gp = searchParams.get("gp") || "";
  const tab = searchParams.get("tab");
  const theme = searchParams.get("theme");
  const financialYear = searchParams.get("financial_year");
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

  const getAllThemes = async () => {
    try {
      const { data } = await API.get(`/api/v1/theme/all`);
      setThemes(data?.themes || []);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getAllThemes();
  }, []);

  const financialYears = [];

  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

  return (
    <div className="relative py-10 pt-16 px-5 lg:px-20">
      <h1 className="text-3xl text-primary text-center font-bold">
        Achievements Data
      </h1>
      <div className="flex text-center justify-between items-end text-3xl h-full">
        {/* Info */}
        <div className="w-full h-fit">
          <div className="flex flex-wrap items-end py-10 gap-2 sm:gap-5">
            <div className="flex flex-col">
              <label
                className="text-sm text-primary text-start px-4 py-2 font-semibold"
                htmlFor=""
              >
                State
              </label>
              <select
                className="border max-w-full md:max-w-48 text-sm border-gray-200 p-2 rounded-md "
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
                className="border text-sm border-gray-200 p-2 rounded-md "
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
                className="border text-sm border-gray-200 p-2 rounded-md "
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
                className="border text-sm border-gray-200 p-2 rounded-md "
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
            <div className="flex flex-col">
              <label
                className="text-sm text-primary text-start px-4 py-2 font-semibold"
                htmlFor=""
              >
                Financial Year
              </label>
              <select
                value={financialYear}
                onChange={(e) => {
                  searchParams.set("financial_year", e.target.value);
                  setSearchParams(searchParams);
                }}
                className="w-full text-sm md:w-40 text-center border p-2 rounded-md"
              >
                <option value="">Select Financial Year</option>
                {financialYears.map((year, index) => (
                  <option key={index} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm text-primary text-start px-4 py-2 font-semibold"
                htmlFor=""
              >
                Theme
              </label>

              <select
                className="border text-sm border-gray-200 p-2 rounded-md "
                value={theme}
                disabled={!themes.length}
                onChange={(e) => {
                  searchParams.set("theme", e.target.value);
                  setSearchParams(searchParams);
                }}
              >
                <option>Select Theme</option>
                {themes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.theme_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* img */}
        <div className="w-full md:w-1/3 lg:w-1/2 h-full ">
          <img
            src={stateData?.state_icon}
            alt=""
            className="w-full  max-h-[40vh] xl:max-h-[30vh]"
          />
          {/* {stateData && <StateMap stateName={stateData?.name} />} */}
        </div>
      </div>

      <div className="py-10">
        {/* <AchievementChart
          block={block}
          state={state}
          dist={dist}
          gp={gp}
          themeId={theme}
          fy={financialYear}
          theme={themes.find((t) => t.id === theme)?.theme_name}
        /> */}
        <AchievementChart
          block={"8"}
          state={"3"}
          dist={"8"}
          gp={"31"}
          themeId={"1"}
          fy={"FY2023-2024"}
          theme={"Poverty Free and Enhanced Livelihoods Village"}
        />
      </div>
    </div>
  );
};

export default Achievement;
