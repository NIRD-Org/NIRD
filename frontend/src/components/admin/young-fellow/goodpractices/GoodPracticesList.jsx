import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const GoodPracticesList = ({ title = "GP Details" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mocking fetch data with a timeout
  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          id: "3",
          theme_id: "2",
          state_id: "21",
          dist_id: "99",
          block_id: "114",
          gp_id: "411",
          activityTitle: "Promoting Cleanliness and Well-being",
          image:
            "https://nirdprbucket.s3.ap-south-1.amazonaws.com/v1721230039/user/uploads/mw3meutws4p3bdl5pgcn.jpg",
          document:
            "http://res.cloudinary.com/dt0h1catc/raw/upload/v1721230039/user/uploads/hb2uzcz16kgvnqevngw4",
          video:
            "https://nirdprbucket.s3.ap-south-1.amazonaws.com/v1721230040/kop63uxgovrob4riefbe.mp4",
          status: "1",
          financial_year: "FY2023-2024",
        },
      ]);
      setLoading(false);
    }, 2000); // Simulate loading
  }, []);

  const headers = [
    "ID",
    "Activity Title",
    "Image",
    "Document",
    "Video",
    "Status",
    "Financial Year",
  ];

  return (
    <Table className="overscroll-x-scroll w-full">
      <TableCaption>List of all {title.toLowerCase()}.</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {loading ? (
        <TableSkeleton columnCount={headers.length} rowCount={3} />
      ) : (
        <TableBody>
          {data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">
                No {title.toLowerCase()} found
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.activityTitle}</TableCell>
                <TableCell>
                  <img
                    src={item.image}
                    alt="activity"
                    className="w-16 h-16 object-cover"
                  />
                </TableCell>
                <TableCell>
                  <a
                    href={item.document}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Document
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={item.video}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video
                  </a>
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.financial_year}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default GoodPracticesList;
