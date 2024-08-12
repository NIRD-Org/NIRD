import React, { useEffect, useState } from "react";
import AdminHeader from "../../AdminHeader";
import toast from "react-hot-toast";
import API from "@/utils/API";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { NirdEditIcon, NirdViewIcon } from "../../Icons";
import { Link } from "react-router-dom";

const YFPoa1View = () => {
  const [poaRecords, setPoaRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPOARecords = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/v1/yf-poa1/getUserPOAs");
        setPoaRecords(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch POA records.");
      } finally {
        setLoading(false);
      }
    };

    fetchPOARecords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>Plan of Action Records</AdminHeader>
      <Table className="mt-4">
        <TableCaption>List of POA Records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Submission Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {poaRecords.map((record, idx) => {
            const createdAt = new Date(record.created_at);
            return (
              <TableRow key={idx}>
                <TableCell>
                  {createdAt.toLocaleString("en-IN", { month: "long" })}
                </TableCell>
                <TableCell>{createdAt.toLocaleDateString("en-IN")}</TableCell>
                <TableCell>{createdAt.toLocaleTimeString("en-IN")}</TableCell>
                <TableCell className="flex gap-4">
                  <Link to={`/admin/yf/POA1/view/${record.id}`}>
                    <NirdViewIcon />
                  </Link>
                  {/* <Link to={`/admin/soepr/POA1/edit/${record.id}`}> */}
                  <NirdEditIcon />
                  {/* </Link> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default YFPoa1View;
