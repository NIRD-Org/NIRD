import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import API from "@/utils/API";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import { dummyData } from "./data";
import { NirdDownloadIcon, NirdEditIcon } from "../Icons";
import DataToPDF from "./InsightPdf";

const FellowInsightPage = () => {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/api/v1/yf-insights/get");
        setInsights(response.data.data);
      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>Fellow Insights</AdminHeader>
      <Table className="overscroll-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>GP</TableHead>
            <TableHead>Date of Joining</TableHead>
            <TableHead>Date of Submission</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>
          ) : insights.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>No insights found.</TableCell>
            </TableRow>
          ) : (
            insights.map((insight, index) => (
              <TableRow key={insight.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{insight.name}</TableCell>
                <TableCell>{insight.gp_name}</TableCell>
                <TableCell>{insight.dateOfJoining}</TableCell>
                <TableCell>{insight.dateOfSubmission}</TableCell>
                <TableCell>{insight.approved?"Approved":"Pending"}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Link to={`/admin/young-fellow-insight/edit/${insight.id}`}>
                    <NirdEditIcon />
                  </Link>
                 {/*  <DataToPDF data={insight}>
                    <NirdDownloadIcon />
                  </DataToPDF> */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FellowInsightPage;
