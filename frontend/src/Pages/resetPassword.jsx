import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    confirmPassword: "",
    password: "",
  });
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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    try {
      setPending(true);
      const { data } = await API.post(
        `/api/v1/auth/change-password/${token}`,
        formData
      );
      tst.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      tst.error(error);
      console.error(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-4 md:px-16 ">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Login to your account
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="password" className="mt-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter Password"
            className="col-span-3"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="confirmPassword" className="mt-2">
            Confirm Password
          </Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            placeholder="Enter Password again"
            className="col-span-3"
            required
          />
        </div>
        <div className="flex justify-end">
          <Link to={"/forgot-password"} className="text-primary">
            Forgot password?
          </Link>
        </div>
        <Button
          pending={pending}
          type="submit"
          className="bg-primary w-full text-white px-4 py-2 mt-4 rounded-md"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
