import React from "react";

const ContactUsPage = () => {
  return (
    <div className="p-6 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-[#004B86] text-[3rem] font-extrabold leading-tight">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-4 text-lg font-light">
          We're here to help! Reach out to us for more information about our project for creating 250 Model GP Clusters.
        </p>
      </div>

      {/* Contact Details and Map Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <h2 className="text-[#004B86] text-2xl font-semibold mb-6">Our Office</h2>
          <p className="text-gray-700 text-md mb-4">
            <strong>Project for Creating 250 Model GP Clusters</strong>
          </p>
          <p className="text-gray-700 text-md mb-4">
            <strong>Address:</strong> E1 Building, beside CPR, NIRDPR, Hyderabad
          </p>
          <p className="text-gray-700 text-md mb-4">
            <strong>Phone:</strong> +91 123-456-7890
          </p>
          <p className="text-gray-700 text-md mb-4">
            <strong>Email:</strong> contact@modelgpclusters.org
          </p>
        </div>

        {/* Map Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <h3 className="text-[#004B86] text-xl font-semibold text-center mb-6">Find Us on the Map</h3>
          <div className="flex justify-center">
            {/* Embedded Google Map */}
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.0848222467265!2d78.401608297563!3d17.31367925148657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb94d24407391b%3A0xb38de9a96a8f4f5d!2sNational%20Institute%20of%20Rural%20Development%20and%20Panchayati%20Raj%20(NIRDPR)!5e0!3m2!1sen!2sin!4v1613073348182!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  title="NIRDPR Map Location"
/>

          </div>
        </div>

      </div>

      {/* Footer Section */}
      <div className="text-center mt-12">
        <p className="text-gray-700 text-md font-light">
          © 2024 Project for Creating 250 Model GP Clusters. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default ContactUsPage;
