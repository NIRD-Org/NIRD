import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "@/utils/API";
import { useAuthContext } from "@/context/AuthContext";

function ViewProfile() {
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
    professionalPhotograph: "",
    designation: "", // New field for designation
  });

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await API.get(`/api/v1/users/${user.id}`);
        const userData = response.data.data.user;
        userData.state = response.data.data.state_name;
        console.log(userData);
        setProfileData({
          fullName: userData.name || "",
          gender: userData.gender || "",
          email: userData.email || "",
          mobile: userData.mobile || "",
          qualification: userData.qualification || "",
          dateOfJoining: userData.dateOfJoining || "",
          deployedState: userData.state || "",
          areaOfExpertise: userData.areaOfExpertise || "",
          professionalPhotograph: userData.professionalPhotograph || "",
          designation: userData.designation || "", // Set designation
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user.id]);

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          VIEW PROFILE
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p>
                <strong>Full Name:</strong> {profileData.fullName}
              </p>
            </div>
            <div>
              <p>
                <strong>Gender:</strong> {profileData.gender}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p>
                <strong>Email ID:</strong> {profileData.email}
              </p>
            </div>
            <div>
              <p>
                <strong>Mobile No.:</strong> {profileData.mobile}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p>
                <strong>Qualification:</strong> {profileData.qualification}
              </p>
            </div>
            <div>
              <p>
                <strong>Date of Joining:</strong> {profileData.dateOfJoining}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p>
                <strong>Deployed State:</strong> {profileData.deployedState}
              </p>
            </div>
            <div>
              <p>
                <strong>Area of Expertise:</strong>{" "}
                {profileData.areaOfExpertise}
              </p>
            </div>
          </div>

          <div>
            <p>
              <strong>Designation:</strong> {profileData.designation}{" "}
              {/* Display designation */}
            </p>
          </div>

          <div>
            <p>
              <strong>Professional Photograph:</strong>
            </p>
            {profileData.professionalPhotograph ? (
              <img
                src={profileData.professionalPhotograph}
                alt="Professional"
                className="max-w-xs rounded-md border"
              />
            ) : (
              <p>No photograph uploaded.</p>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Link
              to="/admin/soepr/editprofile"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
