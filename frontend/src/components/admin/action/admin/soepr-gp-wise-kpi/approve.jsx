import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { tst } from "@/lib/utils";
import GpWiseKpiView from "./cview";
import { showAlert } from "@/utils/showAlert";

function GpWiseKpiApprovalPage() {
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

      const url = `/api/v1/soepr-kpi-approvals/update/${submitted_id}`;
      const response = await API.put(url, body);
      console.log(response.data);
      showAlert("Form submitted successfully", "success");
    } catch (error) {
      tst.error("Failed to submit form");
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div>
        <GpWiseKpiView />
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
    </div>
  );
}

// import React from "react";
// import ApprovalForm from "../../components/ApprovalForm";
// import GpWiseKpiView from "./cview";

// const GpWiseKpiApprovalPage = () => {
//   return (
//     <ApprovalForm
//       endpoint="/api/v1/kpi-approvals/update"
//       headerText=" Young Fellow - KPI Entry Form"
//       DetailsView={GpWiseKpiView}
//     />
//   );
// };

export default GpWiseKpiApprovalPage;
