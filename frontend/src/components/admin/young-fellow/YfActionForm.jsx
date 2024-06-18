import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "@/utils/API";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NirdEditIcon, NirdViewIcon } from "../Icons";
import YfLayout from "./YfLayout";

function ActionForm() {
  const [searchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [kpiApprovals, setKpiApprovals] = useState([]);

  const getAllKpiApprovals = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/kpi-approvals/get-kpiapprovals?decision=2`
      );
      console.log(data);
      // data?.data?.sort((a, b) => a.id - b.id);
      data?.data?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setKpiApprovals(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllKpiApprovals();
  }, []);

  const handleNavigate = (id, submitted_id, kpiApprovalId) => {
    if (id === 1) {
      navigate(
        `/admin/update-gp-wise-kpi?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${theme_id}&submitted_id=${submitted_id}&kpi_approval_id=${kpiApprovalId}`
      );
    } else if (id === 2) {
      navigate(
        `/admin/view-kpi-approval?state_id=${state_id}&dist_id=${dist_id}&block_id=${block_id}&gram_id=${gram_id}&theme_id=${theme_id}&submitted_id=${submitted_id}&kpi_approval_id=${kpiApprovalId}`
      );
    }
  };

  return (
    <div>
      <div className="p-6">
        {/* <YfLayout /> */}
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submission ID</TableHead>
                <TableHead>Theme</TableHead>
                <TableHead>GP</TableHead>
                <TableHead>Submisson Date</TableHead>
                <TableHead>Date of Sent Back</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiApprovals.length > 0 ? (
                kpiApprovals.map((kpiApproval) => (
                  <TableRow key={kpiApproval.id}>
                    <TableCell>{kpiApproval?.submitted_id}</TableCell>
                    <TableCell>{kpiApproval.theme_name}</TableCell>
                    <TableCell>{kpiApproval.gp_name}</TableCell>
                    <TableCell>
                      {new Date(
                        kpiApproval.date || kpiApproval.created_at
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {kpiApproval.decision == 2
                        ? new Date(kpiApproval.modified_at).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        {kpiApproval.decision == 2 && (
                          <span
                            onClick={() =>
                              navigate(
                                `/admin/update-gp-wise-kpi?state_id=${kpiApproval.state_id}&dist_id=${kpiApproval.dist_id}&block_id=${kpiApproval.block_id}&gram_id=${kpiApproval.gp_id}&theme_id=${kpiApproval.theme_id}&submitted_id=${kpiApproval.submitted_id}&kpi_approval_id=${kpiApproval.kpiApprovalId}`
                              )
                            }
                          >
                            <NirdEditIcon />
                          </span>
                        )}
                        <span
                          onClick={() =>
                            navigate(
                              `/admin/view-kpi-approval?state_id=${kpiApproval.state_id}&dist_id=${kpiApproval.dist_id}&block_id=${kpiApproval.block_id}&gram_id=${kpiApproval.gp_id}&theme_id=${kpiApproval.theme_id}&submitted_id=${kpiApproval.submitted_id}&kpi_approval_id=${kpiApproval.kpiApprovalId}`
                            )
                          }
                        >
                          <NirdViewIcon />
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ActionForm;
