// useGpDetails.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useGpDetails = (state_id, dist_id, block_id, gram_id) => {
  const [gpDetailsApprovals, setGpDetailsApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllGpDetailsApprovals = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/api/v1/gp-details/all`, {
          params: {
            state_id,
            dist_id,
            block_id,
            gp_id: gram_id,
          },
        });
        data?.data?.sort((a, b) => b.id - a.id);
        setGpDetailsApprovals(data?.data || []);
      } catch (error) {
        console.log("Error fetching GP Details Approvals:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllGpDetailsApprovals();
  }, [state_id, dist_id, block_id, gram_id]);

  return { gpDetailsApprovals, loading };
};

export default useGpDetails;