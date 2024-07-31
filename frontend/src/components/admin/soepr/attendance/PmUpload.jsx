import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import AdminHeader from "../../AdminHeader";
import { FaCamera } from "react-icons/fa";
import API from "@/utils/API";
import FormField from "@/components/ui/formfield";

function SoeprPmUploadForm() {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // ISO format date
    time: new Date().toTimeString().split(" ")[0], // HH:MM:SS format
    status: "",
    remarks: "",
    location: "",
    pm_upload_file: null,
  });
  const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setIsSubmissionAllowed(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmissionAllowed) {
      tst.error("Reporting time not yet started for afternoon entry");
      return;
    }
    try {
      setPending(true);
      // Uncomment the following line when API integration is ready
      // await API.post("/api/v1/pm-upload/create", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setTimeout(() => {
        tst.success("PM upload successful");
        setPending(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      tst.error("Error submitting the form");
    }
  };

  const statusOptions = ["PR", "H", "PH", "AB", "T"];

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>PM Entry Form</AdminHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              disabled={pending}
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              disabled={pending}
            />
          </div>
          <FormField
            label="Status"
            name="status"
            type="select"
            required
            options={statusOptions}
            disabled={pending}
            value={formData.status}
            onChange={handleInputChange}
          />
          <FormField
            label="Remarks"
            name="remarks"
            type="text"
            value={formData.remarks}
            onChange={handleInputChange}
            disabled={pending}
          />
          <FormField
            label="Location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleInputChange}
            disabled={pending}
          />
          <div>
            <Label className="flex items-center">
              <span className="mr-2">Geo-Tagged Image</span>
              <button
                type="button"
                onClick={() => document.getElementById("fileInput").click()}
                className="text-blue-500"
              >
                <FaCamera size={24} />
              </button>
            </Label>
            <Input
              type="file"
              id="fileInput"
              name="pm_upload_file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              required
              className="hidden"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            pending={pending}
            disabled={!isSubmissionAllowed}
          >
            Submit
          </Button>
        </div>
      </form>
      {!isSubmissionAllowed && (
        <p className="text-red-500 mt-4 text-center">
          Reporting time not yet started for afternoon entry
        </p>
      )}
    </div>
  );
}

export default SoeprPmUploadForm;
