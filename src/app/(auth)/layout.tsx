import { Box } from "@mui/material";

import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#191D38",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
          minWidth: "500px",
          color: "white",
        }}
      >
        <Image src="/Logo.png" alt="logo" width={300} height={200} />
      </Box>

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
    </Box>
  );
}

export default AuthLayout;
