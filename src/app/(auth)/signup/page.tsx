import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
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
        }}
      >
        <div style={{ display: "flex", gap: "3px", margin: "10px, 0px" }}>
          <span>LOGO</span>
          <div>Book Rent</div>
        </div>
        <div style={{ color: "black", marginTop: "10px" }}>
          sign up into book rent
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
      <TextField
        id="outlined-confirm-password-input"
        label="Confirm Password"
        type="password"
        autoComplete="current-confirm-password"
        style={{ width: "80%" }}
      />
      <TextField
        id="outlined-location-input"
        label="Location"
        type="text"
        style={{ width: "80%" }}
      />
      <TextField
        id="outlined-phonenum-input"
        label="Phone Number"
        type="tel"
        style={{ width: "80%" }}
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="I accept terms and conditions"
        sx={{ color: "black", width: "80%", margin: "10px, 0" }}
      />
      <Button
        sx={{ width: "80%", padding: "10px", color: "white" }}
        variant="contained"
      >
        sign up
      </Button>
      <div style={{ marginTop: "10px", color: "black" }}>
        Already have an account{" "}
        <Link href={"/login"} style={{ color: "blue" }}>
          login
        </Link>
      </div>
    </>
  );
}

export default Signup;
