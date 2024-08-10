import { getUser, verify } from "@/lib/utils";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const token = cookies().get("token");
  const user = await verify<User>(token?.value ?? "");

  const pathToRedirect = `/${user?.role ?? "user"}/dashboard`;

  if ((user && user.role === "admin") || user?.role === "owner") {
    redirect(pathToRedirect);
  }

  return <div></div>;
}

export default Page;
