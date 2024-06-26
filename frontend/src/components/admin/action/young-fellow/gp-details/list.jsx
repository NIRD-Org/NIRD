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

const GpDetailsApprovalsListYf = () => {
  const [searchParams] = useSearchParams();
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const navigate = useNavigate();

  const [gpDetailsApprovals, setGpDetailsApprovals] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  
  useEffect(() => {
    getAllGpDetailsApprovals();
  }, []);

  const getAllGpDetailsApprovals = async () => {
    try {
      const { data } = await API.get(`/api/v1/gp-details/all`, {
        params: {
          dist_id,
          block_id,
          gp_id: gram_id,
          decision:2
        },
      });
      data?.data?.sort((a, b) => b.id - a.id);
      setGpDetailsApprovals(data?.data || []);
    } catch (error) {
      console.log("Error fetching GP Details Approvals:", error);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredApprovals = gpDetailsApprovals.filter((approval) => {
    if (statusFilter !== "all" && approval.decision.toString() !== statusFilter) {
      return false;
    }
    if (searchQuery && !approval.gp_name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredApprovals.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="p-6">
        <AdminHeader>GP Details Approvals List</AdminHeader>
        <div className="flex justify-between mb-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="0">Not Approved</option>
            <option value="1">Approved</option>
            <option value="2">Sent back for Modification</option>
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
                <TableHead>Submitted Id</TableHead>
                <TableHead>GP Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((approval) => (
                  <TableRow key={approval._id}>
                    <TableCell>{approval.id}</TableCell>
                    <TableCell>{approval.gp_name}</TableCell>
                    <TableCell>
                      {approval.decision == 0
                        ? "Pending"
                        : approval.decision == 1
                        ? "Approved"
                        : "Sent back for Modification"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {approval.decision == 2 && (
                          <span
                            onClick={() =>
                              navigate(`/admin/resubmit/gp-details/${approval.id}`)
                            }
                          >
                            <NirdEditIcon />
                          </span>
                        )}
                        <span
                          onClick={() =>
                            navigate(`/admin/view/gp-details/${approval.id}`)
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
                  <TableCell colSpan="4" className="text-center">
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

export default GpDetailsApprovalsListYf;
