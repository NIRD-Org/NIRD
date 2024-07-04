import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { NirdViewIcon } from "@/components/admin/Icons";
import AdminHeader from "../AdminHeader";

const AmUploadView = () => {
  const { id } = useParams();
  const [amUpload, setAmUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAmUpload = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/am-upload/${id}`);
        setAmUpload(data?.data);
      } catch (error) {
        console.error("Error fetching AM upload:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmUpload();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!amUpload) {
    return <div>AM Upload not found</div>;
  }

  const fields = [
    { label: "State", value: amUpload.state_id },
    { label: "District", value: amUpload.dist_id },
    { label: "Block", value: amUpload.block_id },
    { label: "GP", value: amUpload.gp_id },
    { label: "Date", value: amUpload.date },
    { label: "Remarks", value: amUpload.remarks },
    {
      label: "File",
      value: (
        <a href={amUpload.file} className="flex gap-3 items-center">
          <span>View File</span>
          <NirdViewIcon />
        </a>
      ),
    },
    { label: "Status", value: amUpload.status },
  ];

  return (
    <div>
      <AdminHeader>AM Upload</AdminHeader>
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

export default AmUploadView;
