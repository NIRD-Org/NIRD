import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FormField from "@/components/ui/formfield";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import AdminHeader from "../../AdminHeader";
import { showAlert } from "@/utils/showAlert";

const UpdateSoeprLocation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const stateIdFromUrl = searchParams.get("state_id");
  const [employee_id, setEmployee_id] = useState("");
  const { userId } = useParams();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [state, setState] = useState(stateIdFromUrl || "");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const { data } = await API.get(`/api/v1/users/${userId}`);
      const userStateId = data.data.user.state_id;
      const userDistrictId = data.data.user.district_id;
      searchParams.set("state_id", userStateId);
      setSearchParams(searchParams);
      data.data.user.state = data.data.state_name;
      data.data.user.district = data.data.district_name;
      setUser(data.data.user);
      setState(userStateId);
      setDistrict(userDistrictId);
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    if (stateIdFromUrl && states.length > 0) {
      setState(stateIdFromUrl);
      const selectedState = states.find((state) => state.id === stateIdFromUrl);
      if (selectedState) {
        setStateName(selectedState.name);
        fetchDistricts(selectedState.id);
      }
    }
  }, [stateIdFromUrl, states]);

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/soepr-state/all`);
    setStates(data?.states);
  };

  const fetchDistricts = async (stateId) => {
    const { data } = await API.get(`/api/v1/soepr-districts/${stateId}`);
    setDistricts(data?.districts);
  };

  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;
    setState(selectedStateId);
    const selectedState = states.find((state) => state.id === selectedStateId);
    if (selectedState) {
      setStateName(selectedState.name);
      fetchDistricts(selectedStateId);
    }
    if (selectedStateId) {
      searchParams.set("state_id", selectedStateId);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("state_id");
      setSearchParams(searchParams);
    }
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setDistrict(selectedDistrictId);
    const selectedDistrict = districts.find(
      (district) => district.id === selectedDistrictId
    );
    if (selectedDistrict) {
      setDistrictName(selectedDistrict.name);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await API.put(`/api/v1/users/${userId}`, {
        state_id: state,
        district_id: district,
        employee_id,
      });
      if (data.status === "success") {
        showAlert("User Location updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  return (
    <div className="py-5">
      <AdminHeader>Update SOEPR Location</AdminHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 px-4 md:px-20 place-items-center">
        <div className="flex gap-2 items-center">
          <h4 className="font-semibold text-primary">Name: </h4>
          <p className="font-semibold text-gray-700">{user?.name}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="font-semibold text-primary">Username: </h4>
          <p className="font-semibold text-gray-700">{user?.username}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="font-semibold text-primary">Assigned State: </h4>
          <p className="font-semibold text-gray-700">{user?.state}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="font-semibold text-primary">Assigned District: </h4>
          <p className="font-semibold text-gray-700">{user?.district}</p>
        </div>
      </div>
      <div className="py-10 grid grid-cols-1 md:grid-cols-3 items-center place-items-center">
        <div>
          <h5 className="font-semibold mb-2 text-primary text-sm">
            Select SOEPR State
          </h5>
          <select
            className={
              "text-sm px-4 py-2 rounded-md bg-white border w-full md:w-[200px]"
            }
            value={state}
            onChange={handleStateChange}
          >
            <option value="">Select a state</option>
            {states?.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h5 className="font-semibold mb-2 text-primary text-sm">
            Select SOEPR District
          </h5>
          <select
            className={
              "text-sm px-4 py-2 rounded-md bg-white border w-full md:w-[200px]"
            }
            value={district}
            onChange={handleDistrictChange}
            disabled={!state} // Disable until a state is selected
          >
            <option value="">Select a district</option>
            {districts?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        {user && !user.employee_id && (
          <div>
            <h5 className="font-semibold mb-2 text-primary text-sm">
              Enter Employee Id
            </h5>
            <Input
              type="text"
              className="w-full"
              value={employee_id}
              onChange={(e) => setEmployee_id(e.target.value)}
            />
          </div>
        )}
        <Button onClick={handleSubmit} className="mx-auto block px-20 mt-8">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UpdateSoeprLocation;
