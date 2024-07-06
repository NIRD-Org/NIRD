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
import StateFilter from "../filter/StateFilter";
import DistrictFilter from "../filter/DistrictFilter";
import BlockFilter from "../filter/BlockFilter";
import GramFilter from "../filter/GramFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import TableSkeleton from "@/components/ui/tableskeleton";

function YoungFellowForm({ type, onSubmit, kpiApproval }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const [pending, setPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate();

  const getAllThemes = async () => {
    const { data } = await API.get(`/api/v1/theme/all`);
    setThemes(data?.themes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    setPending(false);
  };

  useEffect(() => {
    if (gram_id) {
      getAllThemes();
    } else {
      setThemes([]);
    }
  }, [gram_id]);

  const handleGpWiseKpiEdit = id => {
    navigate(`/admin/gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${id}`);
  };

  const resetForm = () => {
    setSearchParams({});
  };

  return (
    <div className="container p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">
          Young Fellow - KPI Entry Form
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <StateFilter yf/>
          <DistrictFilter yf/>
          <BlockFilter yf/>
          <GramFilter yf/>
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

export default YoungFellowForm;
