import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
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
        <div style={{ display: "flex", gap: "3px", margin: "10px, 0px" }}>
          <span>LOGO</span>
          <div>Book Rent</div>
        </div>
        <div style={{ color: "black", marginTop: "10px" }}>
          Login into book rent
        </div>
      </Box>
      <hr style={{ width: "80%", height: "1px", backgroundColor: "black" }} />
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
        sx={{ color: "black", width: "80%", margin: "10px, 0" }}
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
