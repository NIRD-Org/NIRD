import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NirdViewIcon } from "@/components/admin/Icons";

const TrainingApprovalPage = () => {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState("");

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/training/${id}`);
        setTraining(data?.data);
      } catch (error) {
        console.error("Error fetching Training:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraining();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/v1/training/${id}/approve`, formData);
      tst.success("Training approved");
    } catch (error) {
      console.error("Error approving Training:", error);
      tst.error("Error approving Training");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!training) {
    return <div>Training not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>Training Details</AdminHeader>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Programme Code</TableCell>
            <TableCell>{training.programmeCode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>{training.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>{training.type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Online/Offline</TableCell>
            <TableCell>{training.onlineOffline}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dates</TableCell>
            <TableCell>{training.dates}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Venue</TableCell>
            <TableCell>{training.venue}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created By</TableCell>
            <TableCell>{training.created_by}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <img className="w-[300px]" src={training.trainingPhotos} alt="" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Document</TableCell>
            <TableCell>
              <a
                href={training.trainingDesign}
                className="flex gap-3 items-center"
                target="_blank"
              >
                <span>View Document</span>
                <NirdViewIcon />
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 flex gap-4">
          <div className="w-max my-4">
            <Label htmlFor="decision" className="mb-2 block">
              Decision
            </Label>
            <select
              required
              className="px-4 py-2 rounded-md bg-white"
              id="decision"
              name="decision"
              value={formData.decision || ""}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  decision: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                Select
              </option>
              <option value="1">Approve</option>
              <option value="2">Send for Modification</option>
            </select>
          </div>
          <div>
            <Label htmlFor="decision" className="mb-2 block">
              Remark
            </Label>
            <Textarea
              required={formData.decision === "2"}
              value={formData.remarks || ""}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  remarks: e.target.value,
                }))
              }
              className="w-80"
              type="text"
              name="remarks"
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TrainingApprovalPage;
