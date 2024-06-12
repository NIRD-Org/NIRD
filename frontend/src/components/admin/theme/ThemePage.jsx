import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import ThemeRow from "./ThemeRow"; 
import ThemeForm from "./ThemeForm";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { useToaster } from "react-hot-toast";

const ThemePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [themes,setThemes] = useState([]);

  const handleCreateGp = async formData => {
    try {
      await API.post("/api/v1/theme/create", formData);
      tst.success("Theme created successfully");
    } catch (error) {
      tst.error(error);
    }
  };

  const getAllThemes = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/theme/all`);
      setThemes(data?.themes);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    getAllThemes();
  },[])
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Themes</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Theme</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]  scrollbar overflow-y-scroll">
            <ThemeForm type={"add"} onSubmit={handleCreateGp}/>
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all themes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Theme Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Modified By</TableHead>
            <TableHead>Modified At</TableHead>
            <TableHead>Flag</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={7} />
        ) : (
          <TableBody>
            {themes.map(theme => (
              <ThemeRow key={theme.id} theme={theme} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default ThemePage;
