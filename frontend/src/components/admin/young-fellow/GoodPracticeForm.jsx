import React, { useState, useEffect } from "react";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import { tst } from "@/lib/utils";
import useThemes from "@/components/hooks/location/useThemes";
import FormField from "@/components/ui/formfield";
import { useYfLocation } from "@/components/hooks/useYfLocation";
import { showAlert } from "@/utils/showAlert";
import { useParams } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";

const GoodPracticeForm = ({ update = false }) => {
  const [pending, setPending] = useState(false);
  const [videoSource, setVideoSource] = useState("file");
  const { id } = useParams();

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
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await API.get(`/api/v1/good-practice/${id}`);

        setFormData({
          theme_id: data.theme_id || "",
          state_id: data.state_id || "",
          dist_id: data.dist_id || "",
          block_id: data.block_id || "",
          gp_id: data.gp_id || "",
          financial_year: data.financial_year || "",
          activityTitle: data.activityTitle || "",
          images: data.images || [null],
          document: data.document || null,
          video: data.video || null,
          videoURL: data.video || "",
        });

        // console.log(data);

        setVideoSource("url");
      } catch (error) {
        console.log(error);
      }
    };

    if (update) {
      fetchData();
    }
  }, [id, update]); // Added `update` dependency to ensure it runs when updating

  // useEffect(() => {
  //   setFormData((prevData) => ({ ...prevData, dist_id: "" }));
  // }, [formData.state_id]);

  // useEffect(() => {
  //   setFormData((prevData) => ({ ...prevData, block_id: "" }));
  // }, [formData.dist_id]);

  // useEffect(() => {
  //   setFormData((prevData) => ({ ...prevData, gp_id: "" }));
  // }, [formData.block_id]);

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
    const updatedImages = [...formData.images]; // Clone the images array

    updatedImages[index] = files[0]; // Set the specific index to the new file

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

      if (update) {
        await API.put(`/api/v1/good-practice/${id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        setPending(true);
        await API.post("/api/v1/good-practice/create", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      showAlert("Data submitted successfully", "success");
    } catch (error) {
      tst.error("Failed to submit form");
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const handleRemoveImage = (index) => {
    if (formData.images.length <= 1) return;
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
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
  ];

  if (!update) {
    const data = {
      label: "Upload Document",
      name: "document",
      type: "file",
      accept: "application/pdf,.pdf",
      required: !update,
    };
    fields.push(data);
  }

  if (!themes) return;

  return (
    <div className="p-2 md:p-6">
      <AdminHeader>
        {update ? "Edit Good Practice" : "Good Practice Entry Form"}
      </AdminHeader>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {fields?.map((field) => (
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
        {!update ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            {formData?.images?.map((_, idx) => (
              <div className="flex items-center gap-10">
                <FormField
                  key={`image-${idx}`}
                  label={`Upload Image ${idx + 1}`}
                  name="images"
                  type="file"
                  accept="image/*"
                  required={idx === 0}
                  disabled={pending}
                  onFileChange={(e) => handleFileChange(e, idx)}
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="mt-7"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddImageField}
              className="mt-2"
            >
              Add Another Image
            </Button>
          </div>
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="font-semibold mb-2">Image Previews</h3>
            {formData.images.map((image, idx) => (
              <div key={`image-preview-${idx}`} className="mb-4">
                {image && (
                  <div className="mb-2">
                    {typeof image === "string" ? (
                      <img
                        src={image}
                        alt={`Preview ${idx + 1}`}
                        className="w-fit max-h-40 object-contain"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">
                        New image selected for upload
                      </p>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-10">
                  <FormField
                    label={`Replace Image ${idx + 1}`}
                    name={`image-${idx}`}
                    type="file"
                    accept="image/*"
                    disabled={pending}
                    onFileChange={(e) => handleFileChange(e, idx)}
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="mt-7"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddImageField}
              className="mt-2"
            >
              Add Another Image
            </Button>
          </div>
        )}

        {/* Image Preview and Upload Section */}

        {/* Video Upload Section */}
        <div className="col-span-1">
          <div className="flex items-center gap-10">
            {/* <label>
              <input
                className="w-5"
                type="radio"
                value="file"
                checked={videoSource === "file"}
                onChange={() => setVideoSource("file")}
              />
              Upload Video File
            </label> */}
            <label>
              <input
                className="w-6"
                type="radio"
                value="url"
                checked={videoSource === "url"}
                onChange={() => setVideoSource("url")}
              />
              Add Video URL
            </label>
          </div>

          <div className="mt-5">
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

        {update && (
          <div className="col-span-1">
            {/* <h3 className="font-semibold mb-2">Document Preview</h3> */}
            {formData.document && (
              <div className="mb-4">
                {typeof formData.document === "string" ? (
                  <a
                    href={formData.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline flex gap-2 items-center"
                  >
                    <IoDocumentTextOutline className="font-bold text-xl" />{" "}
                    Document
                  </a>
                ) : (
                  <p className="text-sm text-gray-500">
                    New document selected for upload
                  </p>
                )}
              </div>
            )}
            <FormField
              label="Document"
              name="document"
              type="file"
              accept="application/pdf"
              disabled={pending}
              onFileChange={handleFilesChange}
            />
          </div>
        )}
        <div></div>
        <Button pending={pending} type="submit" className="px-20 self-end">
          {update ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default GoodPracticeForm;
