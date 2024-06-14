"use client";
import React, { useEffect, useState } from "react";
import TalukRow from "./TalukRow";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import TalukForm from "./TalukForm";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import StateFilter from "@/components/admin/filter/StateFilter";
import DistrictFilter from "@/components/admin/filter/DistrictFilter";

const TalukPage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [taluks, setTaluks] = useState([]);
  const [searchParams] = useSearchParams();
  const dist_id = searchParams.get("dist_id");
  const state_id = searchParams.get("state_id");

  const handleCreateTaluka = async formData => {
    try {
      await API.post("/api/v1/taluk/create", formData);
      tst.success("Taluk created successfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };

  const getAllTaluks = async (stateId, dist_id) => {
    try {
      setIsLoading(true);
      const url = `/api/v1/taluk/get?state=${state_id}&dist=${dist_id}`;
      const { data } = await API.get(url);
      setTaluks(data?.taluks);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dist_id && state_id) {
      getAllTaluks(state_id, dist_id);
    }
  }, [dist_id, state_id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold ">All Taluks</h2>
          <StateFilter />
          <DistrictFilter />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Taluk</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] scrollbar overflow-y-scroll">
            <TalukForm type={"add"} onSubmit={handleCreateTaluka} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all taluks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>LGD Code</TableHead>
            <TableHead>State ID</TableHead>
            <TableHead>District ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mapped to Another District</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={10} />
        ) : (
          <TableBody>
            {taluks.map(taluk => (
              <TalukRow key={taluk.id} taluk={taluk} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default TalukPage;
