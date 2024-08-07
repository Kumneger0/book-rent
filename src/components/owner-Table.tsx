"use client";
export const data = [
  {
    no: 1,
    owner: "Nardos T",
    upload: 15,
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
    approved: false,
  },
  {
    no: 2,
    owner: "Abel G",
    upload: 20,
    location: "Dire Dawa",
    status: "Active",
    action: "Review",
    approved: false,
  },
  {
    no: 3,
    owner: "Selam A",
    upload: 8,
    location: "Bahir Dar",
    status: "Active",
    action: "Approve",
    approved: false,
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: 15,
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
    approved: false,
  },
  {
    no: 2,
    owner: "Abel G",
    upload: 20,
    location: "Dire Dawa",
    status: "Active",
    action: "Review",
    approved: true,
  },
  {
    no: 3,
    owner: "Selam A",
    upload: 8,
    location: "Bahir Dar",
    status: "Active",
    action: "Approve",
    approved: true,
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: 15,
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
    approved: true,
  },
  {
    no: 2,
    owner: "Abel G",
    upload: 20,
    location: "Dire Dawa",
    status: "Active",
    action: "Review",
    approved: true,
  },
  {
    no: 3,
    owner: "Selam A",
    upload: 8,
    location: "Bahir Dar",
    status: "Active",
    action: "Approve",
    approved: true,
  },
];
import { Box, Button, Switch, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import Image from "next/image";
import BasicModal from "./viewAutorModal";

function OwnerTable() {
  const columns = useMemo<MRT_ColumnDef<(typeof data)[number]>[]>(
    () => [
      { accessorKey: "no", header: "No." },
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
      { accessorKey: "upload", header: "Upload" },
      { accessorKey: "location", header: "Location" },
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
      {
        accessorKey: "action",
        header: "Action",

        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <BasicModal author={row.original}/>
            <Button
              onClick={() => {
                console.log("Action button clicked for row:", row.original);
              }}
            >
              <DeleteIcon sx={{ color: "red" }} fontSize="medium" />
            </Button>
            <Button
              variant={!row.original.approved ? "outlined" : "contained"}
              sx={{
                backgroundColor: !row.original.approved ? "gray" : null,
                color: "white",
              }}
              color="primary"
              onClick={() => {
                console.log("Action button clicked for row:", row.original);
              }}
            >
              {row.original.approved ? "Approved" : "Approve"}
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
  });

  return <MaterialReactTable table={table} />;
}
export default OwnerTable;
