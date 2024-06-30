// useState.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

const useStates = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/api/v1/state/all`);
        setStates(data?.states || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  return { states, loading };
};
export default useStates;
