import { VerifyUserJwt } from "@/lib/utils";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function Page() {
  // const token = cookies().get("token");
  // const user = VerifyUserJwt<User>(token?.value);

  // const pathToRedirect = `/${user?.role ?? "user"}/dashboard`;

  // if ((user && user.role === "admin") || user?.role === "owner") {
  //   redirect(pathToRedirect);
  // }

  return <div>home</div>;
}

export default Page;
