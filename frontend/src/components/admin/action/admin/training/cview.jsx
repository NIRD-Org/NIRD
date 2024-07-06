import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { NirdViewIcon } from "@/components/admin/Icons";

const TrainingView = () => {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/training/${id}`);
        setTraining(data?.data);
      } catch (error) {
        console.error("Error fetching Training:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraining();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!training) {
    return <div>Training not found</div>;
  }
  const fields = [
    { label: "Programme Code", value: training.programmeCode },
    { label: "Title", value: training.title },
    { label: "Type (Training/Workshop/Seminar/Webinar/Off-Campus)", value: training.type },
    { label: "Online/Offline", value: training.onlineOffline },
    { label: "Dates", value: training.dates },
    { label: "Duration", value: training.duration },
    { label: "Venue", value: training.venue },
    { label: "No. of ERs", value: training.noOfERs },
    { label: "No. of GP Functionaries", value: training.noOfGPFunctionaries },
    { label: "No. of Members of SHGs", value: training.noOfMembersOfSHGs },
    { label: "No. of Reps. from Vol. Orgns/ NGOs", value: training.noOfRepsFromVolOrgnsNGOs },
    { label: "No. of Reps. from Natl. / State Level Instns.", value: training.noOfRepsFromNatlStateInstns },
    { label: "No. of Panchayat Bandhus", value: training.noOfPanchayatBandhus },
    { label: "No. of Project Staff Trained", value: training.noOfProjectStaffTrained },
    { label: "Others (Youth/PSUs/ Individuals etc.)", value: training.others },
    { label: "Total", value: training.total },
    { label: "No. of Female", value: training.noOfFemale },
    { label: "No. of Male", value: training.noOfMale },
    { label: "Training Methods", value: training.trainingMethods },
    { label: "Total Sessions", value: training.totalSessions },
    { label: "Total Session Time (Hrs)", value: training.totalSessionTime },
    { label: "Evaluation is done on TMP/Google Form", value: training.evalGoogle ? "Yes" : "No" },
    { label: "Name of the Training Coordinator", value: training.nameOfTrainingCoordinator },
    { label: "Financial Year", value: training.financialYear },
  ];

  return (
    <Table>
      <TableBody>
        {fields.map((field, index) => (
          <TableRow key={index}>
            <TableCell>{field.label}</TableCell>
            <TableCell>{field.value}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>
            <img className="w-[300px]" src={training.trainingPhotos} alt="Training" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Document</TableCell>
          <TableCell>
            <a
              href={training.trainingDesign}
              className="flex gap-3 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Document</span>
              <NirdViewIcon />
            </a>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TrainingView;
