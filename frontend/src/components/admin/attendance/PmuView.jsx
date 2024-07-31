import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { NirdViewIcon } from "@/components/admin/Icons";
import AdminHeader from "../AdminHeader";

const PmUploadView = () => {
  const { id } = useParams();
  const [pmUpload, setPmUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPmUpload = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/pm-upload/${id}`);
        setPmUpload(data?.data);
      } catch (error) {
        console.error("Error fetching PM upload:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPmUpload();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pmUpload) {
    return <div>PM Upload not found</div>;
  }

  const fields = [
    { label: "State", value: pmUpload.state_id },
    { label: "District", value: pmUpload.dist_id },
    { label: "Block", value: pmUpload.block_id },
    { label: "GP", value: pmUpload.gp_id },
    { label: "Date", value: pmUpload.date },
    { label: "Remarks", value: pmUpload.remarks },
    {
      label: "File",
      value: (
        <a href={pmUpload.file} className="flex gap-3 items-center">
          <span>View File</span>
          <NirdViewIcon />
        </a>
      ),
    },
    { label: "Status", value: pmUpload.status },
  ];

  return (
    <div>
      <AdminHeader>PM Upload</AdminHeader>
      <Table>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={index}>
              <TableCell>{field.label}</TableCell>
              <TableCell>{field.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PmUploadView;
