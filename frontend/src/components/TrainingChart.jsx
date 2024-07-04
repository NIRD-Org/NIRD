import React from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";

const TrainingChart = () => {
  // Data from backend
  const data = {
    _id: "FY2023-2024",
    noOfTrainings: 2,
    noOfWorkshops: 0,
    noOfSeminars: 0,
    noOfWebinars: 0,
    noOfOnlineTrainings: 2,
    noOfOfflineTrainings: 0,
    noOfERsTrained: 64,
    noOfGPFunctionariesTrained: 130,
    noOfMembersOfSHGsTrained: 130,
    noOfRepsFromVolOrgnsNGOsTrained: 130,
    noOfRepsFromNatlStateInstnsTrained: 130,
    noOfPanchayatBandhusTrained: 130,
    noOfProjectStaffTrained: 130,
    totalOthersTrained: 130,
    totalMalesTrained: 12,
    totalFemalesTrained: 10,
    totalParticipantsTrained: 12,
  };

  // Prepare data for charts
  const trainingsData = {
    labels: ["Trainings", "Workshops", "Seminars", "Webinars"],
    datasets: [
      {
        label: "FY2023-2024",
        data: [
          data.noOfTrainings,
          data.noOfWorkshops,
          data.noOfSeminars,
          data.noOfWebinars,
        ],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(153,102,255,1)",
          "rgba(255,159,64,1)",
          "rgba(255,205,86,1)",
        ],
      },
    ],
  };

  const participantsData = {
    labels: [
      "ERs Trained",
      "GP Functionaries Trained",
      "SHGs Members Trained",
      "Vol Orgns NGOs Trained",
      "Natl State Instns Trained",
      "Panchayat Bandhus Trained",
      "Project Staff Trained",
      "Others Trained",
    ],
    datasets: [
      {
        label: "FY2023-2024",
        data: [
          data.noOfERsTrained,
          data.noOfGPFunctionariesTrained,
          data.noOfMembersOfSHGsTrained,
          data.noOfRepsFromVolOrgnsNGOsTrained,
          data.noOfRepsFromNatlStateInstnsTrained,
          data.noOfPanchayatBandhusTrained,
          data.noOfProjectStaffTrained,
          data.totalOthersTrained,
        ],
        backgroundColor: [
          "rgba(54,162,235,1)",
          "rgba(75,192,192,1)",
          "rgba(153,102,255,1)",
          "rgba(255,159,64,1)",
          "rgba(255,205,86,1)",
          "rgba(201,203,207,1)",
          "rgba(54,162,235,1)",
          "rgba(75,192,192,1)",
        ],
      },
    ],
  };

  const genderData = {
    labels: ["Males Trained", "Females Trained"],
    datasets: [
      {
        label: "FY2023-2024",
        data: [data.totalMalesTrained, data.totalFemalesTrained],
        backgroundColor: ["rgba(54,162,235,1)", "rgba(255,99,132,1)"],
      },
    ],
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div className="w-full h-[70vh]">
        <h2 className="text-center">
          Trainings, Workshops, Seminars, and Webinars
        </h2>
        <Bar
          className="h-screen"
          data={trainingsData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Financial Year",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Trainings/Workshops/Seminars/Webinars",
                },
              },
            },
            barThickness: 30,
            maxBarThickness: 40,
          }}
        />
      </div>

      <div className="w-full h-[90vh]">
        <h2 className="text-center">Participants Trained</h2>
        <Bar
          className="h-full"
          data={participantsData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Financial Year",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Participants Trained",
                },
              },
            },
            barThickness: 30,
            maxBarThickness: 40,
          }}
        />
      </div>

      <div className="w-full h-[70vh]">
        <h2 className="text-center">Males and Females Trained</h2>
        <Doughnut
          data={genderData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Financial Year",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Males and Females Trained",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TrainingChart;
