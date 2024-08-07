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
        <Typography sx={{ color: "black", marginTop: "30px" }}>
          Sign Up Into Book Rent
        </Typography>
      </Box>
      <Divider sx={{ width: "80%", marginBottom: "10px" }} />

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
        sx={{ color: "black", width: "80%", margin: "10px, 0", py: 2, px: 1 }}
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
