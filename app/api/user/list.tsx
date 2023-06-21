// import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../connection";
import { getToken } from "next-auth/jwt";

// type Data = {
//   data: any[]
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
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
