import { redirect } from "next/navigation";
import React from "react";

function Page() {
  redirect("/admin/dashboard");

  return <div>Page</div>;
}

export default Page;
