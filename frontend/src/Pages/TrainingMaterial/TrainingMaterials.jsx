import React, { useEffect, useState } from "react";
import API from "@/utils/API";

const TrainingMaterials = () => {
  const [trainingMaterials, setTrainingMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainingMaterials = async () => {
      try {
        const response = await API.get("/api/v1/training-material/all");
        setTrainingMaterials(response.data.data);
      } catch (err) {
        setError("Failed to fetch training materials.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingMaterials();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container min-h-[80vh] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Training Materials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingMaterials &&
          trainingMaterials.length > 0 && trainingMaterials?.map((material) => (
            <div
              key={material._id}
              className="border border-gray-300 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {material.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Created by: {material.createdBy?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Date: {new Date(material.created_at).toLocaleDateString()}
              </p>
              <a
                href={material.file}
                download
                target="_blank"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
              >
                Download File
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrainingMaterials;
