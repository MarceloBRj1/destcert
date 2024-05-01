import { NextResponse } from "next/server";

// localhost:3000/api/hello

export const GET = async (_request: Request) => {
  try {
    return NextResponse.json({
      id: 1234,
      message: "hello",
    });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
};
