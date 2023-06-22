import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../../connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await new Promise((resolve, reject) => {
      connection("users")
        .select()
        .then((users: any) => {
          resolve(users);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}
