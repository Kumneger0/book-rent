import OwnerTable from "@/components/owner-Table";
import SharedHeader from "@/components/sharedHead";
import { prisma } from "@/db";
import { Box } from "@mui/material";

async function Owners() {
  const owners = (await prisma.user.findMany({ where: { role: "owner" } })).map(
    (owner) => {
      return {
        id: owner.id,
        no: owner.id,
        action: owner.approved ? "approve" : "review",
        owner: owner.fullName,
        status: owner.isActive ? "active" : "not active",
        upload: 15,
        location: owner.location,
        approved: owner.approved,
      } satisfies {
        id: string | number;
        no: number;
        owner: string;
        upload: number;
        location: string;
        status: string;
        action: string;
        approved: boolean;
      };
    }
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SharedHeader>Admin/owners</SharedHeader>
      <Box
        sx={{ p: 2, borderRadius: 1, boxShadow: 1, backgroundColor: "white" }}
      >
        <h3>List of Owners</h3>
        <OwnerTable data={owners} />
      </Box>
    </Box>
  );
}

export default Owners;
