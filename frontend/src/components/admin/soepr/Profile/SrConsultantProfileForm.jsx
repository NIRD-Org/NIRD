import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import API from "@/utils/API";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import StateFilter from "../../filter/StateFilter";
import { showAlert } from "@/utils/showAlert";

function SrConsultantProfile() {
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const state = searchParams.get("state_id");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    qualifications: "",
    dojNIRDPR: "",
    areaOfExpertise: "",
    areaOfInterest: "",
    photo: "",
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await API.get(`/api/v1/users/${user.id}`);
        const userData = response.data.data.user;
        userData.state = response.data.data.state_name;
        setSearchParams({ state_id: userData.state_id });
        setProfileData((prevData) => ({
          ...prevData,
          name: userData.name || "",
          gender: userData.gender || "",
          dateOfBirth: userData.dateOfBirth || "",
          email: userData.email || "",
          mobile: userData.mobile || "",
          qualifications: userData.qualifications || "",
          dojNIRDPR: userData.dojNIRDPR || "",
          areaOfExpertise: userData.areaOfExpertise || "",
          areaOfInterest: userData.areaOfInterest || "",
          photo: userData.photo || "",
        }));
        setPhotoPreview(userData.photo ? userData.photo : "");
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
    if (file && file.size <= 1048576) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image not exceeding 1 MB.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Prepare data for submission
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("gender", profileData.gender);
    formData.append("dateOfBirth", profileData.dateOfBirth);
    formData.append("email", profileData.email);
    formData.append("mobile", profileData.mobile);
    formData.append("qualifications", profileData.qualifications);
    formData.append("dojNIRDPR", profileData.dojNIRDPR);
    formData.append("state_id", state);
    formData.append("areaOfExpertise", profileData.areaOfExpertise);
    formData.append("areaOfInterest", profileData.areaOfInterest);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const { data } = await API.put(`/api/v1/users/${user.id}`, formData);
      console.log("Profile updated successfully:");
      if (data.status === "success") {
        showAlert("Profile updated successfully");
        navigate("/admin/soepr/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          UPDATE PROFILE
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
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
              <Label htmlFor="dateOfBirth">Date of Birth*</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={profileData.dateOfBirth?.split("T")[0]}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="dojNIRDPR">Date of Joining*</Label>
              <Input
                id="dojNIRDPR"
                name="dojNIRDPR"
                type="date"
                value={profileData.dojNIRDPR}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
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
              <Label htmlFor="qualifications">Qualification*</Label>
              <Input
                id="qualifications"
                name="qualifications"
                value={profileData.qualifications}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                required
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="srlm_state">Deployed State*</Label>
              <StateFilter className={"!w-full"} type={"soepr"} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <Label htmlFor="areaOfInterest">
                Area of Interest(Areas where you want to work on)
              </Label>
              <Textarea
                id="areaOfInterest"
                name="areaOfInterest"
                value={profileData.areaOfInterest}
                onChange={handleChange}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="photo">
              Upload Latest Professional Photograph (JPEG, max 1 MB)
            </Label>
            <input
              id="photo"
              type="file"
              accept="image/jpeg"
              onChange={handleFileChange}
              className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Profile Preview"
                className="mt-2 h-24 w-24 object-cover rounded-full"
              />
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SrConsultantProfile;
