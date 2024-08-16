import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import { NirdBanIcon, NirdDeleteIcon, NirdEditIcon } from "../Icons";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StateFilter from "../filter/StateFilter";
import DistrictFilter from "../filter/DistrictFilter";
import ThemeFilter from "../filter/ThemeFilter";
import BlockFilter from "../filter/BlockFilter";

const DataTable = ({
  title,
  endpoint,
  headers,
  columnItems,
  createLink,
  master,
  crudpoint,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(endpoint, {
        params: { state_id, dist_id, block_id, gp_id, theme_id },
      });
      const dataStructure =
        data.states ||
        data.dist ||
        data.blocks ||
        data.themes ||
        data.KPI ||
        data.data ||
        data.gps ||
        data;
      setData((prev) => (prev = []));
      setData((prev) => (prev = dataStructure));
      setTotalPages(Math.ceil(dataStructure.length / itemsPerPage));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, state_id, dist_id, block_id, gp_id, theme_id]);

  const handleRestore = async (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${title.toLowerCase()}?`
      )
    ) {
      try {
        await API.delete(`${crudpoint}/${id}`);
        tst.success(`${title} deleted successfully`);
        fetchData();
      } catch (error) {
        tst.error(`Failed to delete ${title.toLowerCase()}:`, error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${title.toLowerCase()}?`
      )
    ) {
      try {
        await API.delete(`${crudpoint}/${id}`);
        tst.success(`${title} deleted successfully`);
        fetchData();
      } catch (error) {
        tst.error(`Failed to delete ${title.toLowerCase()}:`, error);
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [state_id, dist_id, block_id, gp_id, theme_id]);

  const handleReset = () => {
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      {master ? (
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold  w-max">All {title}</h2>
            {title === "Districts" && <StateFilter />}
            {title === "Soepr-Districts" && <StateFilter type="soepr" />}
            {title === "Blocks" && (
              <>
                <StateFilter />
                <DistrictFilter />
              </>
            )}
            {title === "GPs" && (
              <>
                <StateFilter />
                <DistrictFilter />
                <BlockFilter />
              </>
            )}
            {title === "KPIs" && <ThemeFilter />}
            {title != "States" && title != "Themes" && (
              <Button onClick={handleReset}>Reset</Button>
            )}
          </div>
          {createLink && (
            <Link to={createLink}>
              <Button>{`Add ${title}`}</Button>
            </Link>
          )}
        </div>
      ) : (
        <AdminHeader>All {title}</AdminHeader>
      )}
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all {title.toLowerCase()}.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={headers.length} />
        ) : (
          <TableBody>
            {paginatedData?.length === 0 && (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center">
                  No {title.toLowerCase()} found
                </TableCell>
              </TableRow>
            )}
            {paginatedData?.map((item) => (
              <TableRow key={item.id}>
                {columnItems.map((column) => (
                  <TableCell key={column}>{item[column] || ""}</TableCell>
                ))}
                <TableCell className="flex gap-2 items-center">
                  {master ? (
                    <>
                      <Link
                        to={`/admin/${title
                          .toLowerCase()
                          .slice(0, -1)}/update/${item.id}`}
                      >
                        <NirdEditIcon />
                      </Link>
                      <div onClick={() => handleDelete(item.id)}>
                        <NirdDeleteIcon />
                      </div>
                    </>
                  ) : (
                    <div onClick={() => handleRestore(item.id)}>
                      <NirdBanIcon />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
