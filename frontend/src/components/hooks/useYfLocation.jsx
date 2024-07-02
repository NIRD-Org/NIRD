import API from "@/utils/API";
import { useEffect, useState } from "react";

export function useYfLocation({ state_id, dist_id, block_id }) {
  const [yfState, setYfState] = useState(null);
  const [yfDist, setYfDist] = useState(null);
  const [yfBlock, setYfBlock] = useState(null);
  const [yfGp, setYfGp] = useState(null);

  const [userLocationIds, setUserLocationIds] = useState({
    state_ids: [],
    district_ids: [],
    block_state_ids: [],
    gp_ids: []
  });

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await API.get("/api/v1/user-location");
        const { userLocations } = response.data.data;
        setUserLocationIds({
          state_ids: userLocations?.state_ids || [],
          district_ids: userLocations?.district_ids || [],
          block_state_ids: userLocations?.block_state_ids || [],
          gp_ids: userLocations?.gp_ids || []
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserLocations();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateResponse = await API.get("/api/v1/state/all");
        const states = stateResponse.data.states;
        const yfState = states ? states.filter(state => userLocationIds.state_ids.includes(state.id)) : [];
        setYfState(yfState || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStates();
  }, [userLocationIds]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!state_id) return;
      try {
        const distResponse = await API.get(`/api/v1/district/all?state_id=${state_id}`);
        const districts = distResponse.data.districts;
        const yfDist = districts ? districts.filter(district => userLocationIds.district_ids.includes(district.id)) : [];
        setYfDist(yfDist || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDistricts();
  }, [state_id, userLocationIds]);

  useEffect(() => {
    const fetchBlocks = async () => {
      if (!dist_id) return;
      try {
        const blockResponse = await API.get(`/api/v1/block/all?district_id=${dist_id}`);
        const blocks = blockResponse.data.blocks;
        const yfBlock = blocks ? blocks.filter(block => userLocationIds.block_state_ids.includes(block.id)) : [];
        setYfBlock(yfBlock || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlocks();
  }, [dist_id, userLocationIds]);

  useEffect(() => {
    const fetchGps = async () => {
      if (!block_id) return;
      try {
        const gpResponse = await API.get(`/api/v1/gp/all?block_id=${block_id}`);
        const gps = gpResponse.data.gps;
        const yfGp = gps ? gps.filter(gp => userLocationIds.gp_ids.includes(gp.id)) : [];
        setYfGp(yfGp || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGps();
  }, [block_id, userLocationIds]);

  return { yfState, yfDist, yfBlock, yfGp };
}
