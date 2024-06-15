import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import StateRow from "./StateRow";
import StateForm from "./StateForm";
import { states } from "@/lib/data"; // Import states data
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { Link } from "react-router-dom";

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
      <Table>
        <TableCaption>List of all states.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={7} />
        ) : (
          <TableBody>
            {states.map(state => (
              <StateRow key={state.id} state={state} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default StatePage;
