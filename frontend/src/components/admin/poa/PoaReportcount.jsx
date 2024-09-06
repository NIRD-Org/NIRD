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

const years = Array.from(
  new Array(50),
  (val, index) => new Date().getFullYear() - index
);

const PoaReport = () => {
  const [users, setUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [poaData, setPoaData] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [soeprStates, setSoeprStates] = useState([]);
  const [poaType, setPoaType] = useState("poa1");

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const fetchPoaReports = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/poa1/all?month=${selectedMonth}&year=${selectedYear}&poaType=${poaType}`
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
        setSoeprStates(states.states);
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

        const mergedData = [...data.data, ...data2.data];
        setUsers(mergedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const getFilteredUsers = (status) => {
    return users.filter((user) =>
      poaData.some((poaItem) => poaItem.user_id === user.id) === status
    );
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

  const getStateWiseCounts = () => {
    const counts = {};

    soeprStates.forEach((state) => {
      counts[state.name] = {
        consultants: { total: 0, submitted: 0, notSubmitted: 0 },
        srConsultants: { total: 0, submitted: 0, notSubmitted: 0 },
      };
    });

    const filterUsersByRole = (role) =>
      users.filter((user) => user.role === role);

    const consultants = filterUsersByRole(4);
    const srConsultants = filterUsersByRole(5);

    const calculateCounts = (users, status) => {
      users.forEach((user) => {
        const stateName = getUserStateName(user.id);
        if (stateName in counts) {
          const roleKey = user.role === 4 ? "consultants" : "srConsultants";
          counts[stateName][roleKey].total++;
          counts[stateName][roleKey][status ? "submitted" : "notSubmitted"]++;
        }
      });
    };

    calculateCounts(getFilteredUsers(true), true);
    calculateCounts(getFilteredUsers(false), false);

    return counts;
  };

  const stateWiseCounts = getStateWiseCounts();

  const calculateOverallTotals = () => {
    const totals = {
      consultants: { total: 0, submitted: 0, notSubmitted: 0 },
      srConsultants: { total: 0, submitted: 0, notSubmitted: 0 },
    };

    Object.values(stateWiseCounts).forEach((roles) => {
      totals.consultants.total += roles.consultants.total;
      totals.consultants.submitted += roles.consultants.submitted;
      totals.consultants.notSubmitted += roles.consultants.notSubmitted;

      totals.srConsultants.total += roles.srConsultants.total;
      totals.srConsultants.submitted += roles.srConsultants.submitted;
      totals.srConsultants.notSubmitted += roles.srConsultants.notSubmitted;
    });

    return totals;
  };

  const overallTotals = calculateOverallTotals();

  return (
    <div className="">
      <AdminHeader>POA Statewise Submission Status</AdminHeader>

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

      {/* Table to display state-wise and role-wise counts */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">State Name</th>
              <th className="py-2 px-4 border" colSpan="3">Consultants</th>
              <th className="py-2 px-4 border" colSpan="3">Sr. Consultants</th>
            </tr>
            <tr>
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Submitted</th>
              <th className="py-2 px-4 border">Not Submitted</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Submitted</th>
              <th className="py-2 px-4 border">Not Submitted</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stateWiseCounts).map(([stateName, roles]) => (
              <tr key={stateName}>
                <td className="py-2 px-4 border">{stateName}</td>
                <td className="py-2 px-4 border">{roles.consultants.total}</td>
                <td className="py-2 px-4 border">{roles.consultants.submitted}</td>
                <td className="py-2 px-4 border">{roles.consultants.notSubmitted}</td>
                <td className="py-2 px-4 border">{roles.srConsultants.total}</td>
                <td className="py-2 px-4 border">{roles.srConsultants.submitted}</td>
                <td className="py-2 px-4 border">{roles.srConsultants.notSubmitted}</td>
              </tr>
            ))}
            {/* Overall Total Row */}
            <tr>
              <td className="py-2 px-4 border font-bold">Overall Total</td>
              <td className="py-2 px-4 border font-bold">{overallTotals.consultants.total}</td>
              <td className="py-2 px-4 border font-bold">{overallTotals.consultants.submitted}</td>
              <td className="py-2 px-4 border font-bold">{overallTotals.consultants.notSubmitted}</td>
              <td className="py-2 px-4 border font-bold">{overallTotals.srConsultants.total}</td>
              <td className="py-2 px-4 border font-bold">{overallTotals.srConsultants.submitted}</td>
              <td className="py-2 px-4 border font-bold">{overallTotals.srConsultants.notSubmitted}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoaReport;
