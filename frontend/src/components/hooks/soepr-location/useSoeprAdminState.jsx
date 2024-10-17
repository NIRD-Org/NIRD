// useState.js
import { useEffect, useState } from "react";
import API from "@/utils/API";

export const useSoeprAdminStates = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/api/v1/soepr-state/all`);
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
