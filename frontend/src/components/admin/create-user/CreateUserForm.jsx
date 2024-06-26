import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { tst } from "@/lib/utils";

function CreateUserForm({ update }) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [pending, setPending] = useState(false);
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


  useEffect(() => {
    if (update) {
      const fetchUser = async () => {
        try {
          const { data } = await API.get(`/api/v1/users/${id}`);
          setFormData(data.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [update, id]);

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
      if (update) {
        await API.put(`/api/v1/users/${id}`, formData);
        tst.success("User updated successfully");
      } else {
        await API.post("/api/v1/auth/register", formData);
        tst.success("User created successfully");
      }
    } catch (error) {
      tst.error(error);
      console.error("Form submission failed:", error.message);
    } finally {
      setPending(false);
    }
  };

  function getRoleOptions(userRole) {
    if (userRole == 1) {
      return [
        { value: 1, label: "PMU Admin" },
        { value: 2, label: "SPC Admin" },
        { value: 3, label: "Young Fellow" },
      ];
    } else {
      return [{ value: 3, label: "Young Fellow" }];
    }
  }

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
    /*  {
    name: "designation",
    label: "Designation",
    options: [
      { value: "designation1", label: "Designation 1" },
      { value: "designation2", label: "Designation 2" },
    ],
    type: "select",
    required: true,
  }, */
    { name: "mobile", label: "Mobile Number", required: true },
    { name: "email", label: "Email ID", required: true },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "efDateFrom",
      label: "Date of Joining",
      type: "date",
      required: true,
    },
    { name: "aadharNo", label: "Aadhar Number" },
    { name: "officeContactNo", label: "Work Phone Number", required: true },
    {
      name: "role",
      label: "Designation",
      options: getRoleOptions(user.role),
      type: "select",
      required: true,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <AdminHeader>{update ? "Update User" : "Create User"}</AdminHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {fields.map((field, index) => (
            <div key={index}>
              <Label className="mb-2 inline-block">{field.label}</Label>
              {field.required && <span className="text-red-500 ml-1">*</span>}
              {field.type === "select" && (
                <select
                  name={field.name}
                  id=""
                  className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "date" && (
                <Input
                  type="date"
                  value={
                    formData[field.name]
                      ? formData[field.name].substring(0, 10)
                      : ""
                  }
                  name={field.name}
                  onChange={handleChange}
                />
              )}

              {field.type !== "select" && field.type !== "date" && (
                <Input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-10 mt-10">
          <Button type="submit" pending={pending}>
            {update ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateUserForm;
