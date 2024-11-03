import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminHeader from "../../AdminHeader";
import API from "@/utils/API";
import FormField from "@/components/ui/formfield";
import toast from "react-hot-toast";
import { showAlert } from "@/utils/showAlert";

function SoeprLeaveUpdateForm() {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
  });

  const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour >= 18) {
      setIsSubmissionAllowed(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmissionAllowed) {
      toast.error("Leave update not allowed at this time.");
      return;
    }

    // You can perform the range update logic here
    try {
      setPending(true);
      await API.post("/api/v1/am-upload/create/leave", formData);
      showAlert(
        "Leave updated successfully for the selected range.",
        "success"
      );
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setPending(false);
    }
  };

  const leaveOptions = [
    { value: "Personal Leave", label: "Personal Leave" },
    { value: "Planned Leave", label: "Planned Leave" },
    { value: "Emergency Leave", label: "Emergency Leave" },
  ];

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>Leave Update Form</AdminHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <Label>From Date</Label>
            <Input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>To Date</Label>
            <Input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <FormField
            label="Leave Type"
            name="leaveType"
            type="select"
            required
            options={leaveOptions}
            disabled={pending}
            value={formData.leaveType}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            pending={pending}
            disabled={!isSubmissionAllowed || pending}
          >
            Update Leave
          </Button>
        </div>
      </form>
      {!isSubmissionAllowed && (
        <p className="text-red-500 mt-4 text-center">
          Leave updates are not allowed at this time!
        </p>
      )}
    </div>
  );
}

export default SoeprLeaveUpdateForm;
