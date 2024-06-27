"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableHead, TableRow } from "./table";

const TableSkeleton = ({columnCount,rowCount=10}) => {
  return (
    <TableBody>
      {[...Array(rowCount)].map((_, index) => (
        <TableRow key={index}>
          {[...Array(columnCount)].map((_, index) => (
            <TableHead key={index} className="px-6 py-4">
              <Skeleton className="h-4 w-full bg-slate-200" />
            </TableHead>
          ))}
          <TableHead className="px-6 py-4">
            <Skeleton className="h-4 w-20 bg-slate-200" />
          </TableHead>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;
