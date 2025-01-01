import React, { useEffect, useState } from "react";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import API from "@/utils/API";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { NirdEditIcon, NirdViewIcon } from "../../Icons";
import { Link } from "react-router-dom";

const POAview = () => {
  const [poaRecords, setPoaRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchPOARecords = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/v1/poa1/getUserPOAs");
        if (response.data && response.data.data) {
          setPoaRecords(response.data.data);
        } else {
          toast.error("Unexpected response format from server.");
        }
      } catch (error) {
        console.error("Error fetching POA records:", error);
        toast.error("Failed to fetch POA records. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPOARecords();
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredRecords = poaRecords.filter((record) => {
    try {
      const createdAt = new Date(record.created_at);
      const recordYear = createdAt.getFullYear();
      const recordMonth = createdAt.toLocaleString("en-IN", { month: "long" });

      return (
        (!selectedYear || recordYear.toString() === selectedYear) &&
        (!selectedMonth || recordMonth === selectedMonth)
      );
    } catch (error) {
      console.error("Error parsing date:", error);
      return false;
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDate = (date)=>{
    if(!date) return;
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>Plan of Action Records</AdminHeader>

      <div className="flex gap-4 my-4">
        Select Month and Year :
        <select onChange={handleYearChange} value={selectedYear}>
          <option value="">All Years</option>
          {[
            ...new Set(
              poaRecords
                .map((record) => {
                  try {
                    return new Date(record.created_at).getFullYear();
                  } catch {
                    return null;
                  }
                })
                .filter(Boolean)
            ),
          ].map((year, idx) => (
            <option key={idx} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select onChange={handleMonthChange} value={selectedMonth}>
          <option value="">All Months</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, idx) => (
            <option key={idx} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <Table className="mt-4">
        <TableCaption>List of POA Records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>

            <TableHead>Poa Type</TableHead>
            <TableHead>Poa Status</TableHead>
            <TableHead>Approval/Revert Date</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.map((record, idx) => {
            try {
              const createdAt = new Date(record.created_at);
              return (
                <>
                  {record?.poaSubmitted.poa1 && (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell> {/* Serial number */}
                      <TableCell>
                        {createdAt.toLocaleString("en-IN", { month: "long" })}
                      </TableCell>
                      <TableCell>{createdAt.getFullYear()}</TableCell>
                      <TableCell>Poa1</TableCell>
                      <TableCell>
                        {record.poa1_approval_status == "0"
                          ? "Approval Pending"
                          : record.poa1_approval_status == "1"
                          ? "Approved"
                          : record.poa1_approval_status == "2" &&
                            "Reverted Back"}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {record.poa1_approval_status == "1"
                          ? formatDate(record.poa1_approval_date)
                          : record.poa1_approval_status == "2"
                          ? formatDate(record.poa1_revert_date)
                          : "N/A"}
                      </TableCell>
                      <TableCell className="flex gap-4">
                        <Link
                          to={`/admin/soepr/POA1/view/${record.id}?poaType=poa1`}
                        >
                          <NirdViewIcon />
                        </Link>
                        {record.poa1_approval_status != "1" && (
                          <Link
                            to={`/admin/soepr/POA1/edit/${record.id}?poaType=poa1`}
                          >
                            <NirdEditIcon />
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                  {record?.poaSubmitted.poa2 && (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell> {/* Serial number */}
                      <TableCell>
                        {createdAt.toLocaleString("en-IN", { month: "long" })}
                      </TableCell>
                      <TableCell>{createdAt.getFullYear()}</TableCell>
                      <TableCell>Poa2</TableCell>
                      <TableCell>
                        {record.poa2_approval_status == "0"
                          ? "Approval Pending"
                          : record.poa2_approval_status == "1"
                          ? "Approved"
                          : record.poa2_approval_status == "2" &&
                            "Reverted Back"}
                      </TableCell>
                      <TableCell>
                        {record.poa2_approval_status == "1"
                          ? formatDate(record.poa2_approval_date)
                          : record.poa2_approval_status == "2"
                          ? formatDate(record.poa2_revert_date)
                          : "N/A"}
                      </TableCell>
                      <TableCell className="flex gap-4">
                        <Link
                          to={`/admin/soepr/POA1/view/${record.id}?poaType=poa2`}
                        >
                          <NirdViewIcon />
                        </Link>
                        {record.poa2_approval_status != "1" && (
                          <Link
                            aria-disabled={record.poa2_approval_status == "1"}
                            to={`/admin/soepr/POA1/edit/${record.id}?poaType=poa2`}
                          >
                            <NirdEditIcon />
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            } catch (error) {
              console.error("Error rendering record:", error);
              return null;
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default POAview;
