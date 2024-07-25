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
import { useAuthContext } from "@/context/AuthContext";
import TableSkeleton from "@/components/ui/tableskeleton";
import StateFilter from "@/components/admin/filter/StateFilter";

function KpiView({ type, onSubmit, kpiApproval }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const [pending, setPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate();
  const [financialYear, setFinancialYear] = useState("");

  const getAllThemes = async () => {
    const { data } = await API.get(`/api/v1/soepr-themes/all`);
    setThemes(data?.themes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    setPending(false);
  };

  useEffect(() => {
    if (state_id) {
      getAllThemes();
    } else {
      setThemes([]);
    }
  }, [state_id]);

  const resetForm = () => {
    setSearchParams({});
  };
  const financialYears = [];

  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

  return (
    <div className="container p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">
          Young Fellow - KPI Entry Form
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <StateFilter />
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
          <TableCaption>List of all themes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Theme Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton columnCount={7} />
          ) : (
            <TableBody>
              {themes.map((theme) => (
                <TableRow>
                  <TableCell>{theme.id}</TableCell>
                  <TableCell>{theme.theme_name}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleGpWiseKpiEdit(theme.id)}>
                      Edit
                    </Button>
                  </TableCell>
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
