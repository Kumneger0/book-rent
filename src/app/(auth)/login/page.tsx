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
      <TextField
        id="outlined-email"
        label="Email"
        type="email"
        style={{ width: "80%", marginTop: "10px" }}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        style={{ width: "80%" }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Remeber me"
        sx={{ color: "black", width: "80%", margin: "10px, 0", py: 2, px:1 }}
      />
      <Button
        sx={{ width: "80%", padding: "10px", color: "white" }}
        variant="contained"
      >
        Login
      </Button>
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
