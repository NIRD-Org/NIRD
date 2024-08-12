import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table";
import AdminHeader from "../AdminHeader";

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("");
  const [role, setRole] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  const getAllStates = async () => {
    try {
      const { data } = await API.get(`/api/v1/state/all`);
      setStateOptions(data?.states);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(
        `api/v1/am-upload/attendance/all?role=${role}&fromDate=${fromDate}&toDate=${toDate}`
      );
      // const filteredData = data?.data.filter(att => att.state);
      // setAttendance(filteredData);
      setAttendance(data?.data);
    } catch (error) {
      console.error("Error fetching AM upload:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 1, name: "Young Fellow" },
    { value: 2, name: "Sr. Consultant" },
    { value: 3, name: "Consultant" },
  ];

  useEffect(() => {
    if (state && role && toDate && fromDate) {
      fetchAttendance();
    }
  }, [state, role, toDate, fromDate]);

  useEffect(() => {
    getAllStates();
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    if (new Date(fromDate) > new Date(toDate)) {
      alert("From Date cannot be greater than To Date");
    } else if (
      new Date(fromDate) > new Date(currentDate) ||
      new Date(toDate) > new Date(currentDate)
    ) {
      alert("Dates cannot be greater than the current date");
    } else {
      fetchAttendance();
    }
  };

  const handleReset = () => {
    setRole("");
    setFromDate("");
    setToDate("");
  };

  return (
    <div>
      <AdminHeader>Attendance Data</AdminHeader>
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 justify-between mb-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 items-end gap-2 sm:gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select State</label>
            <select
              className="border w-full md:max-w-40 text-sm border-gray-200 p-2 rounded-md"
              value={state}
              onChange={e => {
                setState(e.target.value);
              }}
            >
              <option>All States</option>
              {stateOptions.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select Role</label>
            <select
              className="border text-sm border-gray-200 p-2 rounded-md"
              value={role}
              onChange={e => {
                setRole(e.target.value);
              }}
            >
              <option>Select Role</option>
              {roleOptions.map(item => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">From Date</label>
            <input
              type="date"
              className="border text-sm border-gray-200 p-2 rounded-md"
              value={fromDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={e => setFromDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">To Date</label>
            <input
              type="date"
              className="border text-sm border-gray-200 p-2 rounded-md"
              value={toDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={e => setToDate(e.target.value)}
            />
          </div>
          <button onClick={handleReset} className="bg-primary rounded text-white text-sm p-2 px-2">
            Reset
          </button>
        </div>

        <div className="w-full md:w-fit flex flex-col md:flex-row gap-5">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for States, Districts and Blocks"
              className="border border-gray-200 p-2 rounded-md w-full lg:w-40"
            />
            <button className="bg-primary text-white p-2 rounded focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {!isLoading && attendance.length == 0 ? (
        <div className="text-center text-xl text-gray-700 py-20">
          <h3>No attendance data found for the selected criteria.</h3>
        </div>
      ) : (
        <Table>
          <TableRow>
            <TableCell>
              <strong>Employee Id</strong>
            </TableCell>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            {/* <TableCell> */}
              {/* <strong>State</strong> */}
            {/* </TableCell> */}
            <TableCell>
              <strong>Role</strong>
            </TableCell>
            <TableCell>
              <strong>AM Working Days</strong>
            </TableCell>
            <TableCell>
              <strong>PM Working Days</strong>
            </TableCell>
          </TableRow>
          <TableBody>
            {attendance.map((att, index) => (
              <TableRow key={index}>
                <TableCell>{att.employeeId}</TableCell>
                <TableCell>{att.name}</TableCell>
                {/* <TableCell>{att.state}</TableCell> */}
                <TableCell>{roleOptions.find(r => r.value == att.role).name}</TableCell>
                <TableCell>{att.amWorkingDays}</TableCell>
                <TableCell>{att.pmWorkingDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ViewAttendance;
