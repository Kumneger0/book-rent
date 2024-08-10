"use client";
import { Can } from "@casl/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Switch, Typography } from "@mui/material";
import { defineAbilty } from "../abilities";

import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "./UserContextWrapper";
import BasicModal from "./viewAutorModal";
import { useCreateQueryString } from "@/lib/utils";

export function getFuncToUpdate() {
  return async (
    url: string,
    {
      body,
      method,
    }: { body: RequestInit["body"]; method: RequestInit["method"] }
  ) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const data = (await response.json()) as {
        status: "success" | "error";
        data: { message: string };
      };
      if (data.status == "success") {
        toast.success("success");
        return { status: "success" };
      }
      if (data.status == "error") {
        toast.error(data.data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        const message = err.message;
        toast.error(message, {
          position: "top-right",
        });
        return;
      }
      toast.error("There was an error occured", {
        position: "top-right",
      });
      return null;
    }
  };
}

function AdminOwnerTable({
  data,
}: {
  data: {
    id: string | number;
    no: number;
    owner: string;
    upload: number;
    location: string;
    status: string;
    action: string;
    approved: boolean;
  }[];
}) {
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString(searchParams);

  const pathname = usePathname();
   const { user } = useUserContext();
   const ablity = defineAbilty(user!);
   const router = useRouter();

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
         Cell: ({ cell, row }) => {
           const status = cell.getValue() as "active" | "not active";
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
               <Can this={"User"} I={"disable"} ability={ablity}>
                 {() => (
                   <Switch
                     defaultChecked={status == "active"}
                     onChange={async (e, checked) => {
                       const updateOwner = getFuncToUpdate();
                       await updateOwner("/api/owner/disable", {
                         body: JSON.stringify({
                           id: row.original.id,
                           isActive: checked,
                         }),
                         method: "post",
                       });
                       router.refresh();
                     }}
                     color={
                       (cell.getValue() as "active" | "not active") == "active"
                         ? "success"
                         : "error"
                     }
                   />
                 )}
               </Can>
             </Box>
           );
         },
       },
       {
         accessorKey: "action",
         header: "Action",

         Cell: ({ row }) => (
           <Box sx={{ display: "flex", gap: "1rem" }}>
             <BasicModal author={row.original} />
             <Can this={"User"} I={"delete"} ability={ablity}>
               <Button
                 onClick={async () => {
                   const deleteOwner = getFuncToUpdate();
                   await deleteOwner("/api/owner/delete", {
                     method: "delete",
                     body: JSON.stringify({ id: row.original.id }),
                   });
                   router.refresh();
                 }}
               >
                 <DeleteIcon sx={{ color: "red" }} fontSize="medium" />
               </Button>
             </Can>

             <Can this={"User"} I={"approve"} ability={ablity}>
               <Button
                 variant={!row.original.approved ? "outlined" : "contained"}
                 sx={{
                   backgroundColor: !row.original.approved ? "gray" : null,
                   color: "white",
                 }}
                 color="primary"
                 onClick={async () => {
                   const updateOwner = getFuncToUpdate();
                   await updateOwner("/api/owner/approve", {
                     body: JSON.stringify({
                       id: row.original.id,
                       isApprove: !row.original.approved,
                     }),
                     method: "post",
                   });
                   router.refresh();
                 }}
               >
                 {row.original.approved ? "Approved" : "Approve"}
               </Button>
             </Can>
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
     manualFiltering: true,
     onColumnFiltersChange: (data) => {
       const filters =
         typeof data == "function"
           ? (data([]) as {
               id: string;
               value: string;
             }[])
           : [];

       if (!filters.length) {
         router.push(pathname);
         return;
       }

       const searchParamURL = createQueryString(
         filters?.map(({ id, value }) => ({
           name: id,
           value: String(value),
         }))
       );

       router.push(pathname + "?" + searchParamURL);
     },
   });

  return <MaterialReactTable table={table} />;
}
export default AdminOwnerTable;


