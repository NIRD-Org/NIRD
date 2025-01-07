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
  const [tableRows, setTableRows] = useState([]);

  const [loading, setLoading] = useState(false);

  // For filter dropdowns
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // --- Static Years and Months ---
  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const months = [
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
  ];

  // Format a date to DD/MM/YYYY or "N/A"
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // 1. Fetch data
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

  // 2. Build a flat array of rows from poaRecords
  useEffect(() => {
    const newRows = [];
    let rowCounter = 1; // For Sl. No across all rows

    poaRecords.forEach((record) => {
      try {
        // The "main" month for the record we show in the table
        const createdAt = new Date(record.created_at);
        const displayMonth = createdAt.toLocaleString("en-IN", {
          month: "long",
        });
        // We'll also get a "createdAtYear" for POA2 usage
        const createdAtYear = createdAt.getFullYear();

        // ---------- POA1 Row ----------
        if (record?.poaSubmitted?.poa1) {
          // For POA1, the "Year" displayed in the table was taken from `record.poaData[0].date`
          const poa1Year = new Date(record.poaData[0].date).getFullYear();

          newRows.push({
            key: record.id + "-poa1",
            slNo: rowCounter,
            month: displayMonth, // The same month we show in the table
            year: poa1Year.toString(), // Convert to string for filtering
            poaType: "Poa1",
            approvalStatus: record.poa1_approval_status,
            approvalDate: record.poa1_approval_date,
            revertDate: record.poa1_revert_date,
            remarks: record.poa1_remarks,
            recordId: record.id,
          });
          rowCounter++;
        }

        // ---------- POA2 Row ----------
        if (record?.poaSubmitted?.poa2) {
          // For POA2, the "Year" displayed was from `createdAt.getFullYear()`
          newRows.push({
            key: record.id + "-poa2",
            slNo: rowCounter,
            month: displayMonth, // same month in the table
            year: createdAtYear.toString(),
            poaType: "Poa2",
            approvalStatus: record.poa2_approval_status,
            approvalDate: record.poa2_approval_date,
            revertDate: record.poa2_revert_date,
            remarks: record.poa2_remarks,
            recordId: record.id,
          });
          rowCounter++;
        }
      } catch (err) {
        console.error("Error building row data:", err);
      }
    });

    setTableRows(newRows);
  }, [poaRecords]);

  // 3. Filter the flattened rows
  const filteredRows = tableRows.filter((row) => {
    const matchesYear = !selectedYear || row.year === selectedYear;
    const matchesMonth = !selectedMonth || row.month === selectedMonth;
    return matchesYear && matchesMonth;
  });

  // 4. Render
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>Plan of Action Records</AdminHeader>

      {/* Month & Year Filter */}
      <div className="flex gap-4 my-4">
        <span>Select Month and Year:</span>

        {/* Year Dropdown */}
        <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>

        {/* Month Dropdown */}
        <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
          <option value="">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
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
            <TableHead>Remarks</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row) => {
            // Derive status text from approval status
            let statusText = "N/A";
            if (row.approvalStatus === "0") statusText = "Approval Pending";
            if (row.approvalStatus === "1") statusText = "Approved";
            if (row.approvalStatus === "2") statusText = "Reverted Back";

            // Approval/Revert date
            let finalDate = "N/A";
            if (row.approvalStatus === "1") {
              finalDate = formatDate(row.approvalDate);
            } else if (row.approvalStatus === "2") {
              finalDate = formatDate(row.revertDate);
            }

            return (
              <TableRow key={row.key}>
                <TableCell>{row.slNo}</TableCell>
                <TableCell>{row.month}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.poaType}</TableCell>
                <TableCell>{statusText}</TableCell>
                <TableCell>{finalDate}</TableCell>
                <TableCell>{row.remarks || "N/A"}</TableCell>
                <TableCell className="flex gap-4">
                  {/* View link */}
                  <Link
                    to={`/admin/soepr/POA1/view/${row.recordId}?poaType=${row.poaType.toLowerCase()}`}
                  >
                    <NirdViewIcon />
                  </Link>

                  {/* Edit link if not approved */}
                  {row.approvalStatus !== "1" && (
                    <Link
                      to={`/admin/soepr/POA1/edit/${row.recordId}?poaType=${row.poaType.toLowerCase()}`}
                    >
                      <NirdEditIcon />
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default POAview;
