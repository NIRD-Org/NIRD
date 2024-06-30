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
    { label: "Type", value: training.type },
    { label: "Online/Offline", value: training.onlineOffline },
    { label: "Dates", value: training.dates },
    { label: "Duration", value: training.duration },
    { label: "Venue", value: training.venue },
    { label: "Govt. Officials", value: training.govtOfficials },
    { label: "Bankers & Comm Orgns.", value: training.bankersCommOrgns },
    { label: "ZP & PRIs", value: training.zpPRIs },
    { label: "Vol. Orgns/NGOs", value: training.volOrgnsNGOs },
    { label: "Natl. / State Instts for Res. & Trg", value: training.natlStateInstts },
    { label: "Univ. / Colleges", value: training.univColleges },
    { label: "International", value: training.international },
    { label: "Others/Youth/PSUs/Individuals", value: training.others },
    { label: "Total", value: training.total },
    { label: "Female", value: training.female },
    { label: "Training Methods", value: training.trainingMethods },
    { label: "Total Sessions", value: training.totalSessions },
    { label: "Total Session Time (Hrs)", value: training.totalSessionTime },
    { label: "Evaluation is done on TMP/Google Form", value: training.evaluation },
    { label: "Co Ordinate", value: training.coOrdinate },
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
            <a href={training.trainingDesign} className="flex gap-3 items-center" target="_blank" rel="noopener noreferrer">
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
