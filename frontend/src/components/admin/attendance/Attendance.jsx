import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useSearchParams } from "react-router-dom";
import StateFilter from "@/components/admin/filter/StateFilter";
import DistrictFilter from "@/components/admin/filter/DistrictFilter";
import BlockFilter from "@/components/admin/filter/BlockFilter";
import AdminHeader from "../AdminHeader";

const Attendance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const [gp, setGrams] = useState([]);

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>All attendance</AdminHeader>

      <div className="gap-4 flex flex-wrap mb-10">
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
