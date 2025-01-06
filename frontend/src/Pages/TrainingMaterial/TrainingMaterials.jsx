import React, { useEffect, useState } from "react";
import API from "@/utils/API";

const TrainingMaterials = () => {
  const [trainingMaterials, setTrainingMaterials] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    const fetchTrainingMaterials = async () => {
      try {
        const response = await API.get("/api/v1/training-material/all");
        const sortedData = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTrainingMaterials(sortedData);
      } catch (err) {
        setError("Failed to fetch training materials.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingMaterials();
  }, []);

  const filteredMaterials = search.length > 0 ? 
    trainingMaterials.filter(material => material.title.toLowerCase().includes(search.toLowerCase())) : 
    trainingMaterials;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const openPreview = (file) => {
    setCurrentFile(file);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setCurrentFile(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-[80vh]"><div className="spinner"></div></div>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--primary-color)' }}>Training Materials</h1>
      <h2 className="text-center mb-4"> Developed by State Level Consultants & Sr.Consultants</h2>

      <div className="mb-6">
        <input
          type="text"
          className="block w-1/3 mx-auto p-2 border border-gray-300 rounded shadow-sm"
          placeholder="Search materials..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div key={material._id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-orange-100 p-4">
              <h2 className="text-xl font-bold text-blue-800">{material.title}</h2>
              <p className="text-sm text-gray-800">Created by: {material.createdBy?.name || "Unknown"}</p>
            </div>
            <div className="px-4 py-2 flex justify-between items-center">
              <p className="text-sm text-gray-600">Date: {new Date(material.created_at).toLocaleDateString()}</p>
              <div className="flex">
                <button onClick={() => openPreview(material.file)} className="text-blue-500 hover:text-blue-600 transition-colors mr-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <a href={material.file} download target="_blank" rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg" style={{ width: '80%', maxWidth: '960px', height: 'auto' }}>
            {currentFile && <iframe src={currentFile} style={{ width: '100%', height: '80vh' }} title="Preview Content"></iframe>}
            <button onClick={closePreview} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingMaterials;

