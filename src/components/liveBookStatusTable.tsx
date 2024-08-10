"use client";
import { useCreateQueryString } from "@/lib/utils";
import { APIResponse } from "@/types";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import BasicModal from "./editBook";

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
