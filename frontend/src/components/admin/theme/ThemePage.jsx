import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import ThemeRow from "./ThemeRow"; 
import { themes } from "@/lib/data";
import ThemeForm from "./ThemeForm";

const ThemePage = () => {
//   const [themeList, setThemeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 /*  useEffect(() => {
    // Fetch theme data from your backend API
    async function fetchThemeList() {
      try {
        const response = await fetch("/api/theme"); // Adjust the API endpoint accordingly
        const data = await response.json();
        setThemeList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching theme data:", error);
        setIsLoading(false);
      }
    }

    fetchThemeList();
  }, []);
 */
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Themes</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Theme</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <ThemeForm type={"add"} />
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
          <TableSkeleton columnCount={Object.keys(themes[0]).length} />
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
