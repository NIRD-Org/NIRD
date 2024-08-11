import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { tst } from "@/lib/utils";
import FormField from "@/components/ui/formfield";

function CreateUserForm({ update }) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({});

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
    console.log(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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
        { value: 4, label: "Consultant" },
        { value: 5, label: "Sr. Consultant" },
      ];
    } else {
      return [{ value: 3, label: "Young Fellow" }];
    }
  }

  const fields = [
    { name: "username", label: "Username", required: true },
    {
      name: "employee_id",
      label: "Employee Id",
      required: true,
      type: "number",
    },
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
    { name: "mobile", label: "Mobile Number", required: true },
    { name: "email", label: "Email ID", required: true },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: !update,
    },
    {
      name: "dojNIRDPR",
      label: "Date of Joining",
      type: "date",
      required: !update,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {fields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              disabled={pending}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
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
