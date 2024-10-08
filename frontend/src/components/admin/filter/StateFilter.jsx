import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";
import { useYfLocation } from "@/components/hooks/useYfLocation";
const StateFilter = ({ className, yf, defaultValue, type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const [states, setStates] = useState([]);
  const { yfState } = useYfLocation({
    state_id: state_id,
    block_id: "",
    dist_id: "",
  });

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    if (type == "soepr") {
      const { data } = await API.get(`/api/v1/soepr-state/all`);
      setStates(data?.states);
    } else {
      const { data } = await API.get(`/api/v1/state/all`);
      setStates(data?.states);
    }
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
        "text-sm px-4 py-2 rounded-md bg-white border w-[200px]"
      )}
      value={state_id}
      defaultValue={defaultValue}
      onChange={handleStateChange}
    >
      <option value="">Select a state</option>
      {(yf ? yfState : states)?.map((state) => (
        <option key={state.id} value={state.id}>
          {state.name}
        </option>
      ))}
    </select>
  );
};

export default StateFilter;
