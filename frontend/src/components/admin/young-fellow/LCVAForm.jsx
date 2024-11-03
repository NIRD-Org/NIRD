import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { tst } from "@/lib/utils";
import useThemes from "@/components/hooks/location/useThemes";
import FormField from "@/components/ui/formfield";
import { useYfLocation } from "@/components/hooks/useYfLocation";
import { showAlert } from "@/utils/showAlert";

const LCVAForm = ({ update = false }) => {
  const [pending, setPending] = useState(false);
  const [videoSource, setVideoSource] = useState("file");
  const [formData, setFormData] = useState({
    theme_id: "",
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    financial_year: "",
    activityTitle: "",
    images: [null],
    document: null,
    video: null,
  });

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
  const { themes } = useThemes();

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

  const handleFilesChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleFileChange = (e, index) => {
    const { files } = e.target;
    const updatedImages = [...formData.images];

    updatedImages[index] = files[0];

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleAddImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, null],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image, index) => {
            if (image) {
              formDataToSend.append(`images[${index}]`, image);
            }
          });
        } else if (key === "video") {
          if (videoSource === "file") {
            formDataToSend.append("video", value);
          }
        } else {
          formDataToSend.append(key, value);
        }
      });

      // if (videoSource === "url") {
      //   formDataToSend.append("video_url", formData.videoURL);
      // }

      if (update) {
        await API.put(`/api/v1/lcva/${formData.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/api/v1/lcva/create", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      showAlert("Data submitted successfully", "success");
    } catch (error) {
      tst.error("Failed to submit form");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    {
      label: "Theme Name",
      name: "theme_id",
      type: "select",
      options: themes?.map((theme) => ({
        value: theme.id,
        label: theme.theme_name,
      })),
      required: true,
    },
    {
      label: "State",
      name: "state_id",
      type: "select",
      options: states?.map((state) => ({
        value: state.id,
        label: state.name,
      })),
      required: true,
    },
    {
      label: "District",
      name: "dist_id",
      type: "select",
      options: districts?.map((district) => ({
        value: district.id,
        label: district.name,
      })),
      required: true,
    },
    {
      label: "Block",
      name: "block_id",
      type: "select",
      options: blocks?.map((block) => ({
        value: block.id,
        label: block.name,
      })),
      required: true,
    },
    {
      label: "GP",
      name: "gp_id",
      type: "select",
      options: gps?.map((gp) => ({
        value: gp.id,
        label: gp.name,
      })),
      required: true,
    },
    {
      name: "financial_year",
      label: "Financial Year",
      type: "select",
      options: Array.from({ length: 30 }, (_, i) => {
        const startYear = 2021 + i;
        const endYear = startYear + 1;
        return {
          value: `FY${startYear}-${endYear}`,
          label: `FY${startYear}-${endYear}`,
        };
      }),
      required: true,
    },
    {
      label: "Activity Title",
      name: "activityTitle",
      type: "text",
      required: true,
    },
    {
      label: "Upload Document",
      name: "document",
      type: "file",
      accept: "application/pdf,.pdf",
      required: !update,
    },
    // {
    //   label: "Upload Video",
    //   name: "video",
    //   type: "file",
    //   required: !update,
    // },
  ];

  if (!themes) return;

  return (
    <div className="p-2 md:p-6">
      <AdminHeader>{update ? "Edit LCVA" : "LCVA Entry Form"}</AdminHeader>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            disabled={pending}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            onFileChange={handleFilesChange}
          />
        ))}

        {/* Image Upload Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          {formData.images.map((_, idx) => (
            <FormField
              key={`image-${idx}`}
              label={`Upload Image ${idx + 1}`}
              name="images"
              type="file"
              accept="image/*"
              required={idx === 0} // Only the first image is required
              disabled={pending}
              onFileChange={(e) => handleFileChange(e, idx)}
            />
          ))}
          <Button type="button" onClick={handleAddImageField} className="mt-2">
            Add Another Image
          </Button>
        </div>

        {/* Video Upload Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-10">
            <label>
              <input
                type="radio"
                className="w-6"
                value="file"
                checked={videoSource === "file"}
                onChange={() => setVideoSource("file")}
              />
              Upload Video File
            </label>
            <label>
              <input
                type="radio"
                className="w-6"
                value="url"
                checked={videoSource === "url"}
                onChange={() => setVideoSource("url")}
              />
              Add Video URL
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
            {videoSource === "file" ? (
              <FormField
                label="Upload Video"
                name="video"
                type="file"
                accept="video/*"
                required={!update}
                disabled={pending}
                onFileChange={handleFilesChange}
              />
            ) : (
              <FormField
                label="Video URL"
                name="videoURL"
                type="text"
                value={formData.videoURL}
                onChange={handleInputChange}
                disabled={pending}
                required={!update}
              />
            )}
          </div>
        </div>

        <Button pending={pending} type="submit" className="px-20 self-end">
          {update ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default LCVAForm;
