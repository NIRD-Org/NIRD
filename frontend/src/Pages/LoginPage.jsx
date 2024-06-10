import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      await API.post("/api/v1/auth/login", formData);
      tst.success("User login successful");
    } catch (error) {
      tst.error(error);
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-16 ">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
        <Link to="/register" className="block ">
          <p className="under text-blue-800 text-sm">Don't have an account? Sign up </p>
        </Link>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
