import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";
const StateFilter = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const [states, setStates] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStates(data?.states);
  };

  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;
    if (selectedStateId) {
      setSearchParams({ state_id: selectedStateId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <select
      className={cn(
        className,
        "text-sm px-4 py-2 rounded-md bg-transparent border "
      )}
      value={state_id}
      onChange={handleStateChange}
    >
      <option value="">Select a state</option>
      {states?.map((state) => (
        <option key={state.id} value={state.id}>
          {state.name}
        </option>
      ))}
    </select>
  );
};

export default StateFilter;
