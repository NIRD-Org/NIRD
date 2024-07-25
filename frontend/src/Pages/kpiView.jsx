import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableSkeleton from "@/components/ui/tableskeleton";
import StateFilter from "@/components/admin/filter/StateFilter";

function KpiView({ type, onSubmit, kpiApproval }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const [pending, setPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [kpiData, setKpiData] = useState([]);
  const navigate = useNavigate();

  const getAllThemes = async () => {
    const { data } = await API.get(`/api/v1/soepr-theme/all`);
    setThemes(data?.themes);
  };

  const getKpiData = async (themeId) => {
    setIsLoading(true);
    try {
      const { data } = await API.get(
        `/api/v1/soepr-kpi-data?theme=${themeId}&state=${state_id}&fy=${financialYear}`
      );
      console.log("Fetched data:", data); // Log fetched data for debugging
      const processedData = processKpiData(data.data);
      console.log("Processed KPI data:", processedData); // Log processed data for debugging
      setKpiData(processedData);
    } catch (error) {
      console.error("Failed to fetch KPI data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processKpiData = (data) => {
    if (!Array.isArray(data)) {
      console.error("Expected data to be an array, but got:", data);
      return [];
    }

    return data.flatMap((entry, index) => {
      const { formData, kpiData } = entry;

      return formData.map((item) => {
        const kpi = kpiData.find((k) => k.id === item.kpi_id);
        return {
          slNo: index + 1,
          kpiName: kpi ? kpi.name : "N/A",
          maxRange: item.max_range,
          achievedValue: item.input_data,
        };
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    // Add any submission logic here
    setPending(false);
  };

  const resetForm = () => {
    setSearchParams({});
    setSelectedTheme("");
    setKpiData([]);
  };

  const financialYears = [];
  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

  useEffect(() => {
    if (state_id) {
      getAllThemes();
    } else {
      setThemes([]);
    }
  }, [state_id]);

  useEffect(() => {
    if (selectedTheme && state_id && financialYear) {
      getKpiData(selectedTheme);
    }
  }, [selectedTheme, state_id, financialYear]);

  return (
    <div className="container p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">
          SoEPR - Data
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <StateFilter />
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full md:w-40 text-center border p-2 rounded-md"
          >
            <option value="">Select Theme</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.theme_name}
              </option>
            ))}
          </select>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="w-full md:w-40 text-center border p-2 rounded-md"
          >
            <option value="">Select Financial Year</option>
            {financialYears.map((year, index) => (
              <option key={index} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
          <Button className="self-end" onClick={() => resetForm()}>
            Reset
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Table className="overscroll-x-scroll">
          <TableCaption>SoEPR - Yearly Status</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Sl. No.</TableHead>
              <TableHead>KPI Name</TableHead>
              <TableHead>Max Range</TableHead>
              <TableHead>Achieved Value</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton columnCount={4} />
          ) : (
            <TableBody>
              {kpiData.map((kpi) => (
                <TableRow key={kpi.slNo}>
                  <TableCell>{kpi.slNo}</TableCell>
                  <TableCell>{kpi.kpiName}</TableCell>
                  <TableCell>{kpi.maxRange}</TableCell>
                  <TableCell>{kpi.achievedValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </form>
    </div>
  );
}

export default KpiView;
