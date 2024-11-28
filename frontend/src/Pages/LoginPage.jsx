import React, { useState, useEffect } from "react";
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
  const [pending, setPending] = useState(false);
  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      showAlert("Please fill in all fields.", "error");
      return;
    }
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
      showAlert("Login failed. Please check your credentials.", "error");
      console.error("Login failed:", error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      {/* Blue Strip */}
      <div className="bg-[#002855] py-4">
        <h1 className="text-white text-center text-2xl font-bold">Welcome Back</h1>
      </div>

      {/* Login Form */}
      <div className="max-w-xl mx-auto py-16 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Login to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="username" className="mt-2">Username</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              id="username"
              placeholder="Enter Username"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="password" className="mt-2">Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="flex justify-end">
            <Link to={"/forgot-password"} className="text-primary">Forgot password?</Link>
          </div>
          <Button
            disabled={pending || !formData.username || !formData.password}
            className={`w-full ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
          >
            {pending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
