import { useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaChalkboardTeacher,
  FaHandshake,
} from "react-icons/fa";

const HumanResourcesPage = () => {
  const [activeRole, setActiveRole] = useState("");

  const toggleRoleDetails = (role) => {
    setActiveRole(activeRole === role ? "" : role);
  };

  const getStatusColor = (status) => {
    if (status === "Active") return "text-green-500"; // Active in green
    return "text-red-500"; // Vacant in red
  };

  return (
    <div className="p-5 sm:px-10 md:px-20 lg:px-32 md:py-10 bg-gray-50">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-[#004B86] text-[3rem] font-extrabold leading-tight">
          Human Resources for the Project
        </h1>
        <p className="text-[#4a90e2] text-lg font-medium mt-2">
          Key Staff and Responsibilities in the "Creating 250 Model GP Clusters" Project
        </p>
      </div>

      {/* HR Structure Overview (Plain Text) */}
      <div className="mb-10">
        <p className="text-justify text-md leading-relaxed text-gray-700">
          The project for "Creating 250 Model GP Clusters" has a structured Human
          Resources (HR) team, which includes Young Fellows, State Programme
          Coordinators (SPCs), and Project Monitoring Unit (PMU). The HR team plays a crucial role in
          implementing the project by providing mentoring, capacity-building, and
          technical guidance across the Gram Panchayats (GPs). The HR structure is designed
          to ensure smooth operations and high-level support to GPs.
        </p>
      </div>

      {/* HR Data Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Young Fellows */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-all hover:scale-105 hover:shadow-2xl">
          <h3 className="text-[#004B86] text-xl font-semibold mb-4">Young Fellows</h3>
          <div className="mb-4">
            <p>
              <strong>Role Description:</strong> The Young Fellows (YFs) are selected professionals who serve as mentors and provide technical guidance to the Gram Panchayats (GPs). They assist in the preparation and implementation of high-quality Gram Panchayat Development Plans (GPDPs) aligned with the SDGs.
            </p>
          </div>
          <button
            className="bg-[#004B86] text-white py-2 px-4 rounded-md hover:bg-[#005f8c] transition-all mt-4"
            onClick={() => toggleRoleDetails("youngFellows")}
          >
            View Details
          </button>
          {activeRole === "youngFellows" && (
            <div className="mt-4">
              <p><strong>Total Members:</strong> 157</p>
              <p><strong className="text-green-500">Active Members:</strong> 118</p>
              <p><strong className="text-red-500">Vacant Positions:</strong> 39</p>
            </div>
          )}
        </div>

        {/* State Programme Coordinators */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-all hover:scale-105 hover:shadow-2xl">
          <h3 className="text-[#004B86] text-xl font-semibold mb-4">State Programme Coordinators (SPCs)</h3>
          <div className="mb-4">
            <p>
              <strong>Role Description:</strong> State Programme Coordinators (SPCs) oversee the project at the state level, coordinating with Young Fellows, departments, and local stakeholders to ensure the successful implementation of the project.
            </p>
          </div>
          <button
            className="bg-[#004B86] text-white py-2 px-4 rounded-md hover:bg-[#005f8c] transition-all mt-4"
            onClick={() => toggleRoleDetails("spcs")}
          >
            View Details
          </button>
          {activeRole === "spcs" && (
            <div className="mt-4">
              <p><strong>Total Members:</strong> 12</p>
              <p><strong className="text-green-500">Active Members:</strong> 8</p>
              <p><strong className="text-red-500">Vacant Positions:</strong> 4</p>
            </div>
          )}
        </div>

        {/* Project Staff */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-all hover:scale-105 hover:shadow-2xl">
          <h3 className="text-[#004B86] text-xl font-semibold mb-4">Project Monitoring Unit (PMU)</h3>
          <div className="mb-4">
            <p>
              <strong>Role Description:</strong> Project Monitoring Unit staff provides the necessary administrative and operational support for the project, monitoring the project progress ,ensuring smooth logistics and coordination across the project areas.
            </p>
          </div>
          <button
            className="bg-[#004B86] text-white py-2 px-4 rounded-md hover:bg-[#005f8c] transition-all mt-4"
            onClick={() => toggleRoleDetails("projectStaff")}
          >
            View Details
          </button>
          {activeRole === "projectStaff" && (
            <div className="mt-4">
              <p><strong>Total Members:</strong> 17</p>
              <p><strong className="text-green-500">Active Members:</strong> 4</p>
              <p><strong className="text-red-500">Vacant Positions:</strong> 13</p>
            </div>
          )}
        </div>
      </div>
{/* Link to Detailed Achievements Page */}
<div className="text-center mt-10">
        <a
          href="/staff-details"
          className="text-[#004B86] text-lg font-semibold hover:underline"
        >
           LIST OF YOUNG FELLOWS AND SPCS 
        </a>
      </div>
   
    



    </div>
  );
};

export default HumanResourcesPage;
