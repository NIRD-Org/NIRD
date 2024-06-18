import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import { useState } from "react";
import AdminHeader from "../AdminHeader";

function AmUploadForm() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    state: "",
    district_id: "",
    taluk_id: "",
    gp_id: "",
    date: "",
    am_upload_file: null,
    remarks: "",
    status: "",
  });

  const [pending, setPending] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    setFormData(prevData => ({
      ...prevData,
      am_upload_file: e.target.files[0],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }
      await API.post("/api/v1/attendance/am_upload", formDataToSubmit);
      tst.success("AM upload successful");
    } catch (error) {
      tst.error(error);
      console.error("AM upload failed:", error.message);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    { name: "state", label: "State", required: true },
    { name: "district_id", label: "District ID", required: true },
    { name: "taluk_id", label: "Taluk ID", required: true },
    { name: "gp_id", label: "GP ID", required: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "remarks", label: "Remarks" },
    { name: "status", label: "Status", required: true },
  ];

  return (
    <div className="container mx-auto p-4">
      {<AdminHeader>AM Entry Form</AdminHeader>}
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {fields.map((field, index) => (
            <div key={index}>
              <Label className="mb-2 inline-block">{field.label}</Label>
              {field.required && <span className="text-red-500 ml-1">*</span>}
              <Input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ))}
          <div>
            <Label className="mb-2 inline-block">AM Upload File</Label>
            <Input type="file" name="am_upload_file" onChange={handleFileChange} required />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-10">
          <Button type="submit" disabled={pending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AmUploadForm;