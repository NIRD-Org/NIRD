import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/utils/API";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NirdEditIcon, NirdViewIcon } from "../../../Icons";
import { useAdminState } from "@/components/hooks/useAdminState";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuthContext } from "@/context/AuthContext";
import useStates from "@/components/hooks/location/useState";

function AdminIndicatorApprovalList() {
  const navigate = useNavigate();
  const [indicators, setIndicators] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIndicators, setTotalIndicators] = useState([]);
  const itemsPerPage = 50;
  const [state_id, setStateId] = useState(null);
  const { adminStates } = useAdminState();
  const { user } = useAuthContext();
  const { states } = useStates();

  const getAllIndicators = async () => {
    try {
      const queryParams = {
        state: state_id,
      };
      const { data } = await API.get(
        `/api/v1/indicator-approvals/get-approvals`,
        { params: queryParams }
      );
      data?.data?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setIndicators(data?.data || []);
      setTotalIndicators(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllIndicators();
  }, [state_id]);

  const handleStatusFilterChange = e => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchQueryChange = e => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredIndicators = indicators.filter(indicator => {
    if (statusFilter !== "all" && indicator.decision !== statusFilter) {
      return false;
    }
    if (
      searchQuery &&
      !indicator.gp_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return indicator.decision !== "1";
  });

  const totalPages = Math.ceil(filteredIndicators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredIndicators.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="p-6">
        <AdminHeader>Indicator Approvals List</AdminHeader>
        {/* <YfLayout /> */}
        <div className="flex justify-between mb-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="0">Submitted</option>
            <option value="1">Approved</option>
            <option value="2">Sent for Modification</option>
          </select>
          <select
            className={"text-sm px-4 py-2 rounded-md bg-white border w-[200px]"}
            value={state_id}
            onChange={e => setStateId(e.target.value)}
          >
            <option value="">Select a state</option>
            {(user.role == 1 ? states : adminStates)?.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
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
                <TableHead>State </TableHead>
                <TableHead>GP</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Date of Sent Back</TableHead>
                <TableHead>Approval Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map(indicator => (
                  <TableRow key={indicator.id}>
                    <TableCell>{indicator.submitted_id}</TableCell>
                    <TableCell>{indicator.state_name}</TableCell>
                    <TableCell>{indicator.gp_name}</TableCell>
                    <TableCell>
                      {new Date(
                        indicator.date || indicator.created_at
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {indicator.decision == 2
                        ? new Date(indicator.modified_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {indicator.decision == 1
                        ? new Date(indicator.modified_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {indicator.decision == 0
                        ? "Submitted"
                        : indicator.decision == 1
                        ? "Approved"
                        : "Sent for modification"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span
                          onClick={() =>
                            navigate(
                              `/admin/view-indicator?submitted_id=${indicator.submitted_id}&indicator_id=${indicator.id}`
                            )
                          }
                        >
                          <NirdViewIcon />
                        </span>
                        {indicator.decision == 0 && user.role != 1 ? (
                          <span
                            onClick={() =>
                              navigate(
                                `/admin/action/admin/approve/indicator?submitted_id=${indicator.submitted_id}&indicator_id=${indicator.id}`
                              )
                            }
                          >
                            <NirdEditIcon />
                          </span>
                        ) : null}
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
}

export default AdminIndicatorApprovalList;
