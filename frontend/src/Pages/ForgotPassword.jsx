import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { showAlert } from "@/utils/showAlert";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { login } = useAuthContext();
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const { data } = await API.post("/api/v1/auth/reset-password", formData);
      showAlert("Please check your email", "success");
    } catch (error) {
      tst.error(error);
      console.error("Login failed:", error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-4 md:px-16 ">
      <h1 className="text-2xl font-bold mb-8 text-center">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <Button
          pending={pending}
          type="submit"
          className="bg-primary w-full text-white px-4 py-2 mt-4 rounded-md"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
