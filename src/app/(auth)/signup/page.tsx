import SignUPForm from "@/components/singupForm";
import {
  Box,
  Divider,
  Typography
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function Signup() {
  return (
    <>
      <Box
        sx={{
          margin: "10px 10px",
          padding: "10px",
          display: "flex",
          color: "black",
          gap: "2px",
          flexDirection: "column",
          width: "80%",
          height: "100dvh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            margin: "10px, 0px",
            p: 2,
          }}
        >
          <Image src="/Logo.png" alt="logo" width={100} height={50} />
          <Typography sx={{ fontWeight: 400, fontSize: "28px", px: 2 }}>
            Book Rent
          </Typography>
        </Box>
        <Typography
          sx={{ color: "black", marginTop: "30px", fontSize: "20px" }}
        >
          Sign Up Into Book Rent
        </Typography>
      </Box>
      <Divider sx={{ width: "80%", marginBottom: "10px" }} />

      <SignUPForm />

      <div style={{ marginTop: "10px", color: "black", paddingBottom: "20px" }}>
        Already have an account{" "}
        <Link href={"/login"} style={{ color: "blue", textDecoration: "none" }}>
          login
        </Link>
      </div>
    </>
  );
}

export default Signup;
