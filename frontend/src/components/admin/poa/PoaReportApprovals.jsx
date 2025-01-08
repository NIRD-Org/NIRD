import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
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

const other = [
  { label: "POA Submitted", value: 1 },
  // { label: "Defaulters", value: 0 },
];

// Example: 10-year range
const years = Array.from(
  new Array(10),
  (val, index) => new Date().getFullYear() - index
);

// POA1 filter options
const poa1StatusOptions = [
  { label: "All", value: "" },
  { label: "Pending ", value: "0" },
  { label: "Approved ", value: "1" },
  { label: "Sent for modification ", value: "2" },
];

// POA2 filter options
const poa2StatusOptions = [
  { label: "All", value: "" },
  { label: "Pending ", value: "0" },
  { label: "Approved ", value: "1" },
  { label: "Sent for modification ", value: "2" },
];

// Labels for numeric statuses
const approvalStatusLabels = {
  "0": "Pending",
  "1": "Approved",
  "2": "Sent for modification",
};

// Map numeric status to a Tailwind color class
function getStatusColorClass(status) {
  switch (status) {
    case "0":
      return "bg-yellow-100 text-yellow-800"; // Pending
    case "1":
      return "bg-green-100 text-green-800"; // Approved
    case "2":
      return "bg-orange-200 text-orange-800"; // Sent for modification
    default:
      return "bg-gray-200 text-gray-700"; // Fallback if needed
  }
}

