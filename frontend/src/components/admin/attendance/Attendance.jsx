import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminHeader from "../AdminHeader";
import { useAuthContext } from "@/context/AuthContext";

const Attendance = () => {

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>All Attendance</AdminHeader>
          <Table className="overscroll-x-scroll">
            <TableCaption>List of all Gram Panchayats.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>State</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Block</TableHead>
                <TableHead>Gram Panchayat </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan="5" className="text-center pl-20">
                  No data found in table
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
  );
};

export default Attendance;
