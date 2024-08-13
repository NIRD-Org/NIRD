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
  { label: "Defaulters", value: 0 },
];

const years = Array.from(
  new Array(50),
  (val, index) => new Date().getFullYear() - index
);

const PoaReport = () => {
  const [users, setUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filter, setFilter] = useState(other[0].value);
  const [poaData, setPoaData] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [soeprStates, setsoeprStates] = useState([]);
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const fetchPoaReports = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/poa1/all?month=${selectedMonth}&year=${selectedYear}`
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

        const data = response.data.data;
        setUserLocation(data);
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
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/api/v1/users/all?role=${4}`);
        const { data: data2 } = await API.get(`/api/v1/users/all?role=${5}`);
        // const { data: data3 } = await API.get(`/api/v1/users/all?role=${3}`);

        const mergedData = [...data.data, ...data2.data];
        setUsers(mergedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  // Function to get filtered user details
  const getFilteredUsers = () => {
    if (filter == 1) {
      // Users who have submitted POA data
      return users.filter((user) =>
        poaData.some((poaItem) => poaItem.user_id === user.id)
      );
    } else if (filter == 0) {
      // Users who haven't submitted POA data
      return users.filter(
        (user) => !poaData.some((poaItem) => poaItem.user_id === user.id)
      );
    }
  };

  const getUserStateName = (userId) => {
    const userLocationData = userLocation?.find(
      (loc) => loc.user_id === userId
    );
    if (
      userLocationData &&
      userLocationData.userLocations.state_ids.length > 0
    ) {
      const stateId = userLocationData?.userLocations.state_ids[0];
      const stateName = soeprStates.find((state) => state.id === stateId)?.name;
      return stateName || "N/A";
    }
    return "N/A";
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="">
      <AdminHeader>POA Reports</AdminHeader>

      <div className="mb-5">
        <div className="flex gap-4 mb-4">
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
        </div>
      </div>

      {/* Table to display POA data */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">S.No.</th>
              <th className="py-2 px-4 border">User Id</th>

              <th className="py-2 px-4 border">Employee Name</th>
              <th className="py-2 px-4 border">State Name</th>
              <th className="py-2 px-4 border">Designation</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers &&
              filteredUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{user.id || "N/A"}</td>
                    <td className="py-2 px-4 border">{user.name || "N/A"}</td>

                    <td className="py-2 px-4 border">
                      {getUserStateName(user.id)}
                    </td>
                    <td className="py-2 px-4 border">
                      {user.role == 3
                        ? "Young Fellow"
                        : user.role == 4
                        ? "Consultant"
                        : user.role == 5
                        ? "Sr. Consultant"
                        : "N/A" || "N/A"}
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

export default PoaReport;
