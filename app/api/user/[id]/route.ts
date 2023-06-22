import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../../connection";
import { NextRequest, NextResponse } from "next/server";

// type Data = {
//   data: any[]
// }

export async function GET({ params }: { params: { id: string } }) {
  const id = params.id;
  const res = [
    {
      id: id,
      name: "jeans",
    },
  ];
  // const data = await res.json();
  return NextResponse.json({ res });
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  res.status(200).json(id);
  try {
    // const secret = process.env.NEXTAUTH_SECRET;
    // const token = await getToken({ req, secret });
    // if (token) {
    //   res.status(200).json(token);
    //   // ...
    // }
    const results = await new Promise((resolve, reject) => {
      connection("users")
        .select()
        .orderBy("id", "asc")
        .then((users: any) => {
          resolve(users);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(200).json(error);
  }
}
