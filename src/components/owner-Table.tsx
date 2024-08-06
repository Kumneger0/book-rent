'use client'
const data = [
  {
    no: 1,
    owner: "Nardos T",
    upload: 15,
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 2,
    owner: "Abel G",
    upload: 20,
    location: "Dire Dawa",
    status: "Pending",
    action: "Review",
  },
  {
    no: 3,
    owner: "Selam A",
    upload: 8,
    location: "Bahir Dar",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: 15,
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 2,
    owner: "Abel G",
    upload: 20,
    location: "Dire Dawa",
    status: "Pending",
    action: "Review",
  },
  {
    no: 3,
    owner: "Selam A",
    upload: 8,
    location: "Bahir Dar",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: 15,
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 2,
    owner: "Abel G",
    upload: 20,
    location: "Dire Dawa",
    status: "Pending",
    action: "Review",
  },
  {
    no: 3,
    owner: "Selam A",
    upload: 8,
    location: "Bahir Dar",
    status: "Active",
    action: "Approve",
  },

];
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React from 'react'

function OwnerTable() {
  const columns = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "owner", header: "Owner" },
    { accessorKey: "upload", header: "Upload" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "action", header: "Action" },
  ];

  
  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
    enableFullScreenToggle: false,
  });

  return <MaterialReactTable table={table} />;
}
export default OwnerTable

