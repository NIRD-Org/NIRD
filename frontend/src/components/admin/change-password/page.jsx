import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { showAlert } from "@/utils/showAlert";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/v1/auth/change-password", formData);
      showAlert("Password changed successfully", "success");
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      tst.error(error);
      console.error("Failed to change password:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4 md:px-16 ">
      <h1 className="text-2xl font-bold mb-8 text-center">Change Password</h1>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="oldPassword" className="mt-2">
            Current Password
          </Label>
          <Input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="newPassword" className="mt-2">
            New Password
          </Label>
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit">Change Password</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
