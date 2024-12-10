import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon, Table } from "lucide-react";
import API from "@/utils/API";
import PoaDataCard from "./PoaDataCard";
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

const PoaAdminSPCData = () => {
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateOptions, setStateOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [stateData, setStateData] = useState();
  const [poa1, setpoa1] = useState([]);
  const state = searchParams.get("state") || "";
  const dist = searchParams.get("dist") || "";
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [poaType, setPoaType] = useState("poa1");
  const [role, setRole] = useState("2"); // Default to SPC Admin
  const navigate = useNavigate();

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStateOptions(data?.states);
  };

  const getAllDistricts = async () => {
    const { data } = await API.get(`/api/v1/dist/state/${state}`);
    setDistrictOptions(data?.districts);
  };

  const getpoa1Data = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/spc-poa1/get/?state_id=${state}&user_id=${user}&month=${selectedMonth}&year=${selectedYear}&poaType=${poaType}`
      );
      setpoa1(data?.data);
    } catch (error) {
      console.log("Error: " + error.message);
      setpoa1([]);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/api/v1/user-location/all");
        const allUserLocations = response.data.data;

        // Filter users based on selected state
        const filteredUserLocations = state
          ? allUserLocations.filter((user) => user.userLocations.state_ids[0] === state)
          : allUserLocations;

        // Fetch users with role=2 (SPC Admin)
        const roleResponse = await API.get(`/api/v1/users/all?role=2`);
        const usersByRole = roleResponse.data.data;

        // Match users with role=2 and state filter
        const filteredUsers = usersByRole.filter((user) =>
          filteredUserLocations.some(
            (userLocation) => userLocation.user_id === user.id
          )
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUser();
  }, [role, state]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await API.get("/api/v1/soepr-location/all");
  //       const data = response.data.data;
  //       console.log(data);

  //       if (role == "all") {
  //         const { data } = await API.get(`/api/v1/users/all?role=${4}`);
  //         const { data: data2 } = await API.get(`/api/v1/users/all?role=${5}`);
  //         const mergedData = [...data.data, ...data2.data];

  //         setUsers(mergedData);
  //       } else {
  //         const { data } = await API.get(`/api/v1/users/all?role=${role}`);
  //         setUsers(data?.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchUser();
  // }, [role]);

  useEffect(() => {
    if (user && state && selectedMonth && selectedYear) {
      getpoa1Data();
    }
  }, [user, state, selectedMonth, selectedYear, poaType]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getStateById = async (stateId) => {
    try {
      const { data } = await API.get(`/api/v1/state/${stateId}`);
      setStateData(data.state);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStateById(state);
    getAllDistricts();
  }, [state]);

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

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="relative w-full md:w-[80vw] py-10 px-1 lg">
      <button
        onClick={() => navigate("/kpi")}
        className="absolute flex items-center justify-center bg-primary text-white p-2 rounded top-2 left-4 md:top-10 "
      >
        <ArrowLeftIcon className="w-7 h-5" />
        <p className="hidden md:block">Back</p>
      </button>
      <h1 className="text-3xl text-primary text-center font-bold">
        Report Weekly Plan Of Action
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
                <option value="2">State Program Coordinator</option>
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
                <option>All Employees</option>
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
                <option value="poa3">POA3</option>
                <option value="poa4">POA4</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleGeneratePdf}
        className="mt-4 bg-primary text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download as PDF
      </button>

      <div ref={printRef} className="pt-10 w-full">
        <div className="text-center flex   justify-evenly items-center gap-4 bg-primary py-2 text-sm md:text-base text-white">
          <p>
            State: <span className="text-gray-300">{stateData?.name}</span>
          </p>{" "}
          <p>
            Name:{" "}
            {(() => {
              const foundUser = users?.find((u) => u.id === user);
              return foundUser?.name;
            })()}
          </p>
          <p>
            Designation:{" "}
            {(() => {
              const foundUser = users?.find((u) => u.id === user);
              if (foundUser?.role === 2) return "SPC Admin";
              return "";
            })()}
          </p>
          <p>
            Month:{" "}
            {(() => {
              const monthData = months?.find((m) => m.value === selectedMonth);
              return monthData.label;
            })()}{" "}
          </p>
          <p>Year: {selectedYear} </p>
        </div>
        {poa1 && poa1?.poaData?.length > 0 ? (
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
                    Activity
                  </th>
                  <th className="p-2 text-left text-xs sm:text-sm md:text-base text-gray-600">
                    Tentative Target
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
                {poa1?.poaData?.length > 0 ? (
                  poa1.poaData.map((dayData, index) => (
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
                        {dayData.activity}
                      </td>
                      <td className="border-t p-2 text-sm md:text-xs">
                        {dayData.tentativeTarget}
                      </td>
                      <td className="border-t p-2 text-sm md:text-xs">
                        {dayData.plannedEvent}
                      </td>
                      <td className="border-t p-2 text-sm md:text-xs">
                        {dayData.state.name}
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
                            className="max-w-24 h-auto"
                          />
                        ) : (
                          "No photo"
                        )}
                      </td>
                      <td className="border-t p-2 text-sm md:text-xs">
                        {dayData.remarks}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="p-2 text-center text-xs sm:text-sm md:text-base"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="10"
                    className="p-2 text-center text-xs sm:text-sm md:text-base"
                  >
                    End of POA Details
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

export default PoaAdminSPCData;
