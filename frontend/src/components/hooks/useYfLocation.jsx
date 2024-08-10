import API from "@/utils/API";
import { useEffect, useState } from "react";

export function useYfLocation({ state_id, dist_id, block_id }) {
  const [yfState, setYfState] = useState([]);
  const [yfDist, setYfDist] = useState([]);
  const [yfBlock, setYfBlock] = useState([]);
  const [yfGp, setYfGp] = useState([]);

  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await API.get("/api/v1/user-location");
        const data = response.data.data;
        setUserLocation(data);
        setYfState(data.states);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserLocations();
  }, []);

  useEffect(() => {
    setYfDist([]);
    setYfBlock([]);
    setYfGp([]);

    const fetchDistricts = async () => {
      try {
        const yfDist = userLocation.districts.filter(
          (dist) => dist.state_id === state_id
        );
        setYfDist(yfDist || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (state_id) fetchDistricts();
  }, [state_id, userLocation.districts]);

  useEffect(() => {
    setYfBlock([]);
    setYfGp([]);

    const fetchBlocks = async () => {
      try {
        const yfBlock = userLocation.blocks.filter(
          (block) => block.dist_id === dist_id
        );
        setYfBlock(yfBlock || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (dist_id) fetchBlocks();
  }, [dist_id, userLocation.blocks]);

  useEffect(() => {
    setYfGp([]);

    const fetchGps = async () => {
      try {
        const yfGp = userLocation.gps.filter(
          (gps) => gps.block_id === block_id
        );
        setYfGp(yfGp || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (block_id) fetchGps();
  }, [block_id, userLocation.gps]);

  return { yfState, yfDist, yfBlock, yfGp };
}
