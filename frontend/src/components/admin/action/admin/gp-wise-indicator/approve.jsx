import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import API from "@/utils/API";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { tst } from "@/lib/utils";
import IndicatorView from "./cview";
import AdminHeader from "@/components/admin/AdminHeader";
import { showAlert } from "@/utils/showAlert";

function IndicatorApprovalAdminForm() {
  const [formData, setFormData] = useState({ decision: "", remarks: "" });
  const navigate = useNavigate();
  const { id: submitted_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        decision: formData.decision,
        remarks: formData.remarks,
      };
      const url = `/api/v1/indicator-approvals/update/${submitted_id}`;
      await API.put(url, body);
      showAlert("Form submitted successfully", "success");
      //   navigate("/admin/admin-action-form");
    } catch (error) {
      tst.error("Failed to submit form");
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <AdminHeader>Young Fellow - Indicator Entry Form</AdminHeader>
      <IndicatorView />
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
}

export default IndicatorApprovalAdminForm;
