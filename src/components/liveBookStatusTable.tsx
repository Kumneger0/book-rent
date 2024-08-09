"use client";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Image from "next/image";
import { useMemo } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { APIResponse } from "@/types";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/lib/utils";

type TableAdmin = {
  No: string;
  BookNo: string | number;
  Owner: string;
  status: "rented" | "free";
  price: string;
};

type TableOwner = (Omit<TableAdmin, "Owner"> & { BookName: string })[];

const Example = ({ data }: { data: TableAdmin[] }) => {
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
    data,
    enablePagination: false,
    enableFullScreenToggle: false,
    manualFiltering: true,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;

export const TableOwner = ({
  data,
}: {
  data: {
    id: number;
    No: string;
    BookNo: number;
    BookName: string;
    status: "rented" | "free";
    price: string;
  }[];
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const createQueryString = useCreateQueryString(searchParams);

  const deleteBook = async (bookID: number) => {
    try {
      const response = await fetch("/api/books/delete", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bookID }),
      });
      const data = (await response.json()) as APIResponse;
      if (data.status == "success") {
        toast.success("You have Deleted the file successfully");
        router.refresh();
      }
      if (data.status == "error") {
        toast.error("Failed to Delete your book");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns = useMemo<MRT_ColumnDef<(typeof data)[number]>[]>(
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
          const status = props.cell.getValue() as "rented" | "free";
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
      {
        accessorKey: "action",
        header: "Action",
        size: 100,
        Cell: ({ row, cell }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button onClick={() => {}}>
              <ModeEditOutlineIcon sx={{ color: "black" }} fontSize="medium" />
            </Button>

            <Button onClick={() => deleteBook(Number(row.original.id))}>
              <DeleteIcon sx={{ color: "red" }} fontSize="medium" />
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
    enableFullScreenToggle: false,
    onColumnFiltersChange: (data) => {},
  });

  return <MaterialReactTable table={table} />;
};