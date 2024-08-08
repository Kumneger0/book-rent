"use client";
import { z } from "zod";

import React from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";
import { UserSchema } from "@/lib/utils";
import SignUpButton from "./formSubmitButon";

function SignUPForm() {
  const router = useRouter();
  const [zodError, setZodError] = React.useState<z.ZodError | string>();

  async function formAction(formData: FormData) {
    const formDataObj = Object.fromEntries(formData.entries());

    try {
      const user = UserSchema.parse(formDataObj);

      const response = await fetch("/api/user/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = (await response.json()) as {
        status: "success" | "error";
        data: { message: string };
      };

      if (data.status === "success") {
        toast.success(data.data.message);
        router.push("/login");
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setZodError(error);
        return;
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      {zodError && (
        <div style={{ padding: "10px", margin: "20px 0" }}>
          <div style={{ color: "red" }}>
            {typeof zodError !== "string" &&
              zodError.issues.map((issue) => (
                <div key={issue.path[0]}>{issue.message}</div>
              ))}
          </div>
        </div>
      )}
      <TextField
        id="outlined-full-name"
        label="Full Name"
        type="text"
        name="fullName"
        required
        style={{ width: "100%", marginTop: "10px" }}
      />

      <TextField
        id="outlined-email"
        label="Email"
        type="email"
        name="email"
        required
        style={{ width: "100%", marginTop: "10px" }}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        name="password"
        required
        autoComplete="current-password"
        style={{ width: "100%" }}
      />
      <TextField
        id="outlined-confirm-password-input"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        required
        autoComplete="current-confirm-password"
        style={{ width: "100%" }}
      />
      <TextField
        id="outlined-location-input"
        label="Location"
        type="text"
        name="location"
        required
        style={{ width: "100%" }}
      />
      <TextField
        id="outlined-phonenum-input"
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        required
        style={{ width: "100%" }}
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="I accept terms and conditions"
        sx={{ color: "black", width: "100%", margin: "10px, 0", py: 2, px: 1 }}
      />
      <SignUpButton formAction={formAction}>Sign Up</SignUpButton>
    </div>
  );
}

export default SignUPForm;


