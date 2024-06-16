import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { NirdEditIcon } from "../Icons";

function GpWiseKpiList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [kpiApprovals, setKpiApprovals] = useState([]);
  const [state, setState] = useState({});
  const [dist, setDist] = useState({});
  const [block, setBlock] = useState({});
  const [gram, setGram] = useState({});
  const [theme, setTheme] = useState({});

  const getAllKpiApprovals = async () => {
    try {
      const { data } = await API.get(`/api/v1/kpi-approvals/get-kpiapprovals?state=${state_id}&dist=${dist_id}&block=${block_id}&gram=${gram_id}&theme=${theme_id}`);
      data?.data?.sort((a, b) => a.id - b.id);
      setKpiApprovals(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getState = async () => {
    try {
      const { data } = await API.get(`/api/v1/state/get-state/${state_id}`);
      setState(data?.state);
    } catch (error) {
      console.log(error);
    }
  };

  const getDist = async () => {
    try {
      const { data } = await API.get(`/api/v1/dist/get-dist/${dist_id}`);
      setDist(data?.district);
    } catch (error) {
      console.log(error);
    }
  };

  const getBlock = async () => {
    try {
      const { data } = await API.get(`/api/v1/block/get-blocks/${block_id}`);
      setBlock(data?.block);
    } catch (error) {
      console.log(error);
    }
  };

  const getGram = async () => {
    try {
      const { data } = await API.get(`/api/v1/gram/get-gram/${gram_id}`);
      setGram(data?.gp);
    } catch (error) {
      console.log(error);
    }
  };

  const getTheme = async () => {
    try {
      const { data } = await API.get(`/api/v1/theme/get-theme/${theme_id}`);
      setTheme(data?.theme);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state_id && dist_id && block_id && gram_id && theme_id) {
      getAllKpiApprovals();
      getState();
      getDist();
      getBlock();
      getGram();
      getTheme();
    }
  }, [state_id, dist_id, block_id, gram_id, theme_id]);

  const handleGpWiseKpiEdit = () => {
    navigate(`/admin/add-gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${theme_id}`);
  };
  return (
    <div>
      <div className="p-6">
        <div className=" mt-4">
          <div className="flex justify-around">
            <h3>
              <strong>State:</strong> {state?.name}
            </h3>
            <h3>
              <strong>District:</strong> {dist?.name}
            </h3>
            <h3>
              <strong>Block:</strong> {block?.name}
            </h3>
            <h3>
              <strong>GP:</strong> {gram?.name}
            </h3>
          </div>
          <div className="text-center mt-16">
            <h3>
              <strong>Theme:</strong> {theme?.theme_name}
            </h3>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Button onClick={handleGpWiseKpiEdit}>Add New</Button>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Theme</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiApprovals.map(kpiApproval => (
                <TableRow key={kpiApproval.id}>
                  <TableCell>{kpiApproval.id}</TableCell>
                  <TableCell>{kpiApproval.theme_name}</TableCell>
                  <TableCell>{new Date(kpiApproval.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{kpiApproval.decision == 0 ? "Submitted" : "Send Back"}</TableCell>
                  <TableCell><NirdEditIcon/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default GpWiseKpiList;

