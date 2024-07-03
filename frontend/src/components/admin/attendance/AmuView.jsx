import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { NirdViewIcon } from "@/components/admin/Icons";

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
    { label: "State", value: amUpload.state_name },
    { label: "District", value: amUpload.dist_name },
    { label: "Block", value: amUpload.block_name },
    { label: "GP", value: amUpload.gp_name },
    { label: "Date", value: amUpload.date },
    { label: "Remarks", value: amUpload.remarks },
    {
      label: "File",
      value: (
        <a
          href={amUpload.file}
          className="flex gap-3 items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>View File</span>
          <NirdViewIcon />
        </a>
      ),
    },
    { label: "Created By", value: amUpload.created_by },
    { label: "Decision", value: amUpload.decision },
    { label: "Status", value: amUpload.status },
  ];

  return (
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
  );
};

export default AmUploadView;
