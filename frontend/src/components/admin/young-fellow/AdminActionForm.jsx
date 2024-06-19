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

function AdminActionForm() {
  const [searchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [kpiApprovals, setKpiApprovals] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApprovals,setTotalApprovals] = useState([])
  const itemsPerPage = 50;

  const getAllKpiApprovals = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/kpi-approvals/get-kpiapprovals?state=${state_id}&dist=${dist_id}&block=${block_id}&gp=${gram_id}&theme=${theme_id}`
      );
      data?.data?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setKpiApprovals(data?.data || []);
      setTotalApprovals(data?.data || []);
      console.log(kpiApprovals)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllKpiApprovals();
  }, []);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    if(e.target.value=='all') return;
    const newData = totalApprovals.filter(data=>data.decision==e.target.value);

    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    // setKpiApprovals(prev=>prev.filter(data=>data.));
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  const filteredKpiApprovals = kpiApprovals.filter((kpiApproval) => {
    if (statusFilter !== "All" && kpiApproval.decision !== statusFilter) {
      return false;
    }
    if (
      searchQuery &&
      !kpiApproval.gp_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredKpiApprovals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredKpiApprovals.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="p-6">
        {/* <YfLayout /> */}
        <div className="flex justify-between mb-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="1">Approved</option>
            <option value="2">Sent for Modification</option>
            <option value="0">Submitted</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search by GP name"
            className="p-2 border rounded"
          />
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submission ID</TableHead>
                <TableHead>Theme</TableHead>
                <TableHead>GP</TableHead>
                <TableHead>Submisson Date</TableHead>
                <TableHead>Date of Sent Back</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((kpiApproval) => (
                  <TableRow key={kpiApproval.id}>
                    <TableCell>{kpiApproval.submitted_id}</TableCell>
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
                      {kpiApproval.decision == 0
                        ? "Submitted"
                        : kpiApproval.decision == 1
                        ? "Approved"
                        : "Sent for modification"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {kpiApproval.decision == 0 && (
                          <span
                            onClick={() =>
                              navigate(
                                `/admin/submit-kpi-approval?state_id=${kpiApproval.state_id}&dist_id=${kpiApproval.dist_id}&block_id=${kpiApproval.block_id}&gram_id=${kpiApproval.gp_id}&theme_id=${kpiApproval.theme_id}&submitted_id=${kpiApproval.submitted_id}&kpi_approval_id=${kpiApproval.kpiApprovalId}`
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
                  <TableCell colSpan="7" className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border rounded"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminActionForm;