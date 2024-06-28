import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
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

  return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Programme Code</TableCell>
            <TableCell>{training.programmeCode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>{training.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>{training.type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Online/Offline</TableCell>
            <TableCell>{training.onlineOffline}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dates</TableCell>
            <TableCell>{training.dates}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Venue</TableCell>
            <TableCell>{training.venue}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created By</TableCell>
            <TableCell>{training.created_by}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <img className="w-[300px]" src={training.trainingPhotos} alt="" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Document</TableCell>
            <TableCell>
              <a
                href={training.trainingDesign}
                className="flex gap-3 items-center"
                target="_blank"
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
