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

const GoodPracticeApprovalPage = () => {
  const { id } = useParams();
  const [goodPractice, setGoodPractice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState("");

  useEffect(() => {
    const fetchGoodPractice = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/good-practice/${id}`);
        setGoodPractice(data?.data);
      } catch (error) {
        console.error("Error fetching Good Practice:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoodPractice();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/api/v1/good-practice/${id}/approve`, formData);
      tst.success("Good Practice approved");
    } catch (error) {
      console.error("Error approving Good Practice:", error);
      tst.error("Error approving Good Practice");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!goodPractice) {
    return <div>Good Practice not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>Good Practice Details</AdminHeader>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Theme</TableCell>
            <TableCell>{goodPractice.theme_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>{goodPractice.state_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>District</TableCell>
            <TableCell>{goodPractice.dist_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Block</TableCell>
            <TableCell>{goodPractice.block_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GP</TableCell>
            <TableCell>{goodPractice.gp_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Activity Title</TableCell>
            <TableCell>{goodPractice.activityTitle}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <img className="w-[300px]" src={goodPractice.image} alt="" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Document</TableCell>
            <TableCell>
              <a
                href={goodPractice.document}
                className="flex gap-3 items-center"
                target="_blank"
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
                href={goodPractice.video}
                className="flex gap-3 items-center"
                target="_blank"
              >
                <span>View Video</span>
                <NirdViewIcon />
              </a>
              {/* <video width={"300px"} src={goodPractice.video}></video> */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created By</TableCell>
            <TableCell>{goodPractice.created_by}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 flex  gap-4">
          <div className="w-max my-4">
            <Label htmlFor="decision" className="mb-2 block">
              Decision
            </Label>
            <select
              required
              className="px-4 py-2 rounded-md bg-white "
              id="decision"
              name="decision"
              value={formData.decision || ""}
              onChange={e =>
                setFormData(prevData => ({
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
              onChange={e =>
                setFormData(prevData => ({
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

export default GoodPracticeApprovalPage;
