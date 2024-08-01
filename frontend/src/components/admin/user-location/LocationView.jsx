import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

const LocationView = ({ role }) => {
  const { userId } = useParams();
  const [userLocations, setUserLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(null);
  const [states, setStates] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [gps, setGps] = useState(null);

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        setIsLoading(true);
        const response = await API.get(`/api/v1/user-location/${userId}`);
        const { userLocations } = response.data.data;
        setUserLocations(userLocations);
      } catch (error) {
        console.error("Error fetching user locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserLocations();
  }, [userId]);
  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await API.get("/api/v1/state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchBlocks() {
      try {
        const response = await API.get(`/api/v1/block/all`);
        setBlocks(response.data || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchGPs() {
      try {
        const { data } = await API.get(`/api/v1/gram/all`);
        setGps(data?.gps || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchUserLocation() {
      try {
        const response = await API.get(`/api/v1/user-location/${userId}`);
        const data = response.data.data.userLocations;
        console.log(data);
        setState((prev) => (prev = data.state_ids));
      } catch (error) {
        console.log(error);
      }
    }

    Promise.all([
      fetchBlocks(),
      fetchGPs(),
      fetchStates(),
      fetchUserLocation(),
    ]);
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (state) {
        try {
          const response = await API.get(`/api/v1/dist/state/${state}`);
          setDistricts(response.data?.districts || []);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchDistricts();
  }, [state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userLocations || !states || !districts || !blocks || !gps) {
    return;
  }

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>User Location Details</AdminHeader>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{userId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>State IDs</TableCell>
            <TableCell>
              {userLocations.state_ids
                .map(
                  (stateId) => states.find((state) => stateId == state.id).name
                )
                .join(", ")}
            </TableCell>
          </TableRow>
          {role == 3 && (
            <>
              {" "}
              {/*  <TableRow>
                <TableCell>District IDs</TableCell>
                <TableCell>{userLocations.district_ids}</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell>Block IDs</TableCell>
                <TableCell>
                  {userLocations.block_ids
                    .map(
                      (blockId) =>
                        blocks.find((block) => blockId == block.id).name
                    )
                    .join(", ")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>GP IDs</TableCell>
                <TableCell>
                  {userLocations.gp_ids
                    .map((gpid) => gps.find((gp) => gpid == gp.id).name)
                    .join(", ")}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LocationView;
