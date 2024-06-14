import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";

const DistrictFilter = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (state_id) {
      getAllDistricts(state_id);
    }
  }, [state_id]);

  const getAllDistricts = async stateId => {
    try {
      const { data } = await API.get(`/api/v1/dist/state/${stateId}`);
      setDistricts(data?.districts || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrictChange = event => {
    const selectedDistrictId = event.target.value;
    if (selectedDistrictId) {
      setSearchParams({ state_id, dist_id: selectedDistrictId });
    } else {
      setSearchParams({ state_id });
    }
  };

  return (
    <select className={cn(className, "text-sm px-4 py-2 rounded-md bg-transparent border  w-48")} value={dist_id} onChange={handleDistrictChange} disabled={!state_id}>
      <option value="">Select a district</option>
      {districts.map(district => (
        <option key={district.id} value={district.id}>
          {district.name}
        </option>
      ))}
    </select>
  );
};

export default DistrictFilter;
