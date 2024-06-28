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

const GoodPracticeView = () => {
  const { id } = useParams();
  const [goodPractice, setGoodPractice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGoodPractice = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/good-practice/${id}`);
        setGoodPractice(data?.data);
      } catch (error) {
        console.error("Error fetching Good Practice:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoodPractice();
  }, [id]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!goodPractice) {
    return <div>Good Practice not found</div>;
  }

  return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Theme</TableCell>
            <TableCell>{goodPractice.theme_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>{goodPractice.state_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>District</TableCell>
            <TableCell>{goodPractice.dist_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Block</TableCell>
            <TableCell>{goodPractice.block_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GP</TableCell>
            <TableCell>{goodPractice.gp_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Activity Title</TableCell>
            <TableCell>{goodPractice.activityTitle}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <img className="w-[300px]" src={goodPractice.image} alt="" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Document</TableCell>
            <TableCell>
              <a
                href={goodPractice.document}
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
                href={goodPractice.video}
                className="flex gap-3 items-center"
                target="_blank"
              >
                <span>View Video</span>
                <NirdViewIcon />
              </a>
              {/* <video width={"300px"} src={goodPractice.video}></video> */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created By</TableCell>
            <TableCell>{goodPractice.created_by}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
};

export default GoodPracticeView;
