import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "@/utils/API";

import { NirdViewIcon } from "../Icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

const PmuPoaView = () => {
  const [poaRecords, setPoaRecords] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    const fetchPOARecords = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/v1/pmu-poa/all");
        setPoaRecords(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch POA records.");
      } finally {
        setLoading(false);
      }
    };

    fetchPOARecords();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get(`/api/v1/users/all?role=1`); // PMU Admin only
        setUsers(data?.data || []);
      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const filteredRecords = poaRecords.filter((record) => {
    const createdAt = new Date(record.created_at);
    const recordYear = createdAt.getFullYear();
    const recordMonth = createdAt.toLocaleString("en-IN", { month: "long" });

    return (
      (!selectedYear || recordYear.toString() === selectedYear) &&
      (!selectedMonth || recordMonth === selectedMonth) &&
      (!user || record.user_id === user)
    );
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative w-full py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Project Monitoring Unit - Plan of Action Records
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-semibold text-primary block mb-2">
            Select Year
          </label>
          <select
            onChange={handleYearChange}
            value={selectedYear}
            className="w-full p-2 border rounded"
          >
            <option value="">All Years</option>
            {[...new Set(poaRecords.map((rec) => new Date(rec.created_at).getFullYear()))].map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-primary block mb-2">
            Select Month
          </label>
          <select
            onChange={handleMonthChange}
            value={selectedMonth}
            className="w-full p-2 border rounded"
          >
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
        <div>
          <label className="text-sm font-semibold text-primary block mb-2">
            Select PMU Admin
          </label>
          <select
            onChange={(e) => setUser(e.target.value)}
            value={user}
            className="w-full p-2 border rounded"
          >
            <option value="">All PMU Admins</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table ref={printRef}>
        <TableCaption>Filtered POA Records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No</TableHead>
            <TableHead>PMU Employee</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, idx) => {
              const employee = users.find((u) => u.id === record.user_id); // Match user
              return (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{employee ? employee.name : "Unknown"}</TableCell>
                  <TableCell>
                    {new Date(record.created_at).toLocaleString("en-IN", { month: "long" })}
                  </TableCell>
                  <TableCell>{new Date(record.created_at).getFullYear()}</TableCell>
                  <TableCell>
                    <Link to={`/admin/PMU/POA/view/${record.id}`}>
                      <NirdViewIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PmuPoaView;
