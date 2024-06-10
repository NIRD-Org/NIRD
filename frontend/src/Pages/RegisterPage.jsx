import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import API from "@/utils/API";
import { tst } from "@/lib/utils";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    full_name: "",
    contact_name: "",
    department: "",
    designation: "",
    mobile: "",
    email: "",
    DOB: "",
    Ef_date_from: "",
    AadharNo: "",
    office_contact_no: "",
    hr_profile_id: "",
    esop_certified: false,
    esop_no: "",
    role_type: "",
    ctsaname: "",
    srlm_state: "",
    count: 0,
    outer_checkbox: 0,
    status: "",
    password:""
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/api/v1/auth/register",formData);
      tst.success("User signin sucess");
    } catch (error) {
      tst.error(error);
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="container mx-auto py-10 px-16">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-10">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className="mt-2">
              Name
            </Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              placeholder="Enter Name"
              className="col-span-3"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="full_name" className="mt-2">
              Full Name
            </Label>
            <Input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              id="full_name"
              placeholder="Enter Full Name"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="contact_name" className="mt-2">
              Contact Name
            </Label>
            <Input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              id="contact_name"
              placeholder="Enter Contact Name"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="department" className="mt-2">
              Department
            </Label>
            <Input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              id="department"
              placeholder="Enter Department"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="designation" className="mt-2">
              Designation
            </Label>
            <Input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              id="designation"
              placeholder="Enter Designation"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="mobile" className="mt-2">
              Mobile
            </Label>
            <Input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              id="mobile"
              placeholder="Enter Mobile"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="mt-2">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter Email"
              className="col-span-3"
              required
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="DOB" className=" mt-2">
              Date of Birth
            </Label>
            <Input
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              id="DOB"
              placeholder="Enter Date of Birth"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="Ef_date_from" className=" mt-2">
              Effective Date From
            </Label>
            <Input
              type="date"
              name="Ef_date_from"
              value={formData.Ef_date_from}
              onChange={handleChange}
              id="Ef_date_from"
              placeholder="Enter Effective Date From"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="AadharNo" className=" mt-2">
              Aadhar Number
            </Label>
            <Input
              type="text"
              name="AadharNo"
              value={formData.AadharNo}
              onChange={handleChange}
              id="AadharNo"
              placeholder="Enter Aadhar Number"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="office_contact_no" className=" mt-2">
              Office Contact Number
            </Label>
            <Input
              type="text"
              name="office_contact_no"
              value={formData.office_contact_no}
              onChange={handleChange}
              id="office_contact_no"
              placeholder="Enter Office Contact Number"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="hr_profile_id" className=" mt-2">
              HR Profile ID
            </Label>
            <Input
              type="text"
              name="hr_profile_id"
              value={formData.hr_profile_id}
              onChange={handleChange}
              id="hr_profile_id"
              placeholder="Enter HR Profile ID"
            />
          </div>
          <div className="flex items-center gap-4 pt-10 ">
            <Checkbox
              name="esop_certified"
              checked={formData.esop_certified}
              onCheckedChange={() =>
                setFormData(prev => ({ ...prev, esop_certified: !esop_certified }))
              }
              className="mt-2"
              id="esop_certified"
            />
            <Label htmlFor="esop_certified" className=" mt-2">
              ESOP Certified
            </Label>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="esop_no" className=" mt-2">
              ESOP Number
            </Label>
            <Input
              type="text"
              name="esop_no"
              value={formData.esop_no}
              onChange={handleChange}
              id="esop_no"
              placeholder="Enter ESOP Number"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="role_type" className=" mt-2">
              Role Type
            </Label>
            <Input
              type="text"
              name="role_type"
              value={formData.role_type}
              onChange={handleChange}
              id="role_type"
              placeholder="Enter Role Type"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="ctsaname" className=" mt-2">
              CTSA Name
            </Label>
            <Input
              type="text"
              name="ctsaname"
              value={formData.ctsaname}
              onChange={handleChange}
              id="ctsaname"
              placeholder="Enter CTSA Name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="srlm_state" className=" mt-2">
              SRLM State
            </Label>
            <Input
              type="text"
              name="srlm_state"
              value={formData.srlm_state}
              onChange={handleChange}
              id="srlm_state"
              placeholder="Enter SRLM State"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="count" className=" mt-2">
              Count
            </Label>
            <Input
              type="number"
              name="count"
              value={formData.count}
              onChange={handleChange}
              id="count"
              placeholder="Enter Count"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="outer_checkbox" className=" mt-2">
              Outer Checkbox
            </Label>
            <Input
              type="text"
              name="outer_checkbox"
              checked={formData.outer_checkbox}
              onChange={handleChange}
              id="outer_checkbox"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="status" className=" mt-2">
              Status
            </Label>
            <Input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              id="status"
              placeholder="Enter Status"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="password" className=" mt-2">
              Password
            </Label>
            <Input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter Password"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
