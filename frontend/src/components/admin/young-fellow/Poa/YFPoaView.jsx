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

const YFPoaView = () => {
  const [poaRecords, setPoaRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchPOARecords = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/v1/yf-poa1/getUserPOAs");
        setPoaRecords(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch POA records.");
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
    const createdAt = new Date(record.created_at);
    const recordYear = createdAt.getFullYear();
    const recordMonth = createdAt.toLocaleString("en-IN", { month: "long" });

    return (
      (!selectedYear || recordYear.toString() === selectedYear) &&
      (!selectedMonth || recordMonth === selectedMonth)
    );
  });

  if (loading) {
    return <div>Loading...</div>;
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
              poaRecords.map((record) =>
                new Date(record.created_at).getFullYear()
              )
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.map((record, idx) => {
            const createdAt = new Date(record.created_at);
            return (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell> {/* Serial number */}
                <TableCell>
                  {createdAt.toLocaleString("en-IN", { month: "long" })}
                </TableCell>
                <TableCell>{createdAt.getFullYear()}</TableCell>
                <TableCell className="flex gap-4">
                  <Link to={`/admin/yf/POA1/view/${record.id}`}>
                    <NirdViewIcon />
                  </Link>
                  <Link to={`/admin/yf/POA1/edit/${record.id}`}>
                    <NirdEditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default YFPoaView;
