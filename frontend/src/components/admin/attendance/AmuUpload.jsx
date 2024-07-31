import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import FormField from "@/components/ui/formfield";
import { useYfLocation } from "@/components/hooks/useYfLocation";

function AmUploadForm() {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    am_upload_file: null,
    date: "",
    remarks: "",
    status: "",
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
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      await API.post("/api/v1/am-upload/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      tst.success("AM upload successful");
    } catch (error) {
      console.error(error);
      tst.error(error);
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

    {
      label: "Date",
      name: "date",
      type: "date",
      required: true,
    },
    {
      label: "Remarks",
      name: "remarks",
      type: "text",
    },
    {
      label: "Status",
      name: "status",
      type: "text",
      required: true,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>AM Entry Form</AdminHeader>
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
            <Label className="mb-2 inline-block">AM Upload File</Label>
            <Input
              type="file"
              name="am_upload_file"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-10">
          <Button type="submit" pending={pending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AmUploadForm;
