import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminHeader from "../../AdminHeader";
import axios from "axios";
import toast from "react-hot-toast";
import API from "@/utils/API";

const POAview = () => {
  const [poaRecords, setPoaRecords] = useState([]);

  // Fetch POA records for the logged-in user
  useEffect(() => {
    const fetchPOARecords = async () => {
      try {
        const { data } = await API.get("/api/v1/poa1/");
        setPoaRecords(data?.data?.poaData);
      } catch (error) {
        toast.error("Failed to fetch POA records.");
      }
    };

    fetchPOARecords();
  }, []);

  // Extract submission date and time from the timestamp
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const submissionDate = date.toLocaleDateString("en-IN");
    const submissionTime = date.toLocaleTimeString("en-IN");
    return { submissionDate, submissionTime };
  };

  return (
    <div style={{ fontSize: "14px", maxWidth: "100%", margin: "0 auto" }}>
      <AdminHeader>Plan of Action Records</AdminHeader>
      <table
        border="1"
        cellPadding="3"
        cellSpacing="0"
        style={{ width: "100%", marginTop: "20px", fontSize: "14px" }}
      >
        <thead>
          <tr>
            <th>Submission Date</th>
            <th>Submission Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {poaRecords.map((record, idx) => {
            const { submissionDate, submissionTime } = formatDateTime(
              record.date
            );
            return (
              <tr key={idx}>
                <td>{submissionDate}</td>
                <td>{submissionTime}</td>
                <td>
                  <Button
                    onClick={() => handleView(record.id)}
                    className="mr-2"
                  >
                    View
                  </Button>
                  <Button onClick={() => handleEdit(record.id)}>Edit</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Handle view action
const handleView = (id) => {
  // Redirect or open modal with details of the selected POA record
  console.log(`Viewing POA record with ID: ${id}`);
};

// Handle edit action
const handleEdit = (id) => {
  // Redirect to edit page or open modal with the edit form
  console.log(`Editing POA record with ID: ${id}`);
};

export default POAview;
