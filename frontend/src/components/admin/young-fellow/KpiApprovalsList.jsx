import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NirdEditIcon, NirdViewIcon } from "../Icons";
import YfLayout from "./YfLayout";

function KpiApprovalsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [kpiApprovals, setKpiApprovals] = useState([]);

  const getAllKpiApprovals = async () => {
    try {
      const { data } = await API.get(`/api/v1/kpi-approvals/get-kpiapprovals?state=${state_id}&dist=${dist_id}&block=${block_id}&gram=${gram_id}&theme=${theme_id}`);
      data?.data?.sort((a, b) => a.id - b.id);
      setKpiApprovals(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state_id && dist_id && block_id && gram_id && theme_id) {
      getAllKpiApprovals();
    }
  }, [state_id, dist_id, block_id, gram_id, theme_id]);

  const handleGpWiseKpiEdit = () => {
    navigate(`/admin/add-gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${theme_id}`);
  };

  return (
    <div>
      <div className="p-6">
        <YfLayout />
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
                  <TableCell>{kpiApproval.decision == 0 ? "Submitted" : "Sent Back"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span onClick={() => navigate(`/admin/kpi-approval-submit/${kpiApproval.id}`)}>
                        <NirdEditIcon />
                      </span>
                      <span onClick={() => navigate(`/admin/kpi-approval-view/${kpiApproval.id}`)}>
                        <NirdViewIcon />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default KpiApprovalsList;
