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
import { showAlert } from "@/utils/showAlert";

function SoeprAmUploadForm() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    amStatus: "",
    remarks: "",
    location: "",
    am_upload_file: null,
  });
  const [weekday, setWeekday] = useState("");
  const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // New state for image preview URL

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    setFormData((prev) => ({
      ...prev,
      date: now.toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0], // HH:MM:SS format
    }));

    if (currentHour >= 18) {
      setIsSubmissionAllowed(false);
    }

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setWeekday(daysOfWeek[now.getDay()]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, am_upload_file: files[0] }));
      setImageUploaded(true);
      setPreviewUrl(URL.createObjectURL(files[0])); // Set preview URL
    } else {
      setImageUploaded(false);
      setPreviewUrl(null); // Clear preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.weekday = weekday;
    if (!isSubmissionAllowed) {
      tst.error("Reporting time completed for morning entry");
      return;
    }
    try {
      setPending(true);
      await API.post("/api/v1/am-upload/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showAlert("AM upload successful", "success");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setPending(false);
    }
  };

  const statusOptions = [
    { value: "PR", label: "Present" },
    { value: "H", label: "Holiday" },
    { value: "PH", label: "Public Holiday" },
    { value: "L", label: "Leave" },
    { value: "T", label: "Tour" },
  ];

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>AM Entry Form</AdminHeader>
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
            <Input type="text" value={weekday} readOnly />
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
            name="amStatus"
            type="select"
            required
            options={statusOptions}
            disabled={pending}
            value={formData.amStatus}
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
              name="am_upload_file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              required
              className="hidden"
            />
            <p className="text-red-500">
              {imageUploaded ? "Image uploaded" : "No image uploaded"}
            </p>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 border border-gray-300"
                style={{
                  width: "120px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            )}
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
          Reporting for Morning Entry is closed for the day!
        </p>
      )}
    </div>
  );
}

export default SoeprAmUploadForm;
