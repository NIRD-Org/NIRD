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
import StateFilter from "../../filter/StateFilter";

function SoeprYoungFellowForm({ type, onSubmit, kpiApproval }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const [pending, setPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate();

  const getAllThemes = async () => {
    const { data } = await API.get(`/api/v1/soepr-theme/all`);
    setThemes(data?.themes);
  };

  useEffect(() => {
    getAllThemes();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setPending(true);
    setPending(false);
  };

  const handleGpWiseKpiEdit = id => {
    navigate(`/admin/soepr/gp-wise-kpi?state_id=${state_id}&theme_id=${id}`);
  };

  const resetForm = () => {
    setSearchParams({});
  };

  return (
    <div className="container p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">
          SoEPR - KPI Entry Form
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <StateFilter />
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
              {themes.map(theme => (
                <TableRow>
                  <TableCell>{theme.id}</TableCell>
                  <TableCell>{theme.theme_name}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleGpWiseKpiEdit(theme.id)}>Edit</Button>
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

export default SoeprYoungFellowForm;
