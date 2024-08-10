import { prisma } from "@/db";
import { LoginSchema, UserSchema } from "@/lib/utils";
import { Box } from "@mui/material";
import { $Enums } from "@prisma/client";
import { ComponentProps } from "react";
import { z } from "zod";

export type MUITypes = ComponentProps<typeof Box>["sx"];

export type APIResponse = {
  status: "success" | "error";
  data: { message: string };
};

export type UserType = z.infer<typeof UserSchema>;

export type UserTypeLOGIN = z.infer<typeof LoginSchema>;

export type BookType = Awaited<ReturnType<typeof prisma.book.findMany>>;

export interface BookTable extends Pick<BookType[number], never> {
  owner: {
    fullName: string;
  };
  id: number;
  isApproved: boolean;
}


export type EarningsSummaryChartProps = {
  monthes: string[];
  lastSixMontes: number[];
  samePeriodLastYear: number[];
};


export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
