import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "next/link";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          backgroundColor: "#191D38",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
          color: "white",
        }}
      >
        <div>LOGO HRE</div>
      </div>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: "50%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100dvh",
        }}
        noValidate
        autoComplete="off"
      >
        {children}
      </Box>
    </div>
  );
}

export default AuthLayout;
