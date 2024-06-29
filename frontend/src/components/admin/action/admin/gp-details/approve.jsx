import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NirdViewIcon } from "@/components/admin/Icons";

const GpDetailsApprovalPage = () => {
  const { id } = useParams();
  const [gpDetails, setGpDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    decision: "",
    remarks: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/v1/gp-details/${id}/approve`, formData);
      tst.success("GP Details approved");
    } catch (error) {
      console.error("Error approving GP Details:", error);
      tst.error("Error approving GP Details");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!gpDetails) {
    return <div>GP Details not found</div>;
  }

  // Extracting fields dynamically
  const fields = Object.entries(gpDetails);

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>GP Details Approval</AdminHeader>
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
              <img className="w-[300px]" src={gpDetails.panchayatDetails.image} alt="" />
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

      <form onSubmit={handleSubmit}>
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="w-full md:w-1/2 my-4">
            <Label htmlFor="decision" className="mb-2 block">
              Decision
            </Label>
            <select
              required
              className="px-4 py-2 rounded-md bg-white"
              id="decision"
              name="decision"
              value={formData.decision}
              onChange={(e) =>
                setFormData({ ...formData, decision: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="1">Approve</option>
              <option value="2">Send for Modification</option>
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="remarks" className="mb-2 block">
              Remarks
            </Label>
            <Textarea
              required={formData.decision === "2"}
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              className="w-full"
              id="remarks"
              name="remarks"
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default GpDetailsApprovalPage;
