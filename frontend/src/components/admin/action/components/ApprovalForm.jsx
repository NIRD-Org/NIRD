import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { tst } from "@/lib/utils";
import API from "@/utils/API";

const ApprovalForm = ({ endpoint, headerText, DetailsView }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ decision: "", remarks: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`${endpoint}/${id}/approve`, formData);
      tst.success(`${headerText} approved`);
    } catch (error) {
      console.error(`Error approving ${headerText}:`, error);
      tst.error(`Error approving ${headerText}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>{headerText}</AdminHeader>
      <DetailsView />
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
            <Label htmlFor="remarks" className="mb-2 block">
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

export default ApprovalForm;
