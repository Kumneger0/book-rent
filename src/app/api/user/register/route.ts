import { hashPassword } from "@/app/lib/utils";
import { UserType } from "@/components/singupForm";
import { prisma } from "@/db";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = (await req?.json()) as unknown as UserType;

  const { confirmPassword, ...userData } = body;

  if (!userData)
    return new Response(
      JSON.stringify({
        status: "error",
        data: { message: "please fill out the form" },
      }),
      { status: 400 }
    );

  try {
    const originalPassword = userData.password;
    const hashedPassWord = await hashPassword(originalPassword);

    const user = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (user) {
      return new Response(
        JSON.stringify({
          status: "error",
          data: { message: "user already exists" },
        }),
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: { ...userData, password: hashedPassWord },
    });
    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          message: "user created successfully",
          user: user,
        },
      }),
      { status: 200 }
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
