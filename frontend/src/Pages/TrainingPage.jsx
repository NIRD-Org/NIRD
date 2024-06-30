import GradientLine from "@/components/GradientLine";
import TrainingGallery from "@/components/TrainingGallery";
import API from "@/utils/API";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const TrainingPage = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    setSearchParams({ page: currentPage });
    getTrainingData(currentPage);
  }, [currentPage]);

  const getTrainingGallery = async () => {
    try {
      const { data } = await API.get("api/v1/training/gallery");
      setGallery(data?.data);
    } catch (error) {
      setGallery([]);
      console.log(error.message);
    }
  };

  const getTrainingData = async (page) => {
    try {
      const { data } = await API.get(`/api/v1/training?page=${page}`);
      const trainingList = data?.data?.trainingData;
      setTrainingData(trainingList);
      setTotalPages(data?.data?.pagination.totalPages);
      setSelectedTraining(trainingList?.[0] || null);
    } catch (error) {
      console.log(error.message);
      setTrainingData([]);
      setSelectedTraining(null);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getTrainingGallery();
  }, []);

  return (
    <div className=" bg-white">
      <div className="px-4 py-8 bg-gray-100 md:px-20 md:py-10">
        <h1 className="text-4xl text-center md:text-left md:text-6xl text-primary font-bold">
          Training & Capacity Building
        </h1>
      </div>
      <GradientLine />

      <div className="px-4 py-8 md:px-20 md:py-10 bg-white">
        <h1 className="text-4xl text-primary font-semibold">Overview</h1>
        <p className="text-justify py-2 text-[1rem] md:text-[1.15rem]">
          Young Fellows (YFs), State Programme Coordinators (SPCs), and other
          project staff undergo comprehensive training at NIRDPR, including a
          two-week induction and annual one-week refresher courses.
        </p>
        <p className="text-justify py-2 text-[1rem] md:text-[1.15rem]">
          Additionally, SPCs and YFs receive periodic orientation from SIRDs,
          focusing on state initiatives for Panchayat strengthening and rural
          development. Senior officers from the MoPR regularly address the YFs
          on issues like Localization of SDGs and Panchayat Development Index
          (PDI).
        </p>
        <p className="text-justify py-2 text-[1rem] md:text-[1.15rem]">
          NIRDPR also provides orientation for state and district officers,
          block development officers, elected representatives, and functionaries
          on project objectives, mostly online or in hybrid mode. Weekly or
          fortnightly calls are held to resolve project issues, and extensive
          learning materials and operational guidelines are distributed to
          enhance the training of project GPs.
        </p>
      </div>

      {/* Training Reports */}
      <div className="px-4 bg-gray-100 py-8 md:px-20 md:py-10">
        <h1 className="text-4xl text-primary pb-10 font-bold">
          Training Reports
        </h1>

        <h1 className="text-sky-950 px-5 text-2xl font-bold">
          Title of the Training
        </h1>
        <div className="flex flex-col md:flex-row py-1">
          <div className="w-full md:w-2/6 border border-gray-400">
            <div className="flex gap-0 flex-col items-center h-full justify-between">
              {trainingData.map((data) => (
                <p
                  key={data._id}
                  onClick={() => setSelectedTraining(data)}
                  className={`text-lg flex items-center px-4 w-full h-full border-t border-gray-400 font-semibold py-3 cursor-pointer  ${
                    selectedTraining?._id === data._id
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {data.title}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-100 md:w-4/6 mt-10 md:mt-0 flex flex-col">
            {selectedTraining ? (
              <div className="flex-grow flex flex-col">
                <a
                  href={selectedTraining.trainingDesign}
                  download
                  target="_blank"
                  className="px-3 md:px-10 flex justify-center w-fit gap-2 items-center text-xl text-sky-900 hover:text-sky-950 font-semibold"
                >
                  Download training report
                  <Download />
                </a>
                <img
                  src={selectedTraining.trainingPhotos}
                  alt={selectedTraining.title}
                  className="w-full h-full max-h-[70vh] rounded flex-grow mt-5 object-cover"
                />
              </div>
            ) : (
              <div className="text-center text-3xl flex-grow">
                Select a training report to view
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-2 flex items-center justify-center bg-primary text-white rounded mr-2 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-2 flex items-center justify-center bg-primary text-white rounded ml-2 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      {/* Image gallery */}
      <div className="py-10 px-4 md:px-20 md:py-10">
        <h1 className="text-4xl pb-10 text-primary font-bold">Image Gallery</h1>
        <div className="relative overflow-hidden">
          {gallery && gallery.length > 0 && (
            <TrainingGallery images={gallery} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
