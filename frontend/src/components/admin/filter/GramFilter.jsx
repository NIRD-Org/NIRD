import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";

const GramFilter = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const district_id = searchParams.get("district_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const [grams, setGrams] = useState([]);

  useEffect(() => {
    if (state_id && district_id && block_id) {
      getAllGp(state_id, district_id, block_id);
    }
  }, [state_id, district_id, block_id]);

  const getAllGp = async (stateId, distId, blockId) => {
    try {
      const { data } = await API.get(
        `/api/v1/gram/get?state=${stateId}&dist=${distId}&block=${blockId}`
      );
      setGrams(data?.gram || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGramChange = (event) => {
    const selectedGramId = event.target.value;
    if (selectedGramId) {
      setSearchParams({
        state_id,
        district_id,
        block_id,
        gram_id: selectedGramId,
      });
    } else {
      setSearchParams({ state_id, district_id, block_id });
    }
  };

  return (
    <select
      className={cn(
        className,
        "text-sm px-4 py-2 rounded-md bg-transparent border"
      )}
      value={gram_id}
      onChange={handleGramChange}
      disabled={!state_id || !district_id || !block_id}
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
