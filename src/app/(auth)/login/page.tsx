import LoginForm from "@/components/LoginForm";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Link from "next/link";

function Login() {
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
          <div>Book Rent</div>
        </Box>
        <Typography sx={{ color: "black", marginTop: "10px" }}>
          Login into book rent
        </Typography>
      </Box>
      <Divider sx={{ width: "80%" }} />
      <LoginForm />
      <div style={{ marginTop: "10px", color: "black" }}>
        haven not an account{" "}
        <Link href={"/signup"} style={{ color: "blue" }}>
          singup
        </Link>
      </div>
    </>
  );
}

export default Login;
