import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";

const GramFilter = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const taluk_id = searchParams.get("taluk_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const [grams, setGrams] = useState([]);

  useEffect(() => {
    if (state_id && dist_id && taluk_id) {
      getAllGp(state_id, dist_id, taluk_id);
    }
  }, [state_id, dist_id, taluk_id]);

  const getAllGp = async (stateId, distId, talukId) => {
    try {
      const { data } = await API.get(`/api/v1/gram/get?state=${stateId}&dist=${distId}&taluk=${talukId}`);
      setGrams(data?.gram || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGramChange = (event) => {
    const selectedGramId = event.target.value;
    if (selectedGramId) {
      setSearchParams({ state_id, dist_id, taluk_id, gram_id: selectedGramId });
    } else {
      setSearchParams({ state_id, dist_id, taluk_id });
    }
  };

  return (
    <select
      className={cn(className, "text-sm px-4 py-2 rounded-md bg-transparent border")}
      value={gram_id}
      onChange={handleGramChange}
      disabled={!state_id || !dist_id || !taluk_id}
    >
      <option value="">Select a gram</option>
      {grams.map((gram) => (
        <option key={gram.id} value={gram.id}>
          {gram.name}
        </option>
      ))}
    </select>
  );
};

export default GramFilter;
