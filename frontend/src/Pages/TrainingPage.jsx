import GradientLine from "@/components/GradientLine";
import TrainingChart from "@/components/TrainingChart";
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
  const [financialYear, setFinancialYear] = useState();
  const [totalPages, setTotalPages] = useState();
  const [trainingSummary, setTrainingSummary] = useState();
  const [loading, setLoading] = useState(false);
  // static data for table
  const [data, setData] = useState({
    trainings: 45,
    workshops: 56,
    seminars: 56,
    webinars: 67,
    onlineTrainings: 34,
    offlineTrainings: 15,
    ersTrained: 123,
    functionariesTrained: 345,
    shgsTrained: 345,
    ngosTrained: 10,
    panchayatBandhuTrained: 43,
    projectStaffTrained: 23,
    malesTrained: 34,
    femalesTrained: 45,
  });

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
      setLoading(true);
      const { data } = await API.get(`/api/v1/training?page=${page}`);
      const trainingList = data?.data?.trainingData;
      setTrainingData(trainingList);
      setTotalPages(data?.data?.pagination.totalPages);
      setSelectedTraining(trainingList?.[0] || null);
    } catch (error) {
      console.log(error.message);
      setTrainingData([]);
      setSelectedTraining(null);
    } finally {
      setLoading(false);
    }
  };

  const getTrainingSummary = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/training/yearly-report?financialYear=${financialYear}`
      );
      setTrainingSummary(data);
    } catch (error) {
      setTrainingSummary();
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getTrainingSummary();
    getTrainingGallery();
  }, []);

  if (loading)
    return (
      <div className="h-full w-full text-center text-2xl text-gray-600">
        Loading...
      </div>
    );

  const financialYears = [];

  for (let year = 2022; year <= 2050; year++) {
    financialYears.push({
      value: `FY${year}-${year + 1}`,
      label: `FY ${year}-${year + 1}`,
    });
  }

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

      {/* Tabular data */}

      {/* <div className="w-full px-4 py-8  md:px-20 md:py-10 bg-white max-w-lg ">
        <h1 className="text-2xl font-bold py-2  text-center text-white bg-primary">
          Training Summary
        </h1>
        <div className="grid grid-cols-1  gap-4 border border-gray-400">
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">No. of Trainings</span>
            <span className="text-gray-600">{data.trainings}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">No. of Workshops</span>
            <span className="text-gray-600">{data.workshops}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">No. of Seminars</span>
            <span className="text-gray-600">{data.seminars}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">No. of Webinars</span>
            <span className="text-gray-600">{data.webinars}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of Online Trainings
            </span>
            <span className="text-gray-600">{data.onlineTrainings}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of Offline Trainings
            </span>
            <span className="text-gray-600">{data.offlineTrainings}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of ERs trained
            </span>
            <span className="text-gray-600">{data.ersTrained}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of Functionaries trained
            </span>
            <span className="text-gray-600">{data.functionariesTrained}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of SHGs trained
            </span>
            <span className="text-gray-600">{data.shgsTrained}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of Vol. Organisations/ NGOs trained
            </span>
            <span className="text-gray-600">{data.ngosTrained}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of Panchayat Bandhu trained
            </span>
            <span className="text-gray-600">{data.panchayatBandhuTrained}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of Project Staff Trained
            </span>
            <span className="text-gray-600">{data.projectStaffTrained}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of Males trained
            </span>
            <span className="text-gray-600">{data.malesTrained}</span>
          </div>
          <div className="flex justify-between items-center py-0 px-4">
            <span className="font-semibold text-sky-950">
              No. of Females trained
            </span>
            <span className="text-gray-600">{data.femalesTrained}</span>
          </div>
        </div>
      </div> */}

      <div className="w-full px-4 py-8 md:px-20 md:py-10 bg-white">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-end mb-2">
          <label className="font-semibold">Select Financial Year: </label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="w-full md:w-40 text-center border p-2 rounded-md"
          >
            <option value="">Select Financial Year</option>
            {financialYears.map((year, index) => (
              <option key={index} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
        <h1 className="text-2xl font-bold py-2 text-center text-white bg-primary">
          Training Summary
        </h1>
        {trainingSummary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Trainings
              </span>
              <span className="block text-gray-600">
                {trainingSummary?.noOfTrainings ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Workshops
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfWorkshops ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Seminars
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfSeminars ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Webinars
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfWebinars ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Online Trainings
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfOnlineTrainings ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Offline Trainings
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfOfflineTrainings ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of ERs trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfERsTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Functionaries trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfGPFunctionariesTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of SHGs trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfMembersOfSHGsTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Vol. Organisations/ NGOs trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfRepsFromVolOrgnsNGOsTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Reps. From Natl. / State Level Institutions Trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfRepsFromNatlStateInstnsTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Panchayat Bandhu trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfPanchayatBandhusTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Project Staff Trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.noOfProjectStaffTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                Others (Youth/PSUs/ Individuals etc.)
              </span>
              <span className="block text-gray-600">
                {trainingSummary.totalOthersTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Males trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.totalMalesTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                No. of Females trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.totalFemalesTrained ?? 0}
              </span>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg shadow-md">
              <span className="font-semibold text-sky-950">
                Total Number of Participants Trained
              </span>
              <span className="block text-gray-600">
                {trainingSummary.totalParticipantsTrained ?? 0}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Charts */}

      <div className="w-full bg-white py-10 px-5 md:py-20 md:px-10">
        <TrainingChart />
      </div>

      {/* Training Reports */}
      <div className="px-4 bg-gray-100 py-8 md:px-20 md:py-10">
        <h1 className="text-4xl text-primary pb-10 font-bold">
          Training Reports
        </h1>

        {trainingData.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="text-center text-3xl py-20">
            No training reports found
          </div>
        )}
      </div>
      {/* Image gallery */}
      <div className="py-10 px-4 md:px-20 md:py-10">
        <h1 className="text-4xl pb-10 text-primary font-bold">Image Gallery</h1>
        <div className="relative overflow-hidden">
          {gallery && gallery.length > 0 ? (
            <TrainingGallery images={gallery} />
          ) : (
            <h1 className="text-center text-gray-500 text-2xl">
              No Images Found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
