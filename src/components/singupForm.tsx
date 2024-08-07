"use client";
import { z } from "zod";

import toast, { Toaster } from "react-hot-toast";

const UserSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    location: z.string(),
    phoneNumber: z.string(),
    role: z.enum(["user", "admin", "owner"]).optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type UserType = z.infer<typeof UserSchema>;

import React from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

function SignUPForm() {
  const router = useRouter();
  async function formAction(formData: FormData) {
    const formDataObj = Object.fromEntries(formData.entries());
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

    console.log(data);
  }

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <TextField
        id="outlined-full-name"
        label="Full Name"
        type="text"
        name="fullName"
        style={{ width: "100%", marginTop: "10px" }}
      />
      <TextField
        id="outlined-email"
        label="Email"
        type="email"
        name="email"
        style={{ width: "100%", marginTop: "10px" }}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        style={{ width: "100%" }}
      />
      <TextField
        id="outlined-confirm-password-input"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        autoComplete="current-confirm-password"
        style={{ width: "100%" }}
      />
      <TextField
        id="outlined-location-input"
        label="Location"
        type="text"
        name="location"
        style={{ width: "100%" }}
      />
      <TextField
        id="outlined-phonenum-input"
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        style={{ width: "100%" }}
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="I accept terms and conditions"
        sx={{ color: "black", width: "100%", margin: "10px, 0", py: 2, px: 1 }}
      />
      <SignUpButton formAction={formAction} />
    </div>
  );
}

export default SignUPForm;

function SignUpButton({
  formAction,
}: {
  formAction: (formData: FormData) => void;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      formAction={formAction}
      type="submit"
      disabled={pending}
      sx={{ width: "100%", padding: "10px", color: "white" }}
      variant="contained"
    >
      {pending ? "wait..." : "Sign Up"}
    </Button>
  );
}
