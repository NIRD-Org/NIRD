import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { NirdViewIcon } from "@/components/admin/Icons";
import AdminHeader from "../AdminHeader";

const ViewAttendance = () => {
  const { id } = useParams();
  const [attendance, setattendance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [financialYear, setFinancialYear] = useState();
  const [role, setRole] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStateOptions(data?.states);
  };

  useEffect(() => {
    const fetchattendance = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/am-upload/${id}`);
        setattendance(data?.data);
      } catch (error) {
        console.error("Error fetching AM upload:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchattendance();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!attendance) {
    return <div>AM Upload not found</div>;
  }

  const fields = [
    { label: "id", value: attendance?.id },
    { label: "Employee Id", value: attendance.employee_id },
    { label: "Employee Full Name", value: attendance.employee_name },

    { label: "State", value: attendance.state_name },
    { label: "Role", value: attendance.block_id },
    { label: "AM Working Days", value: attendance.gp_id },
    { label: "PM Working Days", value: attendance.date },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Dropdown for financial years

  const financialYears = [];

  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <div>
      <AdminHeader>Attendance Data</AdminHeader>
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 justify-between mb-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5  items-end gap-2 sm:gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select State</label>

            <select
              className="border w-full md:max-w-40 text-sm border-gray-200 p-2 rounded-md "
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            >
              <option>All States</option>
              {stateOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            {/* <SelectComponent data={districtOptions} name="District" /> */}
            <select
              className="border text-sm border-gray-200 p-2 rounded-md "
              value={role}
              disabled={!roleOptions.length}
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
            >
              <option>Select Role</option>
              {roleOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleReset}
            className="bg-primary rounded text-white text-sm p-2 px-2"
          >
            Reset
          </button>
        </div>

        <div className="w-full md:w-fit flex flex-col md:flex-row gap-5">
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="w-full md:w-40 text-center border p-2 rounded-md"
          >
            <option value="">Select Financial Year</option>
            {financialYears.map((year, index) => (
              <option key={index} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for States, Districts and Blocks"
              className="border border-gray-200 p-2 rounded-md w-full lg:w-40 "
            />
            <button className="bg-primary text-white p-2 rounded focus:outline-none ">
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
      <Table>
        <TableBody>
          {fields?.map((field, index) => (
            <TableRow key={index}>
              <TableCell>{field.label}</TableCell>
              <TableCell>{field.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewAttendance;
