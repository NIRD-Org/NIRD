import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import AdminHeader from "../../AdminHeader";

const Poa1DetailPage = () => {
  const [poa1Data, setPoa1Data] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/api/v1/poa1/get/${id}`);
        console.log(response);
        setPoa1Data(response.data.data);
      } catch (error) {
        console.error("Error fetching POA1 data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!poa1Data) return <div>Loading...</div>;

  return (
    <div>
      <AdminHeader>
        First Fortnightly Plan Of Action - Month :{" "}
        {new Date(poa1Data.created_at).toLocaleString("en-IN", {
          month: "long",
        })}{" "}
        2024
      </AdminHeader>
      <Table>
        <TableCaption>Details for POA1 ID: {poa1Data.id}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Weekday</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Planned Event</TableHead>
            <TableHead>State ID</TableHead>
            <TableHead>Dist ID</TableHead>
            <TableHead>Achievements</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {poa1Data.poaData.map((dayData, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(dayData.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{dayData.weekday}</TableCell>
              <TableCell>{dayData.plan}</TableCell>
              <TableCell>{dayData.action}</TableCell>
              <TableCell>{dayData.plannedEvent}</TableCell>
              <TableCell>{dayData.state_id}</TableCell>
              <TableCell>{dayData.dist_id}</TableCell>
              <TableCell>{dayData.achievements}</TableCell>
              <TableCell>
                {dayData.photo ? (
                  <img
                    src={dayData.photo}
                    alt="Photo"
                    style={{ maxWidth: "100px" }}
                  />
                ) : (
                  "No photo"
                )}
              </TableCell>
              <TableCell>{dayData.remarks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan="10">End of POA1 Details</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Poa1DetailPage;
