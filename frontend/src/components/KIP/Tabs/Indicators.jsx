import React, { useEffect, useState } from "react";
import Themes from "../Themes";
import API from "@/utils/API";
import Progress from "../Progress";
const Indicators = () => {
  const [kpi, setKpi] = useState([]);
  const [gpData, setGpData] = useState([]);
  const [gpWiseKpiData, setGpWiseKpiData] = useState([]);
  const getAllKpi = async () => {
    try {
      const { data } = await API.get("/api/v1/kpi/all");
      setKpi(data.KPI);
      console.log(data.KPI);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const getAllKpiData = async () => {
    const { data } = await API.get(`/api/v1/gp-wise-kpi?page=${1}`);
    setGpData(data?.data);
  };

  const getGpWiseKpiData = async () => {
    try {
      const { data } = await API.get("/api/v1/gp-wise-kpi/indicators");
      setGpWiseKpiData(data.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    // getAllKpiData();
    getGpWiseKpiData();
    getAllKpi();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Indicators</h1>
      <div>
        <Themes />
      </div>
      <div className="flex relative py-20">
        <div class="ml-1/4 flex-1 overflow-x-hidden">
          <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th>
                          <h1 className="text-3xl">Gram Panchayat</h1>
                        </th>
                        {kpi.map((kpi) => (
                          <th
                            scope="col"
                            class="px-4 w-[10rem] py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            key={kpi.id}
                          >
                            {kpi.kpi_name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {gpWiseKpiData.map((gpData, index) => (
                        <tr key={index}>
                          <td>
                            <div class="mb-4">
                              <h3 class="text-xl font-semibold">
                                {gpData.gp_name}
                              </h3>
                              <p>{gpData.taluk_name}</p>
                              <p className="text-lg">{gpData.district_name} </p>
                              <p className="text-sm">{gpData.state_name}</p>
                            </div>
                          </td>
                          {kpi.map((k) => {
                            const kpiData = gpData.gp_percentage.find(
                              (item) => item.kpi_id === k.id
                            );
                            return (
                              <td className="px-8" key={k.id}>
                                {kpiData ? (
                                  <Progress
                                    value={kpiData.percentage.toFixed(2)}
                                  />
                                ) : (
                                  "N/A"
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indicators;
