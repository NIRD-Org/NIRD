import API from "@/utils/API";
import { useEffect, useState } from "react";

export function useSoeprState() {
  const [soeprStates, setsoeprStates] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statesResponse = await API.get("/api/v1/soepr-state/all");
        const states = statesResponse.data.states;

        const userLocationsResponse = await API.get("/api/v1/soepr-location");
        const { userLocations } = userLocationsResponse.data.data;
        const soeprStateIds = userLocations ? userLocations.state_ids : [];

        const soeprStates = states
          ? states.filter((state) => soeprStateIds.includes(state.id))
          : [];

        setsoeprStates(soeprStates || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { soeprStates };
}
