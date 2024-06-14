import React, { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import ThemeRow from "../theme/ThemeRow";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StateFilter from "../filter/StateFilter";
import DistrictFilter from "../filter/DistrictFilter";
import BlockFilter from "../filter/BlockFilter";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import GramFilter from "../filter/GramFilter";
import { useNavigate, useSearchParams } from "react-router-dom";

function YoungFellowForm({ type, onSubmit, kpiApproval }) {
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
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [themes, setThemes] = useState([]);
  const [gps, setGps] = useState([]);
  const navigate = useNavigate();

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStates(data?.states);
  };

  const getAllDistricts = async () => {
    const { data } = await API.get(`/api/v1/dist/state/${formData.state_id}`);
    setDistricts(data?.districts);
  };

  const getAllBlocks = async () => {
    try {
      const url = `/api/v1/block/get?state=${formData.state_id}&dist=${formData.dist_id}`;
      const { data } = await API.get(url);
      setBlocks(data?.blocks);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGp = async () => {
    try {
      const { data } = await API.get(`/api/v1/gram/get?dist=${formData.dist_id}&state=${formData.state_id}&block=${formData.block_id}`);
      setGps(data?.gram);
    } catch (error) {}
  };

  const getAllThemes = async () => {
    const { data } = await API.get(`/api/v1/theme/all`);
    setThemes(data?.themes);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    getAllDistricts();
  }, [formData.state_id]);

  useEffect(() => {
    getAllBlocks();
    getAllGp();
  }, [formData.dist_id]);

  const handleSubmit = e => {
    e.preventDefault();
    setPending(true);
    onSubmit(formData);
    setPending(false);
  };

  if (gram_id) {
    getAllThemes();
  }

  const handleGpWiseKpiEdit = (id) => {
    navigate(`/admin/gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${id}`);
  };

  return (
    <div className="container p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">Young Fellow Form - Edit</h2>
        <div className="w-full grid grid-cols-5 gap-10">
          <StateFilter />
          <DistrictFilter />
          <BlockFilter />
          <GramFilter />
          <Button onClick={handleSubmit}>Search</Button>
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
                    <Button onClick={()=>handleGpWiseKpiEdit(theme.id)}>Edit</Button>
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
