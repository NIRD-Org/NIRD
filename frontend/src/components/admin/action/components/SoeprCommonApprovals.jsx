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
import useStates from "@/components/hooks/location/useStates";
import { useAuthContext } from "@/context/AuthContext";
import { useSoeprState } from "@/components/hooks/soepr-location/useSoeprState";
import { useSoeprAdminStates } from "@/components/hooks/soepr-location/useSoeprAdminState";

const SoeprCommonApprovalsList = ({
  apiEndpoint,
  title,
  columns,
  redirect,
  master,
  normal,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [state_id, setStateId] = useState(null);
  const { states } = useSoeprAdminStates();
  const { soeprStates: adminStates } = useSoeprState();
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllApprovals = async () => {
      try {
        const { data } = await API.get(apiEndpoint, {
          params: {
            state_id,
          },
        });
        data?.data?.sort((a, b) => b.id - a.id);
        setApprovals(data?.data || []);
      } catch (error) {
        console.log("Error fetching Approvals:", error);
      }
    };

    getAllApprovals();
  }, [state_id]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredApprovals = approvals.filter((approval) => {
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="p-6">
        <AdminHeader>{title}</AdminHeader>
        <div className="flex justify-between mb-4">
          {!normal && (
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className={
                "text-sm px-4 py-2 rounded-md bg-white border w-[200px]"
              }
            >
              <option value="all">All</option>
              {/* <option value="0">Pending</option>
              <option value="1">Approved</option>
              <option value="2">Sent back for Modification</option> */}
            </select>
          )}
          {user.role != 5 && (
            <select
              className={
                "text-sm px-4 py-2 rounded-md bg-white border w-[200px]"
              }
              value={state_id}
              onChange={(e) => setStateId(e.target.value)}
            >
              <option value="">Select a state</option>
              {(user.role == 1 ? states : adminStates)?.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          )}
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
                {columns.map((col, index) => (
                  <TableHead key={index}>{col.header}</TableHead>
                ))}
                {!normal && <TableHead>Status</TableHead>}

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((approval) => (
                  <TableRow key={approval._id}>
                    {columns.map((col, index) => (
                      <TableCell key={index}>{col.render(approval)}</TableCell>
                    ))}
                    {!normal && (
                      <TableCell>
                        {approval.decision == 0
                          ? "Pending"
                          : approval.decision == 1
                          ? "Approved"
                          : "Sent back for Modification"}
                      </TableCell>
                    )}
                    {!normal && (
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {approval.decision == 0 && user.role == 2 && (
                            <span
                              onClick={() =>
                                navigate(
                                  `/admin/approve/${redirect}/${
                                    master ? approval.submitted_id : approval.id
                                  }`
                                )
                              }
                            >
                              <NirdEditIcon />
                            </span>
                          )}
                          {user.role == 3 && approval.decision == 2 && (
                            <span
                              onClick={() =>
                                navigate(
                                  `/admin/resubmit/${redirect}/${
                                    master ? approval.submitted_id : approval.id
                                  }`
                                )
                              }
                            >
                              <NirdEditIcon />
                            </span>
                          )}
                          {user.role == 3 &&
                            approval.decision == 0 &&
                            master && (
                              <span
                                onClick={() =>
                                  navigate(
                                    `/admin/edit/${redirect}/${
                                      master
                                        ? approval.submitted_id
                                        : approval.id
                                    }`
                                  )
                                }
                              >
                                <NirdEditIcon />
                              </span>
                            )}
                          <span
                            onClick={() =>
                              navigate(`/admin/view/${redirect}/${approval.id}`)
                            }
                          >
                            <NirdViewIcon />
                          </span>
                        </div>
                      </TableCell>
                    )}
                    {normal && (
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span
                            onClick={() =>
                              navigate(`/admin/view/${redirect}/${approval.id}`)
                            }
                          >
                            <NirdViewIcon />
                          </span>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center"
                  >
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

export default SoeprCommonApprovalsList;
