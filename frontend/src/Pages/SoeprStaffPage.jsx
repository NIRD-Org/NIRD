import React, { useEffect, useState } from "react";
import API from "@/utils/API";

const SoeprStaffPage = () => {
  const [userLocation, setUserLocation] = useState({});
  const [soeprStates, setSoeprStates] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statesResponse = await API.get("/api/v1/soepr-state/all");
        setSoeprStates(statesResponse.data.states.sort((a, b) => a.name.localeCompare(b.name)));

        const response = await API.get("/api/v1/soepr-location/all");
        setUserLocation(response.data.data);

        const { data: allUsers } = await API.get(`/api/v1/users/all`);
        setUsers(allUsers.data.filter(user => user.role === 4 || user.role === 5)); // Only Consultants and Sr. Consultants
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getStateNameById = (stateId) => {
    const state = soeprStates.find((state) => state.id === stateId);
    return state ? state.name : "N/A";
  };

  const usersByState = users.reduce((acc, user) => {
    const userStateId = userLocation.find((loc) => loc.user_id === user.id)?.userLocations.state_ids[0];
    const stateName = getStateNameById(userStateId);

    if (!acc[stateName]) {
      acc[stateName] = [];
    }
    acc[stateName].push(user);
    return acc;
  }, {});

  const sortedStates = Object.keys(usersByState).sort((a, b) => a.localeCompare(b));

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className="p-5">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-[#004B86]">Training and Capacity Building Consultants and Sr. Consultants of SOEPR across INDIA</h1>
        <div className="my-4">
          <select onChange={handleStateChange} value={selectedState} className="p-2 border rounded">
            <option value="">All States</option>
            {soeprStates.map((state) => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>
      </div>

      {sortedStates
        .filter(state => !selectedState || state === selectedState)
        .map((state, index) => (
          <div key={index} className="mb-5">
            <h2 className="text-xl font-bold py-4">{state}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">S.No</th>
                    <th className="py-2 px-4 border">User Id</th>
                    <th className="py-2 px-4 border">Employee Name</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {usersByState[state].map((user, userIndex) => (
                    <tr key={userIndex}>
                      <td className="py-2 px-4 border">{userIndex + 1}</td>
                      <td className="py-2 px-4 border">{user.id}</td>
                      <td className="py-2 px-4 border">{user.name}</td>
                      <td className="py-2 px-4 border">{user.email}</td>
                      <td className="py-2 px-4 border">
                        {user.role === 4 ? "Consultant" : "Sr. Consultant"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      ))}
    </div>
  );
};

export default SoeprStaffPage;
