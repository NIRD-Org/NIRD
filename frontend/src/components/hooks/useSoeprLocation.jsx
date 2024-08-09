import API from "@/utils/API";
import { useEffect, useState } from "react";

export function useSoeprLocation({ state_id }) {
  const [soeprState, setsoeprState] = useState([]);
  const [soeprDist, setsoeprDist] = useState([]);

  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await API.get("/api/v1/soepr-location");
        const data = response.data.data;
        setUserLocation(data);
        setsoeprState(data.states);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserLocations();
  }, []);

  useEffect(() => {
    setsoeprDist([]);

    const fetchDistricts = async () => {
      try {
        const soeprDist = userLocation.districts.filter(
          (dist) => dist.state_id === state_id
        );
        setsoeprDist(soeprDist || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (state_id) fetchDistricts();
  }, [state_id, userLocation.districts]);

  return { soeprState, soeprDist };
}
