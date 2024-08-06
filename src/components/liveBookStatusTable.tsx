"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type Table = {
  No: string;
  BookNo: number;
  Owner: string;
  status: "rented" | "free";
  price: string;
};

const data: Table[] = [
  {
    No: "1",
    BookNo: 123,
    Owner: "John Doe",
    status: "rented",
    price: "$10",
  },
  {
    No: "2",
    BookNo: 456,
    Owner: "Jane Smith",
    status: "free",
    price: "$15",
  },
  {
    No: "3",
    BookNo: 789,
    Owner: "Alice Johnson",
    status: "rented",
    price: "$8",
  },
  {
    No: "4",
    BookNo: 101,
    Owner: "Bob Brown",
    status: "free",
    price: "$20",
  },
  {
    No: "5",
    BookNo: 102,
    Owner: "Charlie Davis",
    status: "rented",
    price: "$12",
  },
];

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Table>[]>(
    () => [
      {
        accessorKey: "No",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "BookNo",
        header: "Book No",
        size: 100,
      },
      {
        accessorKey: "Owner",
        header: "Owner",
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
    enableFullScreenToggle: false,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
