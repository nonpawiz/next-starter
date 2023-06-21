// import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../connection";

// type Data = {
//   data: any[]
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (id == 0) {
    try {
      const results = await new Promise((resolve, reject) => {
        let data = req.body;
        res.status(200).json(data);
        connection("users")
          .insert(req.body)
          .then((users: any) => {
            resolve(users);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
      res.status(200).json({ redirect: "/auth/login" });
    } catch (error) {
      res.status(200).json(error);
    }
  } else {
    try {
      const results = await new Promise((resolve, reject) => {
        connection("users")
          .select()
          .where({ id: id })
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
}
