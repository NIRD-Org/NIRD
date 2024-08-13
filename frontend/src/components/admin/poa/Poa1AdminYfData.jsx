import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import API from "@/utils/API";
import PoaDataCard from "./PoaDataCard";
import { savePDF } from "@progress/kendo-react-pdf";
import PoaYfDataCard from "./PoaYfDataCard";
import html2pdf from "html2pdf.js";

const Poa1AdminYfData = () => {
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateOptions, setStateOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [stateData, setStateData] = useState();
  const [poa1, setpoa1] = useState([]);
  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";

  const navigate = useNavigate();

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStateOptions(data?.states);
  };
  const getAllDistricts = async () => {
    const { data } = await API.get(`/api/v1/dist/state/${state}`);
    setDistrictOptions(data?.districts);
  };

  const getpoa1Data = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/yf-poa1/get/?state_id=${state}&user_id=${user}`
      );
      setpoa1(data?.data);
    } catch (error) {
      console.log("Error: " + error.message);
      setpoa1([]);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/api/v1/users/all?role=${3}`);

        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user && state) {
      getpoa1Data();
    }
  }, [user, state]);

  useEffect(() => {
    getAllStates();
  }, []);

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
    getAllDistricts();
  }, [state]);
  const exportPDFWithMethod = () => {
    let element = printRef.current || document.body;
    console.log(state);

    savePDF(element, {
      paperSize: "A4",

      margin: 10,
      fileName: `Poa1 ${stateData?.name}`,
      forcePageBreak: ".page-break", // Add this line
    });
  };

  const handleGeneratePdf = () => {
    const element = printRef.current;

    const opt = {
      margin: 10,
      pagebreak: {
        mode: ["avoid-all"],
      },
      filename: `Poa1 ${stateData?.name}`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="relative py-10 px-1 lg:px-20">
      <button
        onClick={() => navigate("/kpi")}
        className="absolute flex items-center justify-center bg-primary text-white p-2 rounded top-2 left-4 md:top-10 md:left-20"
      >
        <ArrowLeftIcon className="w-7 h-5" />
        <p className="hidden md:block">Back</p>
      </button>
      <h1 className="text-3xl text-primary text-center font-bold">
        First Fortnightly Plan Of Action
      </h1>
      <div className="flex flex-col justify-between items-center lg:flex-row text-center text-3xl h-full">
        <div className="w-full h-fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 items-end py-10 gap-2 sm:gap-5">
            <div className="flex flex-col">
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                State
              </label>
              <select
                className="border text-sm bg-white p-2 rounded-md"
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
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                Employee
              </label>
              <select
                className="border text-sm bg-white p-2 rounded-md"
                value={user}
                disabled={!users.length || !state}
                onChange={(e) => setUser(e.target.value)}
              >
                <option>All Employees</option>
                {users?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center items-center lg:w-1/2 h-full">
          <img
            src={stateData?.state_icon}
            alt=""
            className="w-full max-h-[40vh] xl:max-h-[30vh]"
          />
        </div>
      </div>

      <button
        // onClick={exportPDFWithMethod}
        onClick={handleGeneratePdf}
        className="mt-4 bg-primary  text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download as PDF
      </button>

      <div ref={printRef} className="pt-10 grid grid-cols-1 place-items-center">
        {poa1?.poaData?.length > 0 ? (
          poa1?.poaData?.map((poa, index) => {
            return <PoaYfDataCard key={index} data={poa} />;
          })
        ) : (
          <h1 className="text-center text-4xl text-gray-500 font-semibold">
            No Data Available
          </h1>
        )}
      </div>
    </div>
  );
};

export default Poa1AdminYfData;
