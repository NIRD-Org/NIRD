import ManregsChart from "@/components/KIP/charts/theme1/MenregsChart";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KPIDataComponent = {};

const ThemeDataPage = () => {
  const { id } = useParams();
  const [theme, setTheme] = useState();
  const [kpiData, setKpiData] = useState([]);
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

  useEffect(() => {
    getThemeById();
    getKpiByTheme();
  }, []);
  return (
    <div className=" overflow-hidden">
      <div className="flex flex-col md:flex-row flex-wrap gap-3 pt-10 justify-center items-center">
        <h1 className="text-xl font-bold text-primary">Theme : </h1>
        <p className="text-lg text-center">{theme}</p>
      </div>
      <div className="mx-auto pb-10 pt-5 w-1/2 flex flex-wrap justify-between gap-5">
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold text-lg">State : </h1>
          <p className="text-lg text-gray-700">State</p>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold text-lg">District : </h1>
          <p className="text-lg text-gray-700">District</p>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold text-lg">Block : </h1>
          <p className="text-lg text-gray-700">Block</p>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold text-lg">GP : </h1>
          <p className="text-lg text-gray-700">Bhanoli</p>
        </div>
      </div>

      {/* Charts area */}

      <div className="w-full h-full">
        {kpiData &&
          kpiData.length > 0 &&
          kpiData.map((k) => (
            <ManregsChart kpi={k.name} kpiId={k.id} theme={id} />
          ))}
      </div>
    </div>
  );
};

export default ThemeDataPage;
