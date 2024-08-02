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

function SoeprAmUploadForm() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toString().split("T")[0], // ISO format date
    time: new Date().toTimeString().split(" ")[0], // HH:MM:SS format
    amStatus: "",
    remarks: "",
    location: "",
    am_upload_file: null,
  });
  const [weekday, setWeekday] = useState("");
  const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18) {
      setIsSubmissionAllowed(false);
    }

    const dateObj = new Date(formData.date);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[dateObj.getDay()];
    setWeekday(dayName);
  }, [formData.date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({ ...prev, am_upload_file: files[0] }));
    setImageUploaded(!!files.length);
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
      // Uncomment the following line when API integration is ready
      await API.post("/api/v1/am-upload/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      tst.success("AM upload successful");
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
    { value: "AB", label: "Absent" },
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
