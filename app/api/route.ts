import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const checkUrl = async (endpoint = "") => {
  try {
    const response = await axios.head(`http://did.li/${endpoint}`, {
      maxRedirects: 7,
    });
    return response.request.res.responseUrl;
  } catch (error) {
    throw error;
  }
};

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  if (!path) {
    return NextResponse.json(
      { result: "Invalid path parameter" },
      { status: 400 }
    );
  }
  if (typeof path === "string") {
    try {
      const result = await checkUrl(path);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        return NextResponse.json(
          { result: "Link doesn't exist" },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { result: "Server error" },
          { status: 500 }
        );
      }
    }
  } else {
    return NextResponse.json({ result: "Invalid path parameter" }, { status: 400 });
  }
}
