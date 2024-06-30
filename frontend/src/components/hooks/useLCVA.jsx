// useLCVA.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useLCVA = ({state_id, dist_id, block_id, gram_id, theme_id}) => {
  const [LCVA, setLCVA] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllLCVA = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/api/v1/lcva/all`, {
          params: {
            state_id,
            dist_id,
            block_id,
            gp_id: gram_id,
            theme_id,
          },
        });
        data?.data?.sort((a, b) => b.id - a.id);
        setLCVA(data?.data || []);
      } catch (error) {
        console.log("Error fetching LCVA :", error);
      } finally {
        setLoading(false);
      }
    };
    getAllLCVA();
  }, [state_id, dist_id, block_id, gram_id, theme_id]);

  return { LCVA, loading };
};

export default useLCVA;