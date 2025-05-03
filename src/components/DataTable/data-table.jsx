import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function DataTable({
  columns,
  data,
  pagination = undefined,
  setPagination = undefined,
  sorting = undefined,
  setSorting = undefined,
  pageCount = 0,
  isFetching = false,
  isLoading = false,
}) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='rounded-md border font-montserrat'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isFetching || isLoading ? (
            Array(4)
              .fill(null)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell className='h-16'>
                    <Skeleton className='h-4 w-4' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-12' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-12' />
                  </TableCell>
                  <TableCell>
                    <div className='flex justify-center'>
                      <Skeleton className='h-4 w-12' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex justify-center'>
                      <Skeleton className='h-4 w-12' />
                    </div>
                  </TableCell>
                </TableRow>
              ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && (
        <div className='flex items-center gap-3 px-4 py-3'>
          <Button
            size='sm'
            className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer font-montserrat'
            onClick={() => table.previousPage()}
            disabled={!table?.getCanPreviousPage()}>
            <SquareChevronLeft />
            Previous
          </Button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {pageCount}
          </span>
          <Button
            size='sm'
            className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer font-montserrat'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
            <SquareChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
