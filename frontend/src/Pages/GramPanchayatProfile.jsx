import Themes from "@/components/KIP/Themes";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { usePDF } from "react-to-pdf";
import GpDetailComponent from "@/components/KIP/GpDetailComponent";
import { ArrowLeftIcon } from "lucide-react";

const GramPanchayatProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gpData, setGpData] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [GpOptions, setGpOptions] = useState([]);
  const [stateData, setStateData] = useState();
  const [gpDetails, setGpDetails] = useState();
  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const block = searchParams.get("block") || "";
  const gp = searchParams.get("gp") || "";
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

  const getgpDetails = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/gp-details/get?state=${state}&dist=${dist}&block=${block}&gp=${gp}`
      );
      setGpDetails(data?.data);
    } catch (error) {
      console.log("Errror: " + error.message);
      setGpDetails();
    }
  };

  useEffect(() => {
    getgpDetails();
  }, [gp]);

  useEffect(() => {
    setGpOptions([]);
    setBlockOptions([]);
    getAllStates();
    getAllDistricts();
  }, [state]);

  useEffect(() => {
    if (dist) {
      getAllBlocks();
      setGpData("");
    }
  }, [dist]);

  useEffect(() => {
    getAllGp();
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
    <div className="relative py-10 px-1 lg:px-20">
      <button
        onClick={() => navigate("/kpi")}
        className="absolute flex items-center justify-center bg-primary text-white p-2 rounded top-2 left-4 md:top-10 md:left-20 "
      >
        <ArrowLeftIcon className="w-7 h-5" />
        <p className="hidden md:block"> Back</p>
      </button>
      <h1 className="text-3xl text-primary text-center font-bold">
        Gram Panchayat Profile
      </h1>
      <div className="flex flex-col justify-between items-center  lg:flex-row text-center text-3xl h-full">
        {/* Info */}
        <div className="w-full  h-fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 items-end py-10 gap-2 sm:gap-5">
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
                  setSearchParams({ state: e.target.value });
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
                  setSearchParams({ state, dist: e.target.value });
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
                  setSearchParams({ state, dist, block: e.target.value });
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
                  setSearchParams({ state, dist, block, gp: e.target.value });
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

      <div className="pt-10">
        {gpDetails ? (
          <GpDetailComponent
            data={gpDetails}
            // data={sampleData}
          />
        ) : (
          <h1 className="text-center text-4xl text-gray-500 font-semibold">
            Gram Panchayat Data Not Found
          </h1>
        )}
      </div>
    </div>
  );
};

export default GramPanchayatProfile;
