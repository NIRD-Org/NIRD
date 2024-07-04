import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";
import { useYfLocation } from "@/components/hooks/useYfLocation";

const GramFilter = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const [grams, setGrams] = useState([]);
  const { yfGp } = useYfLocation({ state_id, block_id, dist_id});

  useEffect(() => {
    if (block_id) {
      getAllGp(state_id, dist_id, block_id);
    } else {
      setGrams([]);
    }
  }, [state_id, dist_id, block_id]);

  const getAllGp = async blockId => {
    try {
      const { data } = await API.get(`/api/v1/gram/get?block=${block_id}`);
      setGrams(data?.gram || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGramChange = event => {
    const selectedGramId = event.target.value;
    if (selectedGramId) {
      setSearchParams({
        state_id,
        dist_id,
        block_id,
        gram_id: selectedGramId,
      });
    } else {
      setSearchParams({ state_id, dist_id, block_id });
    }
  };

  return (
    <select
      className={cn(
        className,
        "text-sm px-4 py-2 rounded-md bg-white border w w-full"
      )}
      value={gram_id}
      onChange={handleGramChange}
      disabled={!block_id}
    >
      <option value="">Select a GP</option>
      {(yfGp ? yfGp : grams).map(gram => (
        <option key={gram.id} value={gram.id}>
          {gram.name}
        </option>
      ))}
    </select>
  );
};

export default GramFilter;
