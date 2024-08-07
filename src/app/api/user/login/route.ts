import { hashPassword, verifyPassword } from "@/app/lib/utils";
import { UserType } from "@/components/singupForm";
import { prisma } from "@/db";

export const POST = async (req: Request) => {
  const body = (await req?.json()) as unknown as UserType;
  const originalPassword = body.password;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user)
      return new Response(
        JSON.stringify({
          status: "err",
          data: { message: "no user found with this email" },
        }),
        { status: 400 }
      );

    const isPasswordMatch = await verifyPassword(
      originalPassword,
      user.password
    );

    if (!isPasswordMatch)
      return new Response(
        JSON.stringify({
          status: "error",
          data: { message: "you password is not correct" },
        }),
        { status: 400 }
      );

    return new Response(
      JSON.stringify({
        status: "success",
        data: { message: "now you are logged" },
      })
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "error",
        data: { message: "internal server error" },
      }),
      { status: 500 }
    );
  }
};
