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

const LCVAApprovalsList = () => {
  const [searchParams] = useSearchParams();
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [lCVAApprovals, setLCVAApprovals] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [state_id, setStateId] = useState(null);
  const { adminStates } = useAdminState();  

  useEffect(() => {
    getAllLCVAApprovals();
  }, [state_id]);

  const getAllLCVAApprovals = async () => {
    try {
      const { data } = await API.get(`/api/v1/lcva/all`, {
        params: {
          state_id,
          dist_id,
          block_id,
          gp_id: gram_id,
          theme_id,
        },
      });
      data?.data?.sort((a, b) => b.id - a.id);
      setLCVAApprovals(data?.data || []);
    } catch (error) {
      console.log("Error fetching LCVA Approvals:", error);
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

  const filteredApprovals = lCVAApprovals.filter(approval => {
    if (
      statusFilter !== "all" &&
      approval.decision.toString() !== statusFilter
    ) {
      return false;
    }
    if (
      searchQuery &&
      !approval.gp_name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <AdminHeader>LCVA Approvals List</AdminHeader>
        <div className="flex justify-between mb-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className={"text-sm px-4 py-2 rounded-md bg-white border w-[200px]"}
          >
            <option value="all">All</option>
            <option value="0">Not Approved</option>
            <option value="1">Approved</option>
            <option value="2">Sent back for Modification</option>
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
            placeholder="Search by GP"
            className="w-min"
          />
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submitted Id </TableHead>
                <TableHead>Theme </TableHead>
                <TableHead>GP </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map(approval => (
                  <TableRow key={approval._id}>
                    <TableCell>{approval.id}</TableCell>
                    <TableCell>{approval.theme_name}</TableCell>
                    <TableCell>{approval.gp_name}</TableCell>
                    <TableCell>
                      {approval.decision == 0
                        ? "Pending"
                        : approval.decision == 1
                        ? "Approved"
                        : "Sent back for Approval"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {approval.decision == 0 && (
                          <span
                            onClick={() =>
                              navigate(
                                `/admin/approve/lcva/${approval.id}`
                              )
                            }
                          >
                            <NirdEditIcon />
                          </span>
                        )}
                        <span
                          onClick={() =>
                            navigate(`/admin/view/lcva/${approval.id}`)
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

export default LCVAApprovalsList;
