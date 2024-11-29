import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white py-4 shadow-md">
  <div className="container mx-auto flex flex-wrap justify-center items-center space-x-4 sm:space-x-8">
    
    <img
      src="logo/nirdpr.png"
      alt="NIRDPR"
      className="h-10 sm:h-12 w-auto object-contain"
    />
    <img
      src="logo/ashoka.png"
      alt="Ashoka"
      className="h-20 sm:h-15 w-auto object-contain"
    />
    <img
      src="logo/moprlogo.png"
      alt="MoPR"
      className="h-10 sm:h-12 w-auto object-contain"
    />
  </div>
</header>

      {/* Blue Strip */}
      <div className="bg-[#002855] py-4">
        <h1 className="text-white text-center text-2xl md:text-3xl font-semibold">
          Empowering Panchayats for Holistic Development
        </h1>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Intro Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to Our Initiatives
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Aiming to build MODEL Gram Panchayats and advance EXCELLENCE in Rural Governance.
          </p>
        </section>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative overflow-hidden group">
              <img
                src="logo/pgphome.png"
                alt="Project for Model GP Clusters"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                Project for Creating 250 Model GP Clusters
              </h3>
              <p className="text-gray-600 mt-2">
              Discover our mission to create 250 model Gram Panchayat clusters, driving comprehensive growth and transformative development.
              </p>
              <Link
                to="/pgp"
                className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-medium text-sm rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative overflow-hidden group">
              <img
                src="logo/soeprhome.png"
                alt="School of Excellence Panchayati Raj"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                School of Excellence Panchayati Raj
              </h3>
              <p className="text-gray-600 mt-2">
                Discover our platform to train and equip Panchayati Raj Institutions with modern governance tools.
              </p>
              <Link
                to="/soepr"
                className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-medium text-sm rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Explore
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
