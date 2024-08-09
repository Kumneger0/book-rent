import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.json({
        status: "error",
        data: {
          message: "Unauthorized",
        },
      });
    }
    const response = NextResponse.json({
      status: "success",
      data: {
        message: "Logout successful",
      },
    });

    response.cookies.delete("token");

    return response;
  } catch (error) {
    User;
  }
};
