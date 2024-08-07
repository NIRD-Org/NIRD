import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/utils/API";
import { useYfLocation } from "@/components/hooks/useYfLocation";

const BlockFilter = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const [blocks, setblocks] = useState([]);
  const { yfBlock } = useYfLocation({ state_id: state_id, block_id: "", dist_id: dist_id });

  useEffect(() => {
    if (state_id && dist_id) {
      getAllblocks(state_id, dist_id);
    }
  }, [state_id, dist_id]);

  const getAllblocks = async (stateId, distId) => {
    try {
      const url = `/api/v1/block/get?dist=${distId}`;
      console.log(url)
      const { data } = await API.get(url);
      setblocks(data?.blocks || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleblockChange = (event) => {
    const selectedblockId = event.target.value;
    if (selectedblockId) {
      setSearchParams({ state_id, dist_id, block_id: selectedblockId });
    } else {
      setSearchParams({ state_id, dist_id });
    }
  };

  return (
    <select
      className={cn(
        className,
        "text-sm px-4 py-2 rounded-md bg-white border w-full"
      )}
      value={block_id}
      onChange={handleblockChange}
      disabled={!state_id || !dist_id}
    >
      <option value="">Select a block</option>
      {(yfBlock ? yfBlock : blocks).map((block) => (
        <option key={block.id} value={block.id}>
          {block.name}
        </option>
      ))}
    </select>
  );
};

export default BlockFilter;
