import API from "@/utils/API";
import { useEffect, useState } from "react";

export function useAdminState() {
  const [states, setStates] = useState(null);
  const [userLocations, setUserLocations] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await API.get("/api/v1/state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserLocations = async () => {
      try {
        const response = await API.get("/api/v1/user-location");
        setUserLocations(response.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStates();
    fetchUserLocations();
  }, []);

  const adminStateIds = userLocations
    ? userLocations?.userLocations?.state_ids
    : [];
  const adminStates = states
    ? states?.filter((state) => adminStateIds.includes(state.id))
    : [];

  return { adminStates };
}