const PoaReportApprovals = () => {
  const [users, setUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filter, setFilter] = useState(other[0].value);
  const [poaData, setPoaData] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [soeprStates, setsoeprStates] = useState([]);
  const [poaType, setPoaType] = useState("poa1");

  // New filters for POA1 and POA2
  const [poa1ApprovalFilter, setPoa1ApprovalFilter] = useState("");
  const [poa2ApprovalFilter, setPoa2ApprovalFilter] = useState("");

  // Fetch handlers
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const fetchPoaReports = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/poa/all?month=${selectedMonth}&year=${selectedYear}&poaType=${poaType}`
      );
      setPoaData(data.data);
    } catch (error) {
      setPoaData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await API.get("/api/v1/soepr-location/all");
        const { data: states } = await API.get("/api/v1/soepr-state/all");
        setUserLocation(response.data.data);
        setsoeprStates(states.states);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserLocations();
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchPoaReports();
    }
  }, [selectedMonth, selectedYear, poaType]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/api/v1/users/all?role=${4}`);
        const { data: data2 } = await API.get(`/api/v1/users/all?role=${5}`);
        setUsers([...data.data, ...data2.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  // Filter: POA Submitted / Defaulters
  const getFilteredUsers = () => {
    if (filter == 1) {
      // POA Submitted
      return users.filter((user) =>
        poaData.some((poaItem) => poaItem.user_id === user.id)
      );
    } else if (filter == 0) {
      // Defaulters
      return users.filter(
        (user) => !poaData.some((poaItem) => poaItem.user_id === user.id)
      );
    }
    return users;
  };

  // Filter by POA1 status
  const filterByPoa1Status = (usersList) => {
    if (!poa1ApprovalFilter) return usersList;
    return usersList.filter((user) => {
      const userPoa = poaData.find((poaItem) => poaItem.user_id === user.id);
      // Compare numeric strings
      return userPoa && userPoa.poa1_approval_status == poa1ApprovalFilter;
    });
  };

  // Filter by POA2 status
  const filterByPoa2Status = (usersList) => {
    if (!poa2ApprovalFilter) return usersList;
    return usersList.filter((user) => {
      const userPoa = poaData.find((poaItem) => poaItem.user_id === user.id);
      return userPoa && userPoa.poa2_approval_status == poa2ApprovalFilter;
    });
  };

  const getUserStateName = (userId) => {
    const userLocData = userLocation?.find((loc) => loc.user_id === userId);
    if (
      userLocData &&
      userLocData.userLocations.state_ids.length > 0
    ) {
      const stateId = userLocData?.userLocations.state_ids[0];
      const stateName = soeprStates.find((state) => state.id === stateId)?.name;
      return stateName || "N/A";
    }
    return "N/A";
  };

  // Combine filters
  const filteredUsers = getFilteredUsers();
  const poa1FilteredUsers = filterByPoa1Status(filteredUsers);
  const finalUsers = filterByPoa2Status(poa1FilteredUsers);

  return (
    <div className="">
      <AdminHeader>POA Reports</AdminHeader>

      <div className="mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 items-end py-10 gap-2 sm:gap-5">
          {/* Month dropdown */}
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
          {/* Year dropdown */}
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
          {/* POA Submitted / Defaulters */}
          <div>
            <FormField
              type="select"
              label="Select Option"
              name="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              options={other.map((ot) => ({
                value: ot.value,
                label: ot.label,
              }))}
            />
          </div>
          {/* POA Type */}
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
          {/* POA1 Approval Status */}
          <div>
            <FormField
              type="select"
              label="POA1 Status"
              name="poa1approval"
              value={poa1ApprovalFilter}
              onChange={(e) => setPoa1ApprovalFilter(e.target.value)}
              options={poa1StatusOptions}
            />
          </div>
          {/* POA2 Approval Status */}
          <div>
            <FormField
              type="select"
              label="POA2 Status"
              name="poa2approval"
              value={poa2ApprovalFilter}
              onChange={(e) => setPoa2ApprovalFilter(e.target.value)}
              options={poa2StatusOptions}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">S.No.</th>
              <th className="py-2 px-4 border">User Id</th>
              <th className="py-2 px-4 border">Employee Name</th>
              <th className="py-2 px-4 border">State Name</th>
              <th className="py-2 px-4 border">Designation</th>
              <th className="py-2 px-4 border">POA1 Status</th>
              <th className="py-2 px-4 border">POA1 Remarks</th>
              <th className="py-2 px-4 border">POA1 Approved / Reverted At</th>
              <th className="py-2 px-4 border">POA2 Status</th>
              <th className="py-2 px-4 border">POA2 Remarks</th>
              <th className="py-2 px-4 border">POA2 Approved / Reverted At</th>
            </tr>
          </thead>
          <tbody>
            {finalUsers.map((user, index) => {
              const userPoaData = poaData.find(
                (poaItem) => poaItem.user_id === user.id
              );

              // If there's no data, default to "0" (Pending)
              const poa1Status =
                userPoaData?.poa1_approval_status != null
                  ? userPoaData.poa1_approval_status
                  : "0"; // default to Pending (0)
              const poa2Status =
                userPoaData?.poa2_approval_status != null
                  ? userPoaData.poa2_approval_status
                  : "0"; // default to Pending (0)

              // Convert numeric code to label
              const poa1Text = approvalStatusLabels[poa1Status] || "Pending";
              const poa2Text = approvalStatusLabels[poa2Status] || "Pending";

              return (
                <tr key={index}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{user.id || "N/A"}</td>
                  <td className="py-2 px-4 border">{user.name || "N/A"}</td>
                  <td className="py-2 px-4 border">
                    {getUserStateName(user.id)}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.role === 3
                      ? "Young Fellow"
                      : user.role === 4
                      ? "Consultant"
                      : user.role === 5
                      ? "Sr. Consultant"
                      : "N/A"}
                  </td>
                  {/* POA1 STATUS Cell */}
                  <td
                    className={`py-2 px-4 border text-center ${getStatusColorClass(
                      poa1Status
                    )}`}
                  >
                    {poa1Text}
                  </td>
                  {/* POA1 Remarks */}
                  <td className="py-2 px-4 border">
                    {userPoaData?.poa1_remarks ?? ""}
                  </td>
                  {/* POA1 Approved At */}
                  <td className="py-2 px-4 border">
                  {userPoaData?.poa1_approval_date
    ? new Date(userPoaData.poa1_approval_date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : ""}
                  </td>
                  {/* POA2 STATUS Cell */}
                  <td
                    className={`py-2 px-4 border text-center ${getStatusColorClass(
                      poa2Status
                    )}`}
                  >
                    {poa2Text}
                  </td>
                  {/* POA2 Remarks */}
                  <td className="py-2 px-4 border">
                    {userPoaData?.poa2_remarks ?? ""}
                  </td>
                  {/* POA2 Approved At */}
                  <td className="py-2 px-4 border">
                  {userPoaData?.poa2_approval_date
    ? new Date(userPoaData.poa2_approval_date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoaReportApprovals;
