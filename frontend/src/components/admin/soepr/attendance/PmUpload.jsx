import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import AdminHeader from "../../AdminHeader";
import { FaCamera } from "react-icons/fa";
import API from "@/utils/API";
import FormField from "@/components/ui/formfield";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SoeprPmUploadForm() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // ISO format date
    weekday: new Date().toLocaleDateString(undefined, { weekday: "long" }), // Day of the week
    time: new Date().toTimeString().split(" ")[0], // HH:MM:SS format
    pmStatus: "",
    remarks: "",
    location: "",
    pm_upload_file: null,
  });
  const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);
  const [imageUploaded, setImageUploaded] = useState(false);

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
    setImageUploaded(files.length > 0); // Set true if a file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmissionAllowed) {
      tst.error("Reporting time not yet started for afternoon entry");
      return;
    }
    try {
      setPending(true);
      await API.post("/api/v1/pm-upload/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      tst.success("PM upload successful");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setPending(false);
    }
  };

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
              readOnly
            />
          </div>
          <div>
            <Label>Day</Label>
            <Input
              type="text"
              name="day"
              value={formData.weekday}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <FormField
            label="Status"
            name="pmStatus"
            type="select"
            required
            options={[
              { value: "PR", label: "Present" },
              { value: "H", label: "Holiday" },
              { value: "PH", label: "Public Holiday" },
              { value: "AB", label: "Absent" },
              { value: "T", label: "Tour" },
            ]}
            disabled={pending}
            value={formData.pmStatus}
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
            <p className="text-red-500 mt-2">
              {imageUploaded ? "Image uploaded" : "No image uploaded"}
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            pending={pending}
            disabled={!isSubmissionAllowed || pending}
          >
            Submit
          </Button>
        </div>
      </form>
      {!isSubmissionAllowed && (
        <p className="text-red-500 mt-4 text-center">
          Reporting time not yet started for afternoon entry. Please try after
          12.00 PM!
        </p>
      )}
    </div>
  );
}

export default SoeprPmUploadForm;
