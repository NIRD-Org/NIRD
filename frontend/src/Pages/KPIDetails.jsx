import ThemeData from "@/components/KIP/Theme1Data";
import Themes from "@/components/KIP/Themes";
import Theme2Data from "../components/KIP/themeData/Theme2Data";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Theme3Data from "@/components/KIP/themeData/Theme3Data";
import Theme4Data from "@/components/KIP/themeData/Theme4Data";
import Theme5Data from "@/components/KIP/themeData/Theme5Data";
import Theme6Data from "@/components/KIP/themeData/Theme6Data";
import Theme7Data from "@/components/KIP/themeData/Theme7Data";
import Theme8Data from "@/components/KIP/themeData/Theme8Data";
import Theme9Data from "@/components/KIP/themeData/Theme9Data";
import { usePDF } from "react-to-pdf";
const KPIDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gpData, setGpData] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [GpOptions, setGpOptions] = useState([]);
  const [stateData, setStateData] = useState();

  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const block = searchParams.get("block") || "";
  const gp = searchParams.get("gp") || "";

  const getAllKpiData = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/gp-wise-kpi?page=${1}&state=${state}&block=${block}&dist=${dist}&gp=${gp}`
      );
      setGpData(data?.data);
    } catch (error) {
      setGpData([]);
      console.log(error);
    }
  };

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
    getAllKpiData();
    getAllStates();
    getAllDistricts();
  }, [state]);

  useEffect(() => {
    if (dist) {
      getAllBlocks();
    }
  }, [dist]);

  useEffect(() => {
    getAllGp();
  }, [block]);

  const handleApply = () => {
    setSearchParams({ state, dist, block, gp });
    getAllKpiData();
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
    const stateId = searchParams.get("state");
    getStateById(stateId);
  }, []);

  const { toPDF, targetRef } = usePDF({ filename: "kpi.pdf" });

  return (
    <div className="py-10 px-5 lg:px-20">
      <h1 className="text-3xl text-primary text-center font-bold">
        Gram Panchayat Profile
      </h1>
      <div className="flex flex-col justify-between items-center lg:items-end lg:flex-row text-center text-3xl h-full">
        {/* Info */}
        <div className="w-full lg:w-full h-fit">
          <div className="flex flex-wrap items-end py-10 gap-2 sm:gap-5">
            <div className="flex flex-col">
              <label
                className="text-sm text-primary text-start px-4 py-2 font-semibold"
                htmlFor=""
              >
                State
              </label>
              <select
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={state}
                onChange={(e) => {
                  searchParams.set("state", e.target.value);
                  setSearchParams(searchParams);
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
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={dist}
                onChange={(e) => {
                  searchParams.set("dist", e.target.value);
                  setSearchParams(searchParams);
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
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={block}
                onChange={(e) => {
                  searchParams.set("block", e.target.value);
                  setSearchParams(searchParams);
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
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                value={gp}
                onChange={(e) => {
                  searchParams.set("gp", e.target.value);
                  setSearchParams(searchParams);
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
              onClick={handleApply}
              className="bg-sky-900 rounded text-white text-sm p-2 px-4"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="w-1/2 mt-10 lg:mt-0 flex justify-center items-center lg:w-[20%] h-full lg:max-h-[25vh]">
          <img
            src={stateData?.state_icon}
            alt=""
            className="w-full max-h-[40vh]"
          />
        </div>
      </div>

      {/* Themes */}

      <div className="py-14">
        <Themes />
      </div>
      <div ref={targetRef}>
        {/* <ThemeData />
        <Theme2Data />
        <Theme3Data />
        <Theme4Data />
        <Theme5Data />
        <Theme6Data />
        <Theme7Data />
        <Theme8Data />
        <Theme9Data /> */}
      </div>
    </div>
  );
};

export default KPIDetails;
