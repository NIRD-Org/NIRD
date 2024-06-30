// useTraining.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useTraining = ({ state_id }) => {
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllTraining = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(
          `/api/v1/training/all?state_id=${state_id || ""}`
        );
        data?.data?.sort((a, b) => b.id - a.id);
        setTraining(data?.data || []);
      } catch (error) {
        console.log("Error fetching Training :", error);
      } finally {
        setLoading(false);
      }
    };
    getAllTraining();
  }, [state_id]);

  return { training, loading };
};

export default useTraining;
