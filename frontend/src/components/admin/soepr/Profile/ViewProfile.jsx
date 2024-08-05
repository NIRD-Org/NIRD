import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "@/utils/API";
import { useAuthContext } from "@/context/AuthContext";

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "No Data Available";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function ViewProfile() {
  const { user } = useAuthContext();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await API.get(`/api/v1/users/${user.id}`);
        const userData = response.data.data.user;
        userData.state = response.data.data.state_name;
        console.log(userData);
        setProfileData(userData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user.id]);

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl px-10 py-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          SOEPR - EMPLOYEE PROFILE
        </h2>
        <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-2">
          <div className="flex-grow space-y-4 p-6">
            <p>
              <strong>Employee ID:</strong> {profileData.employee_id || "No Data Available"}
            </p>
            <p>
              <strong>Full Name:</strong> {profileData.name}
            </p>
            <p>
              <strong>Designation:</strong> {profileData.designation}
            </p>
            <p>
              <strong>Deployed State:</strong> {profileData.state}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {formatDate(profileData.dateOfBirth)}
            </p>
            <p>
              <strong>Date of Joining:</strong> {formatDate(profileData.dojNIRDPR)}
            </p>
            <p>
              <strong>Gender:</strong> {profileData.gender}
            </p>
            <p>
              <strong>Email ID:</strong> {profileData.email}
            </p>
            <p>
              <strong>Mobile No.:</strong> {profileData.mobile}
            </p>
            <p>
              <strong>Qualification:</strong>{" "}
              {profileData.qualifications || "No Data Available"}
            </p>
          </div>
          <div className="flex-shrink-0 p-6">
            <div className="flex flex-col items-center">
              <br />
              {profileData.photo ? (
                <img
                  src={profileData.photo}
                  alt="Professional"
                  className="w-36 h-48 rounded-md border mb-4"
                />
              ) : (
                <p>No photograph uploaded.</p>
              )}
              <div className="w-full max-w-md">
                <p className="break-words whitespace-normal">
                  <strong>Area of Expertise:</strong>{" "}
                  {profileData.areaOfExpertise || "No Data Available"}
                </p>
                <p className="break-words whitespace-normal">
                  <strong>Area of Interest:</strong>{" "}
                  {profileData.areaOfInterest || "No Data Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Link
            to="/admin/soepr/profile-form"
            className="px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-sky-950"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
