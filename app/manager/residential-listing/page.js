// Import necessary modules and components
"use client";
import * as React from "react";
import Link from "next/link";

import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button, buttonVariants } from "@/components/ui/button";
import DataTable from "@/components/data-table";

// Sample data for the residential page
const residentialData = [
  {
    id: 1,
    userName: "John Doe",
    paymentStatus: "Paid",
    reservationDate: "2024-01-15",
    email: "john.doe@example.com",
    phone: "555-1111-2222",
    roomNumber: 101,
    gender: "Male",
  },
  {
    id: 2,
    userName: "Alice Smith",
    paymentStatus: "Pending",
    reservationDate: "2024-02-01",
    email: "alice.smith@example.com",
    phone: "555-2222-3333",
    roomNumber: 102,
    gender: "Female",
  },
  // Add more residential data as needed
];

// Define columns for the residential page
export const residentialColumns = [
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => <div>{row.getValue("userName")}</div>,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User Name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payment Status
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "reservationDate",
    header: "Reservation Date",
    cell: ({ row }) => <div>{row.getValue("reservationDate")}</div>,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Reservation Date
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "roomNumber",
    header: "Room Number",
    cell: ({ row }) => <div>{row.getValue("roomNumber")}</div>,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Room Number
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Gender
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  // {
  //   accessorKey: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => (
  //     <div className="space-x-4">
  //       <Button>Delete User</Button>
  //     </div>
  //   ),
  // },
];

// Function for the residential page
function ResidentialPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Residential Page</h1>
      <DataTable columns={residentialColumns} data={residentialData} />
    </div>
  );
}

export default ResidentialPage;
