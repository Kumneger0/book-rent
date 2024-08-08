import { LoginSchema, UserSchema } from "@/lib/utils";
import { Box } from "@mui/material";
import { ComponentProps } from "react";
import { z } from "zod";

export type MUITypes = ComponentProps<typeof Box>["sx"];

export type APIResponse = {
  status: "success" | "error";
  data: { message: string };
};

export type UserType = z.infer<typeof UserSchema>;

export type UserTypeLOGIN = z.infer<typeof LoginSchema>;
