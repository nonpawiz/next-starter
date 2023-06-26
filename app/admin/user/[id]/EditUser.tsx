"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { InputChangeEventHandler } from "@/types/intefaces";

interface User {
  id?: number;
  name?: string | null | undefined;
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
  email?: string | null | undefined;
  password?: string | null | undefined;
  role?: string | null | undefined;
  created_at?: string | null | undefined;
}

interface InputNumber {
  id?: number;
  userId?: number;
}

interface InputString {
  name?: string | null | undefined;
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
  email?: string | null | undefined;
}

function EditUser(props: InputNumber) {
  const userId = props.userId;
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState(true);

  const id = useState<InputNumber>();
  const [name, setName] = useState<InputString>();
  const [firstname, setFirstname] = useState<InputString>();
  const [lastname, setLastname] = useState<InputString>();
  const email = useState();
  const role = useState();

  const handleName: InputChangeEventHandler = async (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const getUser = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${session?.user.id}`,
      },
    };
    try {
      await axios.get(`/api/user?id=${userId}`).then(({ data }) => {
        setUser(data);
        setName(data.name);
        // name.current = data.name;
        // setLoading(false);
        // console.log(data.id);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div>User : {userId}</div>
      <div>data : {user?.id ? <>{user.id}</> : <></>}</div>
      <div className="container py-5">
        <div className="card">
          <div className="card-body">
            <h3 className="text-main fw-normal">ข้อมูลผู้ใช้</h3>
            <div className="border-top"></div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="">
                      <span className="text-main fw-normal">
                        ชื่อ : {user?.firstname ? user.firstname : <></>}
                      </span>

                      <div className="form-floating mb-4">
                        <input
                          id="textInputExample"
                          type="text"
                          className="form-control"
                          placeholder="ชื่อ"
                          value={name ? name : ""}
                          onChange={handleName}
                          // onChange={(e) => {
                          //   setName(e.target.value);
                          //   console.log(name);
                          // }}
                        />
                        <label htmlFor="textInputExample">ชื่อ</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
