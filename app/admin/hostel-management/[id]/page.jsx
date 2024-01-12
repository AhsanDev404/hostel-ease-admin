"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const bookingsData = [
  {
    id: 1,
    roomNumber: "101",
    guestName: "Alice Johnson",
    checkIn: "2023-11-15",
    checkOut: "2023-11-18",
    paymentStatus: true,
  },
  {
    id: 2,
    roomNumber: "102",
    guestName: "Bob Brown",
    checkIn: "2023-11-20",
    checkOut: "2023-11-25",
    paymentStatus: false,
  },
  {
    id: 3,
    roomNumber: "103",
    guestName: "Eva White",
    checkIn: "2023-12-01",
    checkOut: "2023-12-05",
    paymentStatus: true,
  },
  {
    id: 4,
    roomNumber: "104",
    guestName: "Charlie Miller",
    checkIn: "2023-12-10",
    checkOut: "2023-12-15",
    paymentStatus: false,
  },
  {
    id: 5,
    roomNumber: "105",
    guestName: "David Smith",
    checkIn: "2023-12-18",
    checkOut: "2023-12-22",
    paymentStatus: true,
  },
  {
    id: 6,
    roomNumber: "106",
    guestName: "Fiona Davis",
    checkIn: "2023-12-25",
    checkOut: "2023-12-28",
    paymentStatus: false,
  },
  {
    id: 7,
    roomNumber: "107",
    guestName: "George Wilson",
    checkIn: "2024-01-02",
    checkOut: "2024-01-07",
    paymentStatus: true,
  },
  {
    id: 8,
    roomNumber: "108",
    guestName: "Helen Taylor",
    checkIn: "2024-01-10",
    checkOut: "2024-01-15",
    paymentStatus: false,
  },
  {
    id: 9,
    roomNumber: "109",
    guestName: "Ivan Brown",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    paymentStatus: true,
  },
  {
    id: 10,
    roomNumber: "110",
    guestName: "Jessica Turner",
    checkIn: "2024-01-28",
    checkOut: "2024-02-02",
    paymentStatus: false,
  },
  {
    id: 11,
    roomNumber: "111",
    guestName: "Kevin Clark",
    checkIn: "2024-02-05",
    checkOut: "2024-02-10",
    paymentStatus: true,
  },
  {
    id: 12,
    roomNumber: "112",
    guestName: "Laura Baker",
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    paymentStatus: false,
  },
  {
    id: 13,
    roomNumber: "113",
    guestName: "Michael Turner",
    checkIn: "2024-02-25",
    checkOut: "2024-02-28",
    paymentStatus: true,
  },
  {
    id: 14,
    roomNumber: "114",
    guestName: "Nancy Davis",
    checkIn: "2024-03-02",
    checkOut: "2024-03-07",
    paymentStatus: false,
  },
  {
    id: 15,
    roomNumber: "115",
    guestName: "Oliver White",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    paymentStatus: true,
  },
];

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "roomNumber",
    header: "Room Number",
    cell: ({ row }) => <div>{row.getValue("roomNumber")}</div>,
  },
  {
    accessorKey: "guestName",
    header: "Guest Name",
    cell: ({ row }) => <div>{row.getValue("guestName")}</div>,
  },
  {
    accessorKey: "checkIn",
    header: "Check-In Date",
    cell: ({ row }) => <div>{row.getValue("checkIn")}</div>,
  },
  {
    accessorKey: "checkOut",
    header: "Check-Out Date",
    cell: ({ row }) => <div>{row.getValue("checkOut")}</div>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <div
        className={
          row.getValue("paymentStatus") ? "text-green-600" : "text-red-600"
        }
      >
        {row.getValue("paymentStatus") ? "Received" : "Due"}
      </div>
    ),
  },
];

function BookingPage() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: bookingsData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  React.useEffect(() => {
    table.setGlobalFilter(globalFilter);
  }, [globalFilter, table]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Booking Management
      </h1>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter all columns..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
