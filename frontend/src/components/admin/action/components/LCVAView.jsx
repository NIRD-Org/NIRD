import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { NirdViewIcon } from "@/components/admin/Icons";

const LCVAView = () => {
  const { id } = useParams();
  const [lCVA, setLCVA] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLCVA = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/good-practice/${id}`);
        setLCVA(data?.data);
      } catch (error) {
        console.error("Error fetching Good Practice:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLCVA();
  }, [id]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!lCVA) {
    return <div>Good Practice not found</div>;
  }

  return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Theme</TableCell>
            <TableCell>{lCVA.theme_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>{lCVA.state_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>District</TableCell>
            <TableCell>{lCVA.dist_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Block</TableCell>
            <TableCell>{lCVA.block_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GP</TableCell>
            <TableCell>{lCVA.gp_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Activity Title</TableCell>
            <TableCell>{lCVA.activityTitle}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <img className="w-[300px]" src={lCVA.image} alt="" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Document</TableCell>
            <TableCell>
              <a
                href={lCVA.document}
                className="flex gap-3 items-center"
                target="_blank"
              >
                <span>View Document</span>
                <NirdViewIcon />
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Video</TableCell>
            <TableCell>
              <a
                href={lCVA.video}
                className="flex gap-3 items-center"
                target="_blank"
              >
                <span>View Video</span>
                <NirdViewIcon />
              </a>
              {/* <video width={"300px"} src={lCVA.video}></video> */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created By</TableCell>
            <TableCell>{lCVA.created_by}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
};

export default LCVAView;
