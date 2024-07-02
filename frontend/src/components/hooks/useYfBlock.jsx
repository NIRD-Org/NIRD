import API from "@/utils/API";
import { useEffect, useState } from "react";

export function useYfBlock({ state_id, gp_id, block_id, dist_id }) {
  const [yfBlock, setYfBlock] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blockResponse = await API.get(`/api/v1/block/all?state_id=${dist_id}`);
        const block = blockResponse.data.block;

        const userLocationsResponse = await API.get("/api/v1/user-location");
        const { userLocations } = userLocationsResponse.data.data;
        const yfBlockIds = userLocations ? userLocations.block_ids : [];

        const yfBlock = block ? block.filter(block => yfBlockIds.includes(block.id)) : [];

        setYfBlock(yfBlock || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (dist_id) fetchData();
  }, []);

  return { yfBlock };
}
