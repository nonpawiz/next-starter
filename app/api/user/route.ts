import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../connection";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
const salt = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    if (id == "0") {
      const user = {
        id: 0,
        name: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "",
      };
      return NextResponse.json(user);
    } else {
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

    if (data.register) {
      let hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;

      const register = { ...data };
      delete register.register;
      delete register.id;

      const results = await new Promise((resolve, reject) => {
        connection("users")
          .insert(register)
          .then((users: any) => {
            resolve({
              add: "success",
            });
          })
          .catch((error: any) => {
            reject(error);
          });
      });
      return NextResponse.json(results);
    }

    if (data.delete) {
      const results = await new Promise((resolve, reject) => {
        connection("users")
          .where({ id: data.id })
          .delete()
          .then((users: any) => {
            resolve({
              status: "success",
            });
          })
          .catch((error: any) => {
            reject(error);
          });
      });
      return NextResponse.json(results);
    }

    if (data.id === 0) {
      let hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;

      const results = await new Promise((resolve, reject) => {
        connection("users")
          .insert(data)
          .then((users: any) => {
            resolve({
              add: "success",
            });
          })
          .catch((error: any) => {
            reject(error);
          });
      });
      return NextResponse.json(results);
    } else {
      let hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
      const results = await new Promise((resolve, reject) => {
        connection("users")
          .where({ id: data.id })
          .update(data)
          .then((users: any) => {
            resolve({
              status: "success",
            });
          })
          .catch((error: any) => {
            reject(error);
          });
      });
      return NextResponse.json(results);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
