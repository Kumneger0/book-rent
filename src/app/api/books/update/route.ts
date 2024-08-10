import { prisma } from "@/db";
import { verify } from "@/lib/utils";
import { $Enums, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { defineAbilty } from "@/abilities";

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("token");
    const user = await verify<User>(token?.value ?? "");
    if (!user) {
      return NextResponse.json({
        status: "error",
        data: {
          message: "Unauthorized",
        },
      });
    }

    const userFromDB = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userFromDB) {
      return NextResponse.json({
        status: "error",
        data: {
          message: "User not found",
        },
      });
    }
    const ablity = defineAbilty(userFromDB);

    if (ablity.can("update", "Book")) {
      const { id, ...data } = (await req.json()) as {
        bookName: string;
        quantity: string;
        category: $Enums.Category;
        price: string;
        id: number;
      };
      const updatedBook = await prisma.book.update({
        where: {
          id: id,
        },
        data: {
          ...data,
          quantity: Number(data.quantity),
          price: Number(data.price),
        },
      });
      return NextResponse.json({
        status: "success",
        data: {
          message: "successfully uploaded",
          data: updatedBook,
        },
      });
    }
    return NextResponse.json({
      status: "error",
      data: {
        message: "you are no authorized to perform this action",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        status: "error",
        data: {
          message: "Book upload failed",
        },
      },
      { status: 500 }
    );
  }
}
