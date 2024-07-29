import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import API from "@/utils/API";
import { useAuthContext } from "@/context/AuthContext";

function SrConsultantProfile() {
  const { user } = useAuthContext();
  const [profileData, setProfileData] = useState({
    fullName: "",
    gender: "",
    email: "",
    mobile: "",
    qualification: "",
    dateOfJoining: "",
    deployedState: "",
    areaOfExpertise: "",
    professionalPhotograph: null,
  });

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await API.get(`/api/v1/users/${user.id}`);
        const userData = response.data.data.user;
        userData.state = response.data.data.state_name;
        console.log(userData);
        setProfileData((prevData) => ({
          ...prevData,
          fullName: userData.name || "",
          gender: userData.gender || "",
          email: userData.email || "",
          mobile: userData.mobile || "",
          qualification: userData.qualification || "",
          dateOfJoining: userData.dateOfJoining || "",
          deployedState: userData.state || "",
          areaOfExpertise: userData.areaOfExpertise || "",
        }));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1048576 && file.type === "image/jpeg") {
      setProfileData((prevData) => ({
        ...prevData,
        professionalPhotograph: file,
      }));
    } else {
      alert("Please upload a JPEG image not exceeding 1 MB.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const formData = new FormData();
    formData.append("fullName", profileData.fullName);
    formData.append("gender", profileData.gender);
    formData.append("email", profileData.email);
    formData.append("mobile", profileData.mobile);
    formData.append("qualification", profileData.qualification);
    formData.append("dateOfJoining", profileData.dateOfJoining);
    formData.append("deployedState", profileData.deployedState);
    formData.append("areaOfExpertise", profileData.areaOfExpertise);
    if (profileData.professionalPhotograph) {
      formData.append(
        "professionalPhotograph",
        profileData.professionalPhotograph
      );
    }

    try {
      const response = await API.post("/api/v1/users/update-profile", formData);
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          USER PROFILE
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Full Name*</Label>
              <Input
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender*</Label>
              <select
                id="gender"
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email">Email ID*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile No.*</Label>
              <Input
                id="mobile"
                name="mobile"
                value={profileData.mobile}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="qualification">Qualification*</Label>
              <Input
                id="qualification"
                name="qualification"
                value={profileData.qualification}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfJoining">Date of Joining*</Label>
              <Input
                id="dateOfJoining"
                name="dateOfJoining"
                type="date"
                value={profileData.dateOfJoining}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="deployedState">Deployed State*</Label>
              <Input
                id="deployedState"
                name="deployedState"
                value={profileData.deployedState}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="areaOfExpertise">Area of Expertise*</Label>
              <Textarea
                id="areaOfExpertise"
                name="areaOfExpertise"
                value={profileData.areaOfExpertise}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="professionalPhotograph">
              Upload Latest Professional Photograph (JPEG, max 1 MB)
            </Label>
            <Input
              id="professionalPhotograph"
              name="professionalPhotograph"
              type="file"
              accept="image/jpeg"
              onChange={handleFileChange}
              className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
              required
            />
            <small className="text-red-500">
              Please upload a JPEG image not exceeding 1 MB.
            </small>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="px-4 py-2 text-sm">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SrConsultantProfile;
