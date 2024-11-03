import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { showAlert } from "@/utils/showAlert";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login, isAuthenticated } = useAuthContext();
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

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
      const response = await API.post("/api/v1/auth/login", formData);
      showAlert("User login successful", "success");
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
      }
      await login();
      navigate("/admin/");
    } catch (error) {
      tst.error(error);
      console.error("Login failed:", error.message);
    } finally {
      setPending(false);
    }
  };

  // if(isAuthenticated)  navigate("/admin");

  return (
    <div className="max-w-xl mx-auto py-20 px-4 md:px-16 ">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Login to your account
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="username" className="mt-2">
            Username
          </Label>
          <Input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            id="username"
            placeholder="Enter Username"
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

export default LoginPage;
