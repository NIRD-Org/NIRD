// useGoodPractice.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useGoodPractice = ({state_id, dist_id, block_id, gram_id, theme_id}) => {
  const [goodPractice, setGoodPractice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllGoodPractice = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/api/v1/good-practice/all`, {
          params: {
            state_id,
            dist_id,
            block_id,
            gp_id: gram_id,
            theme_id,
          },
        });
        data?.data?.sort((a, b) => b.id - a.id);
        setGoodPractice(data?.data || []);
      } catch (error) {
        console.log("Error fetching Good Practice :", error);
      } finally {
        setLoading(false);
      }
    };
    getAllGoodPractice();
  }, [state_id, dist_id, block_id, gram_id, theme_id]);

  return { goodPractice, loading };
};

export default useGoodPractice;