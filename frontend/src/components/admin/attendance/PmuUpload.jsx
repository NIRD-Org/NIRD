import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import FormField from "@/components/ui/formfield";
import { useYfLocation } from "@/components/hooks/useYfLocation";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";

function PmUploadForm() {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    pm_upload_file: null,
    date: "",
    pmStatus: "",
    time: "",
    location: "",
    remarks: "",
    status: "",
    weekday: "",
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

  const {
    yfState: states,
    yfBlock: blocks,
    yfDist: districts,
    yfGp: gps,
  } = useYfLocation({
    state_id: formData.state_id,
    dist_id: formData.dist_id,
    block_id: formData.block_id,
  });

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, dist_id: "" }));
  }, [formData.state_id]);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, block_id: "" }));
  }, [formData.dist_id]);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, gp_id: "" }));
  }, [formData.block_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, pm_upload_file: files[0] }));
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
    // if (!isSubmissionAllowed) {
    //   toast.error("Afternoon entry not Allowed");
    //   return;
    // }
    try {
      setPending(true);
      await API.post("/api/v1/pm-upload/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      tst.success("PM upload successful");
    } catch (error) {
      tst.error(error?.response?.data?.message);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    {
      label: "State",
      name: "state_id",
      type: "select",
      options: states.map((state) => ({
        value: state.id,
        label: state.name,
      })),
      required: true,
    },
    {
      label: "District",
      name: "dist_id",
      type: "select",
      options: districts.map((district) => ({
        value: district.id,
        label: district.name,
      })),
      required: true,
    },
    {
      label: "Block",
      name: "block_id",
      type: "select",
      options: blocks.map((block) => ({
        value: block.id,
        label: block.name,
      })),
      required: true,
    },
    {
      label: "GP",
      name: "gp_id",
      type: "select",
      options: gps.map((gp) => ({
        value: gp.id,
        label: gp.name,
      })),
      required: true,
    },
  ];

  const statusOptions = [
    { value: "PR", label: "Present" },
    { value: "H", label: "Holiday" },
    { value: "PH", label: "Public Holiday" },
    { value: "L", label: "Leave" },
    { value: "T", label: "Tour" },
  ];

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>PM Entry Form</AdminHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {fields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              disabled={pending}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              onFileChange={handleFileChange}
            />
          ))}
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
            name="pmStatus"
            type="select"
            required
            options={statusOptions}
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
            // disabled={!isSubmissionAllowed || pending}
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

export default PmUploadForm;
