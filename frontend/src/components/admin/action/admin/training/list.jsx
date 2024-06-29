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
import { NirdEditIcon, NirdViewIcon } from "@/components/admin/Icons";
import AdminHeader from "@/components/admin/AdminHeader";
import { Input } from "@/components/ui/input";
import { useAdminState } from "@/components/hooks/useAdminState";

const TrainingApprovalsList = () => {
  const navigate = useNavigate();
  const [trainingApprovals, setTrainingApprovals] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [state_id, setStateId] = useState(null);
  const { adminStates } = useAdminState();

  useEffect(() => {
    getAllTrainingApprovals();
  }, [state_id]);

  const getAllTrainingApprovals = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/training/all?state_id=${state_id || ""}`,
      );
      data?.data?.sort((a, b) => b.id - a.id);
      setTrainingApprovals(data?.data || []);
    } catch (error) {
      console.log("Error fetching Training Approvals:", error);
    }
  };

  const handleStatusFilterChange = e => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchQueryChange = e => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredApprovals = trainingApprovals.filter(approval => {
    if (
      statusFilter !== "all" &&
      approval.decision.toString() !== statusFilter
    ) {
      return false;
    }
    if (
      searchQuery &&
      !approval.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredApprovals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="p-6">
        <AdminHeader>Training Approvals List</AdminHeader>
        <div className="flex justify-between mb-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="0">Not Approved</option>
            <option value="1">Approved</option>
            <option value="2">Sent back for Approval</option>
          </select>
          <select
            className={"text-sm px-4 py-2 rounded-md bg-white border w-[200px]"}
            value={state_id}
            onChange={e => setStateId(e.target.value)}
          >
            <option value="">Select a state</option>
            {adminStates?.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search by Training Title"
            className="w-min"
          />
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Programme Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Online/Offline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map(approval => (
                  <TableRow key={approval._id}>
                    <TableCell>{approval.programmeCode}</TableCell>
                    <TableCell>{approval.title}</TableCell>
                    <TableCell>{approval.type}</TableCell>
                    <TableCell>{approval.onlineOffline}</TableCell>
                    <TableCell>
                      {approval.decision === 0
                        ? "Pending"
                        : approval.decision === 1
                        ? "Approved"
                        : "Sent back for Modification"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {approval.decision === 0 && (
                          <span
                            onClick={() =>
                              navigate(`/admin/approve/training/${approval.id}`)
                            }
                          >
                            <NirdEditIcon />
                          </span>
                        )}
                        <span
                          onClick={() =>
                            navigate(`/admin/view/training/${approval.id}`)
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
                  <TableCell colSpan="8" className="text-center">
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
            <span>
              Page {currentPage} of {totalPages}
            </span>
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
};

export default TrainingApprovalsList;