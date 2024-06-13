import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";

const TalukFilter = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const taluk_id = searchParams.get("taluk_id") || "";
  const [taluks, setTaluks] = useState([]);

  useEffect(() => {
    if (state_id && dist_id) {
      getAllTaluks(state_id, dist_id);
    }
  }, [state_id, dist_id]);

  const getAllTaluks = async (stateId, distId) => {
    try {
      const url = `/api/v1/taluk/get?state=${stateId}&dist=${distId}`;
      const { data } = await API.get(url);
      setTaluks(data?.taluks || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTalukChange = (event) => {
    const selectedTalukId = event.target.value;
    if (selectedTalukId) {
      setSearchParams({ state_id, dist_id, taluk_id: selectedTalukId });
    } else {
      setSearchParams({ state_id, dist_id });
    }
  };

  return (
    <select
      className={cn(
        className,
        "text-sm px-4 py-2 rounded-md bg-transparent border w-48"
      )}
      value={taluk_id}
      onChange={handleTalukChange}
      disabled={!state_id || !dist_id}
    >
      <option value="">Select a taluk</option>
      {taluks.map((taluk) => (
        <option key={taluk.id} value={taluk.id}>
          {taluk.name}
        </option>
      ))}
    </select>
  );
};

export default TalukFilter;
