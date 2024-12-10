import API from "@/utils/API";
import React, { useCallback, useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import FormField from "@/components/ui/formfield";
import { useSearchParams } from "react-router-dom";

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

const YfPoaReport = () => {
  const [users, setUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [serachParams, setSearchParams] = useSearchParams();

  const filter = serachParams.get("filter") || 0;
  const [poaData, setPoaData] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [soeprStates, setsoeprStates] = useState([]);
  const [poaType, setPoaType] = useState("poa1");
  const [states, setStates] = useState();

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const fetchYfPoaReports = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/spc-poa1/all?month=${selectedMonth}&year=${selectedYear}&poaType=${poaType}`
      );
      setPoaData(data.data);
    } catch (error) {
      setPoaData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statesResponse = await API.get("/api/v1/state/all");
        const states = statesResponse.data.states;
        setStates(states);
        const { data } = await API.get(`/api/v1/user-location/all`);
        setUserLocation(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchYfPoaReports();
    }
  }, [selectedMonth, selectedYear, poaType]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/api/v1/users/all?role=${2}`);
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const getFilteredUsers = () => {
    if (filter == 1) {
      // Users who have submitted POA data
      return users.filter((user) =>
        poaData.some((poaItem) => poaItem.user_id === user.id)
      );
    } else
      return users.filter((user) => {
        // Find the user's location data
        const userLoc =
          userLocation &&
          userLocation.length > 0 &&
          userLocation.find((loc) => loc.user_id == user.id);

        // Get state IDs for the user from location data
        const yfStateIds = userLoc?.userLocations?.state_ids || [];

        // Get user's POA data
        const userPoaData = poaData.filter(
          (poaItem) => poaItem.user_id == user.id
        );

        // Extract state IDs from POA data
        const poaStateIds =
          userPoaData.length > 0
            ? userPoaData.flatMap((poaItem) =>
                poaItem.poaData?.map((entry) => entry.state_id)
              )
            : [];

        const hasSubmittedStates = yfStateIds.every((stateId) =>
          poaStateIds.includes(stateId)
        );
        // Check if there are any states not covered in the POA
        const hasUnsubmittedStates = yfStateIds.some(
          (stateId) => !poaStateIds.includes(stateId)
        );
        return hasUnsubmittedStates;
      });
  };

  const filteredUsers = getFilteredUsers();

  const getUserStateName = useCallback(
    (userId) => {
      try {
        const userLoc = userLocation.find((loc) => loc.user_id === userId);
        const yfStateIds = userLoc?.userLocations
          ? userLoc.userLocations.state_ids
          : [];

        const userPoadata = poaData.filter((item) => item.user_id == userId);
        const poaStateIds =
          userPoadata[0]?.poaData?.map((entry) => entry.state_id) || [];

        // Filter user-specific states
        const yfStates =
          states.length > 0 &&
          states?.filter((state) => yfStateIds?.includes(state.id));

        // Split into states in POA and not in POA
        const statesInPoa = yfStates?.filter((state) =>
          poaStateIds.includes(state.id)
        );
        const statesNotInPoa = yfStates.filter(
          (state) => !poaStateIds.includes(state.id)
        );

        const selectedStates =
          filter == 1 ? statesInPoa || [] : statesNotInPoa || [];

        return selectedStates.length > 0
          ? selectedStates.map((state) => state.name).join(", ")
          : "N/A";
      } catch (error) {
        console.error("Error filtering user states:", error);
        return "";
      }
    },
    [userLocation, poaData, states, filter]
  );

  return (
    <div className="">
      <AdminHeader>SPC POA Reports</AdminHeader>

      <div className="mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 items-end py-10 gap-2 sm:gap-5">
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
              onChange={(e) => {
                setSearchParams({ filter: e.target.value });
              }}
              options={other.map((ot) => ({
                value: ot.value,
                label: ot.label,
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

      {/* Table to display POA data */}
      <div className="overflow-x-auto">
        <table key={filter} className="min-w-full bg-white">
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
                      {getUserStateName(user.id) || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">State Program Coordinator</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YfPoaReport;
