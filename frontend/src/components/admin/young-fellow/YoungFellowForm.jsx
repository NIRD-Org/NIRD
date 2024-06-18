import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import ThemeRow from "../theme/ThemeRow";
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
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import GramFilter from "../filter/GramFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

function YoungFellowForm({ type, onSubmit, kpiApproval }) {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    id: kpiApproval ? kpiApproval.id : "",
    state_id: kpiApproval ? kpiApproval.state_id : "",
    district_id: kpiApproval ? kpiApproval.district_id : "",
    block_id: kpiApproval ? kpiApproval.block_id : "",
    gp_id: kpiApproval ? kpiApproval.gp_id : "",
    theme_id: kpiApproval ? kpiApproval.theme_id : "",
    decision: kpiApproval ? kpiApproval.decision : "",
    submitted_id: kpiApproval ? kpiApproval.submitted_id : "",
    remarks: kpiApproval ? kpiApproval.remarks : "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
// console.log(user.role);
  const handleGpWiseKpiEdit = id => {
    // console.log(user.role);
    navigate(`/admin/gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${id}`);
    // navigate(`/admin/add-gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${id}`);
  };

  const resetForm = () => {
    console.log("first");
    setSearchParams({});
  };

  return (
    <div className="container p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">
          Young Fellow - KPI Entry Form
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <StateFilter />
          <DistrictFilter />
          <BlockFilter />
          <GramFilter />
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
