import React, { useState, useEffect } from "react";
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
import { tst } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  NirdBanIcon,
  NirdDeleteIcon,
  NirdEditIcon,
} from "../Icons";

const ThemePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [themes, setThemes] = useState([]);

  const getAllThemes = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/theme/all`);
      setThemes(data?.themes?.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this theme?")) {
      try {
        await API.delete(`/api/v1/theme/${id}`);
        tst.success("Theme deleted successfully");
        const updatedThemes = themes.map((theme) =>
          theme.id === id ? { ...theme, status: 0 } : theme
        );
        setThemes(updatedThemes);
      } catch (error) {
        tst.error("Failed to delete theme:", error);
      }
    }
  };

  useEffect(() => {
    getAllThemes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Themes</h2>
        <Link to="/admin/theme/create">
          <Button>Add Theme</Button>
        </Link>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all themes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Theme Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={3} />
        ) : (
          <TableBody>
            {themes.map((theme) => (
              <TableRow key={theme.id}>
                <TableCell>{theme.id}</TableCell>
                <TableCell>{theme.theme_name}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  {theme.status != 0 ? (
                    <>
                      <Link to={`/admin/theme/update/${theme.id}`}>
                        <NirdEditIcon />
                      </Link>
                      <div onClick={() => handleDelete(theme.id)}>
                        <NirdDeleteIcon />
                      </div>
                    </>
                  ) : (
                    <NirdBanIcon />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default ThemePage;
