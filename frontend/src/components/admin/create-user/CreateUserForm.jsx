import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import { useState } from "react";

function CreateUserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    department: "",
    designation: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
    efDateFrom: "",
    aadharNo: "",
    officeContactNo: "",
    role: "",
  });

  const [pending, setPending] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      await API.post("/api/v1/auth/register", formData);
      tst.success("User created  sucessfully");
    } catch (error) {
      tst.error(error);
      console.error("Registration failed:", error.message);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    { name: "username", label: "Username", required: true },
    { name: "name", label: "Name", required: true },
    {
      name: "department",
      label: "Department",
      options: [
        { value: "dept1", label: "Department 1" },
        { value: "dept2", label: "Department 2" },
      ],
      required: true,
    },
    {
      name: "designation",
      label: "Designation",
      options: [
        { value: "designation1", label: "Designation 1" },
        { value: "designation2", label: "Designation 2" },
      ],
      type: "select",
      required: true,
    },
    { name: "mobile", label: "Mobile Number", required: true },
    { name: "email", label: "Email ID", required: true },
    { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
    { name: "efDateFrom", label: "Date of Joining", type: "date", required: true },
    { name: "aadharNo", label: "Aadhar Number" },
    { name: "officeContactNo", label: "Work Phone Number", required: true },
    {
      name: "role",
      label: "Role",
      options: [
        { value: 2, label: "Admin" },
        { value: 3, label: "Young Fellow" },
        { value: 1, label: "Super Admin" },
      ],
      type: "select",
      required: true,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {fields.map((field, index) => (
            <div key={index}>
              <Label className="mb-2 inline-block">{field.label}</Label>
              {field.required && <span className="text-red-500 ml-1">*</span>}
              {field.type === "select" && (
                <select name={field.name} id="" className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border" value={formData[field.name] || ""} onChange={handleChange}>
                  <option value="">Select {field.label}</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              {field.type !== "select" && <Input type={field.type || "text"} name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required} />}
            </div>
          ))}
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

export default CreateUserForm;
