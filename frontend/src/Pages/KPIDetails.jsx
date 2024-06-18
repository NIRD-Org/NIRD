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
import StateMap from "@/components/KIP/StateMap";
const KPIDetails = () => {
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

  const getgpDetails = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/gp-details/get?state=${state}&dist=${dist}&block=${block}&gp=${gp}`
      );
      setGpDetails(data?.data);
    } catch (error) {
      console.log("Errror: " + error.message);
    }
  };

  useEffect(() => {
    getgpDetails();
  }, [gp]);

  useEffect(() => {
    setGpOptions([]);
    setBlockOptions([]);
    getAllKpiData();
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

  const sampleData = {
    panchayatDetails: {
      state: "StateName",
      district: "DistrictName",
      block: "BlockName",
      village: "VillageName",
      panchayat: "PanchayatName",
      lgd: "LGD1234",
      address: "1234 Panchayat Address",
      mobileNumber: "1234567890",
      emailAddress: "email@example.com",
      distanceFromBusStop: 5,
      gpAttractions: "Attractions info",
    },
    demography: {
      totalPopulation: 10000,
      malePopulation: 5000,
      femalePopulation: 5000,
      stPopulation: 1000,
      scPopulation: 2000,
      obcPopulation: 3000,
      generalPopulation: 4000,
      childrenPopulation0to6: 1000,
      childrenPopulation6to18: 2000,
    },
    panchayatArea: {
      totalArea: 50,
      noOfRevenueVillages: 10,
      noOfWardsSansads: 5,
      noOfVillagesMappedWithLGD: 7,
    },
    sarpanchDetails: {
      nameOfSarpanch: "Sarpanch Name",
      education: "Graduate",
      gender: "Male",
      areaOfExpertise: "Agriculture",
      email: "sarpanch@example.com",
      mobile: "0987654321",
    },
    secretaryDetails: {
      nameOfSecretary: "Secretary Name",
      education: "Postgraduate",
      gender: "Female",
      numberOfGPCovered: 5,
      email: "secretary@example.com",
      mobile: "1234567890",
    },
  };

  const { toPDF, targetRef } = usePDF({ filename: "kpi.pdf" });

  return (
    <div className="relative py-10 px-5 lg:px-20">
      <button
        onClick={() => navigate("/kpi")}
        className="absolute flex items-center justify-center bg-primary text-white p-2 rounded top-10 left-20"
      >
        <ArrowLeftIcon className="w-7 h-5" />
        Back
      </button>
      <h1 className="text-3xl text-primary text-center font-bold">
        Gram Panchayat Profile
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
        <div className="w-1/3 mt-10 lg:mt-0 flex justify-center items-center lg:w-1/2 h-full ">
          <img
            src={stateData?.state_icon}
            alt=""
            className="w-full  max-h-[40vh] xl:max-h-[30vh]"
          />
          {/* {stateData && <StateMap stateName={stateData?.name} />} */}
        </div>
      </div>

      {/* Themes */}

      <div className="py-14">
        <Themes />
      </div>
      <div>
        {gpDetails && (
          <GpDetailComponent
            data={gpDetails}
            // data={sampleData}
          />
        )}
      </div>
    </div>
  );
};

export default KPIDetails;
