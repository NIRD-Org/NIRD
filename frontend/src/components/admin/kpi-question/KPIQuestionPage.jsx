import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import KpiRow from "./KpiQuestionRow";
import KpiForm from "./KpiQuestionForm";
import API from "@/utils/API";
import { tst } from "@/lib/utils";

const KPIQuestionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kpiQuestions, setKpiQuestions] = useState([]);

  const handleCreateKpiQuestion = async formData => {
    try {
      await API.post("/api/v1/kpi-questions/create", formData);
      tst.success("KPI Question created successfully");
    } catch (error) {
      console.log(error);
      tst.error("Error creating KPI Question");
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All KPI Questions</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add KPI Question</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <KpiForm type={"add"} onSubmit={handleCreateKpiQuestion} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all KPI Questions.</TableCaption>
        <TableHeader>
          <TableRow>
            {["ID", "Theme ID", "KPI ID", "Question Name", "Input Type", "Max Range", "Question Type", "Status", "Created By", "Created At", "Modified By", "Modified At"].map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={12} />
        ) : (
          <TableBody>
            {kpiQuestions.map(kpiQuestion => (
              <KpiRow key={kpiQuestion.id} kpiQuestion={kpiQuestion} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default KPIQuestionPage;
