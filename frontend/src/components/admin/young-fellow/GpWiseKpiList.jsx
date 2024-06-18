import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { NirdEditIcon, NirdViewIcon } from "../Icons";
import YfLayout from "./YfLayout";

function GpWiseKpiList() {
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
      const response = await API.get(`/api/v1/kpi-approvals/get-kpiapprovals?decision=0&theme=${theme_id}`);
      let data = response.data.data;
      data?.sort((a, b) => a.created_at - b.created_at);
      data = data?.filter(item => item.decision != 1);
      setKpiApprovals(data || []);
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

  const handleNavigate = (id, submitted_id, kpiApprovalId) => {
    if (id === 1) {
      navigate(`/admin/update-gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${theme_id}&submitted_id=${submitted_id}&kpi_approval_id=${kpiApprovalId}`);
    } else if (id === 2) {
      navigate(`/admin/view-kpi-approval?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${theme_id}&submitted_id=${submitted_id}&kpi_approval_id=${kpiApprovalId}`);
    }
  };

  return (
    <div>
      <div className="p-6">
        <YfLayout />
        <div className="flex justify-center mt-10">
          <Button onClick={handleGpWiseKpiEdit}>Add New</Button>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submission ID</TableHead>
                <TableHead>Theme</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiApprovals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="5" className="text-center ">No data found</TableCell>
                </TableRow>
              ) : (
                kpiApprovals.map(kpiApproval => (
                  <TableRow key={kpiApproval.id}>
                    <TableCell>{kpiApproval.id}</TableCell>
                    <TableCell>{kpiApproval.theme_name}</TableCell>
                    <TableCell>{new Date(kpiApproval.date || kpiApproval.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{kpiApproval.decision == 0 ? "Submitted" : kpiApproval.decision == 1 ? "Approved" : "Send for modification"}</TableCell>
                    <TableCell>
                      {kpiApproval.decision != 0 ? (
                        <div className="flex gap-2">
                          <span onClick={() => handleNavigate(2, kpiApproval.submitted_id, kpiApproval.id)}>
                            <NirdViewIcon />
                          </span>
                          <span onClick={() => handleNavigate(1, kpiApproval.submitted_id, kpiApproval.id)}>
                            <NirdEditIcon />
                          </span>
                        </div>
                      ) : (
                        <span
                          onClick={() => handleNavigate(2, kpiApproval.submitted_id, kpiApproval.id)}
                        >
                          <NirdViewIcon />
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default GpWiseKpiList;
