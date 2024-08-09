import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const json = (await req.json()) as { id: number };
    const token = req.cookies.get("token");
    //TODO: check for authorization

    const deleteBook = await prisma.book.delete({
      where: {
        id: json.id,
      },
    });
    return NextResponse.json({
      status: "success",
      data: {
        message: "the book has been deleted successfully",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: "error",
      data: {
        message: "internal server error",
      },
    });
  }
};
