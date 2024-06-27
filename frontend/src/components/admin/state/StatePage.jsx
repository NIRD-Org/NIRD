import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import API from "@/utils/API";
import { Link } from "react-router-dom";
import { NirdDeleteIcon, NirdEditIcon } from "../Icons";
import { tst } from "@/lib/utils";

const StatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);

  const getAllStates = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/state/all`);
      setStates(data?.states);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      try {
        await API.delete(`/api/v1/state/${id}`);
        tst.success("State deleted successfully");
        getAllStates();
      } catch (error) {
        tst.error("Failed to delete state:", error);
      }
    }
  };

  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All States</h2>
        <Link to="/admin/state/create">
          <Button>Add State</Button>
        </Link>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all states.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={3} />
        ) : (
          <TableBody>
            {states.map((state) => (
              <TableRow key={state.id}>
                <TableCell>{state.id}</TableCell>
                <TableCell>{state.name}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Link to={`/admin/state/update/${state.id}`}>
                    <NirdEditIcon />
                  </Link>
                  <div onClick={() => handleDelete(state.id)}>
                    <NirdDeleteIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default StatePage;
