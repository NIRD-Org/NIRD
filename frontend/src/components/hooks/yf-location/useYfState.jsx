import API from "@/utils/API";
import { useEffect, useState } from "react";

export function useYfState() {
  const [yfStates, setYfStates] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statesResponse = await API.get("/api/v1/state/all");
        const states = statesResponse.data.states;

        const userLocationsResponse = await API.get("/api/v1/user-location");
        const { userLocations } = userLocationsResponse.data.data;
        const yfStateIds = userLocations ? userLocations.state_ids : [];
        
        const yfStates = states ? states.filter(state => yfStateIds.includes(state.id)) : [];
        
        setYfStates(yfStates || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { yfStates };
}
