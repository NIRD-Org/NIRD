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
import {  NirdEditIcon, NirdViewIcon } from "../Icons";

function YFIndicatorApprovalList() {
  const [searchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [indicators, setIndicators] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIndicators, setTotalIndicators] = useState([]);
  const itemsPerPage = 50;

  const getAllIndicators = async () => {
    try {
      const queryParams = {
        state: state_id,
        dist: dist_id,
        block: block_id,
        gp: gram_id,
        theme: theme_id,
        decision: "2",
      };
      const { data } = await API.get(`/api/v1/indicator-approvals/get-approvals`, { params: queryParams });
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
  }, []);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const filteredIndicators = indicators.filter((indicator) => {
    if (statusFilter !== "all" && indicator.status !== statusFilter) {
      return false;
    }
    if (
      searchQuery &&
      !indicator.gp_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return indicator.status !== "approved"; 
  });

  const totalPages = Math.ceil(filteredIndicators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredIndicators.slice(startIndex, startIndex + itemsPerPage);

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
            <option value="submitted">Submitted</option>
            <option value="modification">Sent for Modification</option>
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
                <TableHead>Submission Date</TableHead>
                <TableHead>Date of Sent Back</TableHead>
                <TableHead>Approval Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((indicator) => (
                  <TableRow key={indicator.id}>
                    <TableCell>{indicator.submitted_id}</TableCell>
                    <TableCell>{indicator.theme_name}</TableCell>
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
                     {
                        indicator.decision == 2 ? (
                          <span
                            onClick={() =>
                              navigate(
                                `/admin/action/young-fellow/resubmit/indicator?submitted_id=${indicator.submitted_id}&indicator_id=${indicator.id}`
                              )
                            }
                          >
                            <NirdEditIcon />
                          </span>
                        ) : null
                     }
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

export default YFIndicatorApprovalList;
