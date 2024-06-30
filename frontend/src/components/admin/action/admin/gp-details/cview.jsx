import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { NirdViewIcon } from "@/components/admin/Icons";
import { useParams } from "react-router-dom";
import API from "@/utils/API";

function GpDetailsView() {
  const [gpDetails, setGpDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchGpDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/gp-details/${id}`);
        setGpDetails(data?.data);
      } catch (error) {
        console.error("Error fetching GP Details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGpDetails();
  }, [id]);

  if (isLoading) return;

  if (!gpDetails) return <div>No GP Details found</div>;
  
  const fields = Object.entries(gpDetails);

  return (
    <Table>
      <TableBody>
        {fields.map(([key, value]) => {
          if (typeof value === "object") {
            return Object.entries(value).map(([subKey, subValue]) => (
              <TableRow key={`${key}-${subKey}`}>
                <TableCell>{subKey}</TableCell>
                <TableCell>{subValue}</TableCell>
              </TableRow>
            ));
          } else {
            return (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          }
        })}
        {/* Example for fixed fields */}
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>
            <img
              className="w-[300px]"
              src={gpDetails.panchayatDetails.image}
              alt=""
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Document</TableCell>
          <TableCell>
            <a
              href={gpDetails.panchayatDetails.document}
              className="flex gap-3 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Document</span>
              <NirdViewIcon />
            </a>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Video</TableCell>
          <TableCell>
            <a
              href={gpDetails.panchayatDetails.video}
              className="flex gap-3 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Video</span>
              <NirdViewIcon />
            </a>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Created By</TableCell>
          <TableCell>{gpDetails.created_by}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default GpDetailsView;
