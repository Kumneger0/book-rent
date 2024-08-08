"use client";
import { BookType, BookTable, Prettify } from "@/types";
import { Box, Switch, Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import Image from "next/image";
import { useMemo } from "react";

const Example = ({ data }: { data: BookTable[] }) => {
  const columns = useMemo<MRT_ColumnDef<(typeof data)[number]>[]>(
    () => [
      { accessorKey: "bookNo", header: "No." },
      { accessorKey: "author", header: "Author" },
      {
        accessorKey: "owner",
        header: "Owner",
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
      { accessorKey: "category", header: "Category" },
      { accessorKey: "bookName", header: "Book Name" },
      {
        accessorKey: "status",
        header: "Status",

        Cell: ({ cell }) => {
          const status = cell.getValue() as string;
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
              <Typography>{status}</Typography>
              <Switch color="success" defaultChecked />
            </Box>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    //@ts-ignore
    data: data.map((data) => ({ ...data, owner: data.owner.fullName })),
    enablePagination: false,
    enableFullScreenToggle: false,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
