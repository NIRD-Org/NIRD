import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StateFilter from "@/components/admin/filter/StateFilter";
import DistrictFilter from "@/components/admin/filter/DistrictFilter";
import BlockFilter from "@/components/admin/filter/BlockFilter";
import AdminHeader from "../AdminHeader";

const Attendance = () => {
  return (
    <div className="container mx-auto p-4">
      <AdminHeader>All attendance</AdminHeader>

      <div className="gap-4 grid grid-cols-4 mb-10">
          <StateFilter />
          <DistrictFilter />
          <BlockFilter />
      </div>
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
