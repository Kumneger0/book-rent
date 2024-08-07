"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

type TableAdmin = {
  No: string;
  BookNo: number;
  Owner: string;
  status: "rented" | "free";
  price: string;
};

const tableAdmin: TableAdmin[] = [
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

type TableOwner = (Omit<TableAdmin, "Owner"> & { BookName: string })[];

const tableOwner: TableOwner = [
  {
    No: "1",
    BookNo: 123,
    BookName: "John Doe",
    status: "rented",
    price: "$10",
  },
  {
    No: "2",
    BookNo: 456,
    BookName: "Jane Smith",
    status: "free",
    price: "$15",
  },
  {
    No: "3",
    BookNo: 789,
    BookName: "Alice Johnson",
    status: "rented",
    price: "$8",
  },
  {
    No: "4",
    BookNo: 101,
    BookName: "Bob Brown",
    status: "free",
    price: "$20",
  },
  {
    No: "5",
    BookNo: 102,
    BookName: "Charlie Davis",
    status: "rented",
    price: "$12",
  },
];

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TableAdmin>[]>(
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
        Cell(props) {
          const owner = props.cell.getValue() as string;
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.5rem",
                color: "green",
                borderRadius: "0.5rem",
              }}
            >
              <Image
                style={{ borderRadius: "50%" }}
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${owner}`}
                width={50}
                height={50}
                alt="avatar"
              />
              <Typography>{owner}</Typography>
            </Box>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        Cell(props) {
          const status = props.cell.getValue() as string;
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: status === "rented" ? "red" : "#006AFF",
              }}
            >
              <CircleIcon
                fontSize="large"
                sx={{
                  color: status === "rented" ? "red" : "#006AFF",
                }}
              />
              <Typography>{status}</Typography>
            </Box>
          );
        },
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
    data: tableAdmin,
    enablePagination: false,
    enableFullScreenToggle: false,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;

export const TableOwner = () => {
  const columns = useMemo<MRT_ColumnDef<TableOwner[number]>[]>(
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
        accessorKey: "BookName",
        header: "Book Name",
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        Cell(props) {
          const status = props.cell.getValue() as string;
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: status === "rented" ? "red" : "#006AFF",
              }}
            >
              <CircleIcon
                fontSize="large"
                sx={{
                  color: status === "rented" ? "red" : "#006AFF",
                }}
              />
              <Typography>{status}</Typography>
            </Box>
          );
        },
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
    data: tableOwner,
    enablePagination: false,
    enableFullScreenToggle: false,
  });

  return <MaterialReactTable table={table} />;
};