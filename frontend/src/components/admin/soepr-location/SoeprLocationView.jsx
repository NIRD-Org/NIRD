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

const SoeprLocationView = () => {
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
        const response = await API.get(`/api/v1/soepr-location/${userId}`);
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

    async function fetchUserLocation() {
      try {
        const response = await API.get(`/api/v1/soepr-location/${userId}`);
        const data = response.data.data.userLocations;
        console.log(data);
        setState((prev) => (prev = data.state_ids));
      } catch (error) {
        console.log(error);
      }
    }

    Promise.all([fetchStates(), fetchUserLocation()]);
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

  if (!userLocations || !states || !districts) {
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
          <TableRow>
            <TableCell>State IDs</TableCell>
            <TableCell>
              {userLocations.dist_ids
                .map(
                  (distId) => districts.find((dist) => distId == dist.id).name
                )
                .join(", ")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SoeprLocationView;
