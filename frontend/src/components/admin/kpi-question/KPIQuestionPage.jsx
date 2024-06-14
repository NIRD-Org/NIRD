import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import KpiRow from "./KpiQuestionRow";
import KpiForm from "./KpiQuestionForm";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { useFetcher, useSearchParams } from "react-router-dom";

const KPIQuestionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kpiQuestions, setKpiQuestions] = useState([]);
  const [searchParams] = useSearchParams();
  const theme_id = searchParams.get("theme_id") || "";

  const handleCreateKpiQuestion = async formData => {
    try {
      await API.post("/api/v1/kpi-questions/create", formData);
      tst.success("KPI Question created successfully");
    } catch (error) {
      console.log(error);
      tst.error("Error creating KPI Question");
    }
  };

  const getAllKpiQuestions = async () => {
    try {
      setIsLoading(true);

      const { data } = await API.get(`/api/v1/kpi-questions/all`);
      setKpiQuestions(data?.questions);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false);

    }
  };

  useEffect(() => {
    getAllKpiQuestions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All KPI Questions</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add KPI Question</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] scrollbar overflow-y-scroll">
            <KpiForm type={"add"} onSubmit={handleCreateKpiQuestion} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all KPI Questions.</TableCaption>
        <TableHeader>
          <TableRow>
            {[
              "ID",
              "Theme ID",
              "KPI ID",
              "Question Name",
              "Question Type",
            ].map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={11} />
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
