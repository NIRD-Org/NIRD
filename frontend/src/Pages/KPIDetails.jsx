import ThemeData from "@/components/KIP/ThemeData";
import Themes from "@/components/KIP/Themes";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KPIDetails = () => {
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
    const { data } = await API.get(
      `/api/v1/taluk/get?dist=${district}&state=${state}`
    );
    setBlockOptions(data.taluks);
  };

  const getAllGp = async () => {
    const { data } = await API.get(
      `/api/v1/gram/get?state=${state}&dist=${district}`
    );
    setGpOptions(data.gram);
  };

  useEffect(() => {
    setDistrict("");
    setTaluk("");
    getAllKpiData();
    getAllStates();
    getAllDistricts();
  }, [state]);

  useEffect(() => {
    if (district) {
      getAllBlocks();
      getAllGp();
    }
  }, [district]);

  return (
    <div className="py-10 px-5 lg:px-20">
      <div className="flex flex-col justify-between lg:flex-row text-center text-3xl h-full">
        {/* Info */}
        <div className="w-full lg:w-full h-fit">
          <div className="flex flex-wrap items-start py-10 gap-2 sm:gap-5">
            <div className="flex flex-col">
              <select
                className="border text-sm border-gray-300 p-2 rounded focus:ring focus:ring-orange-200"
                onChange={(e) => setState(e.target.value)}
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
                onChange={(e) => setDistrict(e.target.value)}
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
                onChange={(e) => setTaluk(e.target.value)}
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
                onChange={(e) => setGp(e.target.value)}
              >
                <option>All GPs</option>
                {GpOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Gram panchayat Profile */}
          </div>
          <div className="bg-white shadow-sm h-40 border w-[75%] flex flex-col justify-center items-center">
            <Link className="text-blue-900 font-semibold">
              Gram Panchayat Profile
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-4/12 h-full lg:max-h-[60vh]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Devbhumi_Dwarka_Gujarat_map.svg/2540px-Devbhumi_Dwarka_Gujarat_map.svg.png"
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Themes */}

      <div className="py-14">
        <Themes />
      </div>
      <div>
        <ThemeData />
      </div>
    </div>
  );
};

export default KPIDetails;
