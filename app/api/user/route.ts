import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const User = await new Promise((resolve, reject) => {
        connection("users")
          .select()
          .where({ id: id })
          .first()
          .then((users: any) => {
            resolve(users);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
      return NextResponse.json(User);
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    try {
      const AllUser = await new Promise((resolve, reject) => {
        connection("users")
          .select()
          .then((users: any) => {
            resolve(users);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
      return NextResponse.json(AllUser);
    } catch (error) {
      return NextResponse.json(error);
    }
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const results = await new Promise((resolve, reject) => {
      connection("users")
        .insert(data)
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
