import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeftIcon, Table } from "lucide-react";
import API from "@/utils/API";

import { savePDF } from "@progress/kendo-react-pdf";
import html2pdf from "html2pdf.js";
import FormField from "@/components/ui/formfield";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const years = Array.from(
  new Array(50),
  (val, index) => new Date().getFullYear() - index
);

const Poa1AdminData = () => {
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateOptions, setStateOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [stateData, setStateData] = useState();
  const [poa1, setpoa1] = useState([]); // We'll store a single object after aggregator fix
  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [poaType, setPoaType] = useState("poa1");
  const [role, setRole] = useState("all");

  // For approval mechanism
  const [approvalStatus, setApprovalStatus] = useState("0"); // 0=Pending (default)
  const [remarks, setRemarks] = useState("");

  const navigate = useNavigate();

  // 1. Get list of states
  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/soepr-state/all`);
    setStateOptions(data?.states);
  };

  // 2. Get districts by state
  const getAllDistricts = async () => {
    const { data } = await API.get(`/api/v1/soepr-dist/state/${state}`);
    setDistrictOptions(data?.districts);
  };

  // 3. Fetch POA data by state, user, month, year, etc.
  const getpoa1Data = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/poa1/get/?state_id=${state}&user_id=${user}&month=${selectedMonth}&year=${selectedYear}&poaType=${poaType}`
      );

      // If the backend returns an array, pick the first object
      let fetched = data?.data || {};
      if (Array.isArray(fetched)) {
        fetched = fetched.length > 0 ? fetched[0] : {};
      }

      setpoa1(fetched);

      // Set approval status & remarks if present
      if (fetched?.approval_status) {
        setApprovalStatus(fetched.approval_status);
      } else {
        setApprovalStatus("0");
      }
      if (fetched?.remarks) {
        setRemarks(fetched.remarks);
      } else {
        setRemarks("");
      }
    } catch (error) {
      console.log("Error: " + error.message);
      // If error, reset
      setpoa1([]);
      setApprovalStatus("0");
      setRemarks("");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/api/v1/soepr-location/all");
        const data = response.data.data;

        // Filter users based on selected State and userLocations.state_ids[0]
        const filteredUsers = data.filter(
          (loc) => loc.userLocations.state_ids[0] === state
        );

        if (role === "all") {
          const { data: data1 } = await API.get(`/api/v1/users/all?role=4`);
          const { data: data2 } = await API.get(`/api/v1/users/all?role=5`);
          const mergedData = [...data1.data, ...data2.data];

          // Filter mergedData based on filteredUsers
          const filteredMergedData = mergedData.filter((usr) =>
            filteredUsers.some((f) => f.user_id === usr.id)
          );
          setUsers(filteredMergedData);
        } else {
          const { data: roleData } = await API.get(
            `/api/v1/users/all?role=${role}`
          );
          const filteredRoleData = roleData.data.filter((usr) =>
            filteredUsers.some((f) => f.user_id === usr.id)
          );
          setUsers(filteredRoleData);
        }
      } catch (error) {
        console.log(error);
        setUsers([]);
      }
    };

    if (state) fetchUser();
  }, [role, state]);

  // Fetch POA1 data after selecting user, state, month, year
  useEffect(() => {
    if (user && state && selectedMonth && selectedYear) {
      getpoa1Data();
    }
  }, [user, state, selectedMonth, selectedYear, poaType]);

  // Load all states on component mount
  useEffect(() => {
    getAllStates();
  }, []);

  // Get state data by ID
  const getStateById = async (stateId) => {
    try {
      const { data } = await API.get(`/api/v1/soepr-state/${stateId}`);
      setStateData(data.state);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch district info whenever "state" changes
  useEffect(() => {
    if (state) {
      getStateById(state);
      getAllDistricts();
    }
  }, [state]);

  // PDF Download
  const handleGeneratePdf = () => {
    const element = printRef.current;
    const opt = {
      margin: 10,
      pagebreak: {
        mode: ["avoid-all"],
      },
      filename: `${poaType} ${stateData?.name}`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  // Approval Submission
  const handleApprovalSubmit = async () => {
    try {
      if (!poa1 || (!poa1._id && !poa1.id)) {
        alert("No POA data to approve or modify!");
        return;
      }
      const poaId = poa1.id; // our custom 'id' field in the DB

      const payload = {
        approval_status: approvalStatus,
        remarks,
      };
      await API.patch(`/api/v1/poa1/update/${poaId}`, payload);
      alert("Approval status updated successfully!");

      // Refresh data
      getpoa1Data();
    } catch (error) {
      console.error(error);
      alert("Failed to update approval status!");
    }
  };

  // Helper for month/year changes
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="relative w-full md:w-[80vw] py-10 px-1 lg">
      <h1 className="text-3xl text-primary text-center font-bold">
        Approve Fortnightly Plan Of Action
      </h1>

      <div className="w-fit flex flex-col justify-between items-center lg:flex-row text-center text-3xl h-full">
        <div className="w-full h-fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-end py-10 gap-2 sm:gap-5">
            <div className="flex flex-col">
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                State
              </label>
              <select
                className="border text-sm bg-white p-2 rounded-md"
                value={state}
                onChange={(e) => {
                  setSearchParams({ state: e.target.value });
                }}
              >
                <option>Select State</option>
                {stateOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                Role:
              </label>
              <select
                value={role || ""}
                onChange={(e) => setRole(e.target.value)}
                className="border text-sm bg-white p-2 rounded-md"
              >
                <option value="4">Consultant</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-primary text-start px-4 py-2 font-semibold">
                Employee
              </label>
              <select
                className="border text-sm bg-white p-2 rounded-md"
                value={user}
                disabled={!users.length || !state}
                onChange={(e) => setUser(e.target.value)}
              >
                <option>All Consultants</option>
                {users?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <FormField
                type="select"
                label="Select Month"
                name="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                options={months}
              />
            </div>
            <div>
              <FormField
                type="select"
                label="Select Year"
                name="year"
                value={selectedYear}
                onChange={handleYearChange}
                options={years.map((year) => ({
                  value: year,
                  label: year,
                }))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-primary text-start py-2 font-semibold">
                POA Type
              </label>
              <select
                className="border text-sm bg-white p-2 px-4 rounded-md"
                value={poaType}
                onChange={(e) => setPoaType(e.target.value)}
              >
                <option value="poa1">POA1</option>
                <option value="poa2">POA2</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleGeneratePdf}
          className="bg-primary text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Download as PDF
        </button>
        {poa1 && poa1.id && (
          <span className="text-sm text-gray-700">
            <strong>POA ID:</strong> {poa1.id}
          </span>
        )}
        {approvalStatus === "1" && (
          <p className="text-green-600 font-semibold">Approved</p>
        )}
        {approvalStatus === "2" && (
          <p className="text-yellow-600 font-semibold">Sent for Modification</p>
        )}
        {approvalStatus === "0" && (
          <p className="text-red-600 font-semibold">Pending</p>
        )}
      </div>

      {(approvalStatus === "0" || approvalStatus === "2") && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex flex-col">
            <label className="text-sm text-primary font-semibold">
              Approval Status
            </label>
            <select
              value={approvalStatus}
              onChange={(e) => setApprovalStatus(e.target.value)}
              className="border text-sm bg-white p-2 rounded-md"
            >
              <option value="0">Pending</option>
              <option value="1">Approved</option>
              <option value="2">Sent for Modification</option>
            </select>
          </div>

          <div className="flex flex-col sm:mx-2">
            <label className="text-sm text-primary font-semibold">Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="border text-sm bg-white p-2 rounded-md"
              placeholder="Enter remarks if any"
            />
          </div>

          <button
            onClick={handleApprovalSubmit}
            className="bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Approval
          </button>
        </div>
      )}

      <div ref={printRef} className="pt-10 w-full">
        <div className="text-center flex justify-evenly items-center gap-4 bg-primary py-2 text-sm md:text-base text-white">
          <p>
            State: <span className="text-gray-300">{stateData?.name}</span>
          </p>
          <p>
            Name: {(() => {
              const foundUser = users?.find((u) => u.id === user);
              return foundUser?.name;
            })()}
          </p>
          <p>
            Designation: {(() => {
              const foundUser = users?.find((u) => u.id === user);
              if (foundUser?.role === 4) return "Consultant";
              if (foundUser?.role === 5) return "Sr. Consultant";
              if (foundUser?.role === 3) return "Young Fellow";
              return "";
            })()}
          </p>
          <p>
            Month:{" "}
            {(() => {
              const monthData = months?.find((m) => m.value === selectedMonth);
              return monthData?.label;
            })()}{" "}
          </p>
          <p>Year: {selectedYear} </p>
        </div>
        {poa1 && poa1.poaData?.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border-collapse overflow-x-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    S.No.
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Date
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Weekday
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Plan
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Action
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Planned Event
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    State
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    District
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Achievements
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Photo
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {poa1?.poaData?.map((dayData, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border-t p-2 text-center font-semibold text-sm md:text-sm">
                      {index + 1}.
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.date}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.weekday}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.plan}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.action}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.plannedEvent}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.state?.name}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.district?.name || dayData?.dist_id || "N/A"}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.achievements}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.photo ? (
                        <img
                          src={dayData.photo}
                          alt="Photo"
                          className="max-w-full h-auto"
                        />
                      ) : (
                        "No photo"
                      )}
                    </td>
                    <td className="border-t p-2 text-sm md:text-xs">
                      {dayData.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="11"
                    className="p-2 text-center text-xs sm:text-sm md:text-base"
                  >
                    End of POA1 Details
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="text-2xl text-center text-gray-700">
            No Data Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Poa1AdminData;
