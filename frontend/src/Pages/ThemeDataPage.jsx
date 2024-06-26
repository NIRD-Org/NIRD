import ManregsChart from "@/components/KIP/charts/MenregsChart";
import API from "@/utils/API";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const KPIDataComponent = {};

const ThemeDataPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [theme, setTheme] = useState();
  const [kpiData, setKpiData] = useState([]);
  const [state, setState] = useState();
  const [dist, setDist] = useState();
  const [block, setBlock] = useState();
  const [gp, setGp] = useState();

  const state_id = searchParams.get("state") || "";
  const dist_id = searchParams.get("dist") || "";
  const block_id = searchParams.get("block") || "";
  const gp_id = searchParams.get("gp") || "";
  const navigate = useNavigate();

  const getThemeById = async () => {
    try {
      const { data } = await API.get(`/api/v1/theme/get-theme/${id}`);
      setTheme(data?.theme.theme_name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKpiByTheme = async () => {
    try {
      const { data } = await API.get(`/api/v1/kpi/theme/${id}`);
      setKpiData(data?.KPI);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getStateById = async () => {
    try {
      const { data } = await API.get(`/api/v1/state/${state_id}`);
      setState(data.state.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDistById = async () => {
    try {
      const { data } = await API.get(`/api/v1/dist/get-dist/${dist_id}`);
      setDist(data?.district.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBlockById = async () => {
    try {
      const { data } = await API.get(`/api/v1/block/get-blocks/${block_id}`);
      setBlock(data?.block.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getGpById = async () => {
    try {
      const { data } = await API.get(`/api/v1/gram/get-gram/${gp_id}`);
      setGp(data?.gp.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getStateById();

    getDistById();
    getBlockById();
    getGpById();

    getThemeById();
    getKpiByTheme();
  }, []);
  return (
    <div className="relative overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="absolute flex items-center justify-center bg-primary text-white p-2 rounded top-2 left-4 md:top-10 md:left-20 "
      >
        <ArrowLeftIcon className="w-7 h-5" />
        <p className="hidden md:block"> Back</p>
      </button>
      <div className="flex flex-col px-3 md:flex-row flex-wrap gap-3 pt-10 justify-center items-center">
        <h1 className="text-xl font-bold text-primary">Theme : </h1>
        <p className="text-lg text-center">{theme}</p>
      </div>
      <div className="mx-auto px-4 pb-10 pt-5 w-full md:w-1/2 flex flex-wrap justify-between gap-5">
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold text-lg">State : </h1>
          <p className="text-lg text-gray-700">{state}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold text-lg">District : </h1>
          <p className="text-lg text-gray-700">{dist}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold text-lg">Block : </h1>
          <p className="text-lg text-gray-700">{block}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold text-lg">GP : </h1>
          <p className="text-lg text-gray-700">{gp}</p>
        </div>
      </div>

      {/* Charts area */}

      <div className="h-full grid grid-cols-1 lg:grid-cols-2">
        {kpiData &&
          kpiData.length > 0 &&
          kpiData.map((k) => (
            <ManregsChart
              kpi={k.name}
              kpiId={k.id}
              kpi_img={k.kpi_image}
              theme={id}
            />
          ))}
      </div>
    </div>
  );
};

export default ThemeDataPage;
