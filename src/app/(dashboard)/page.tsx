import { getUser } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const token = cookies().get("token");

  const user = (await getUser(token?.value))!;
  const pathToRedirect = `/${user?.role ?? "user"}/dashboard`;

  redirect(pathToRedirect);

  return <div>Page</div>;
}

export default Page;
