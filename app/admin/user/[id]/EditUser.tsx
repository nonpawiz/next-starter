"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { InputChangeEventHandler } from "@/types/intefaces";
import Loader from "@/app/Loader";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { log } from "console";

interface User {
  id?: number;
  name?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

interface InputNumber {
  id?: number;
  userId?: number;
}

function EditUser(props: InputNumber) {
  const userId = props.userId;
  const user_meta: User = {
    id: 0,
    name: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  };

  const { data: session } = useSession();
  const [user, setUser] = useState<User>(user_meta);
  const [isLoading, setLoading] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    let target = e.target as HTMLInputElement;
    const save = { ...user };
    delete save.created_at;
    delete save.updated_at;
    await axios.post("/api/user", save).then(({ data }) => {
      if (data.status === "success") {
        Swal.fire({
          title: "Successfully",
          text: "อัปเดตข้อมูลสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
          // showCancelButton: true,
          // cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DD6B55",
          confirmButtonColor: "#1F417C",
        });
        setDisabled(!false);
        setEdit(false);
      }
      if (data.add === "success") {
        Swal.fire({
          title: "Successfully",
          text: "เพิ่มผู้ใช้สำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
          // showCancelButton: true,
          // cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DD6B55",
          confirmButtonColor: "#1F417C",
        });
        setDisabled(!false);
        setEdit(false);
      }
    });
  }

  const handleChange: InputChangeEventHandler = async (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
    console.log(user);
  };

  const handleEdit = (status: boolean) => {
    setDisabled(!status);
    setEdit(status);
    if (status != true) {
      getUser();
    }
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
        setLoading(false);
        if (data.id == 0) {
          setDisabled(false);
          setEdit(true);
          document.getElementById("IsAdd")?.remove();
        }
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
      {!isLoading ? (
        <>
          <div className="container py-5">
            <div className="">
              <div className="">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <h3 className="text-main fw-normal mb-0">
                    {user.id == 0 ? <>เพิ่มสมาชิก</> : <>ข้อมูลสมาชิก</>}
                  </h3>
                  <div id="IsAdd">
                    {!isEdit ? (
                      <>
                        <button
                          className="text-main border-0 fw-normal bg-light"
                          onClick={() => handleEdit(true)}
                        >
                          <i className="uil uil-pen"></i>&ensp;แก้ไข
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-danger border-0 fw-normal bg-light"
                          onClick={() => handleEdit(false)}
                        >
                          <i className="uil uil-times"></i>&ensp;ยกเลิก
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="">
                      <div className="form-floating mb-4">
                        <input
                          id="name"
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="ชื่อผู้ใช้"
                          value={user.name}
                          onChange={handleChange}
                          disabled={isDisabled}
                        />
                        <label htmlFor="name">ชื่อผู้ใช้</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <div className="form-floating mb-4">
                        <input
                          id="firstname"
                          type="text"
                          name="firstname"
                          className="form-control"
                          placeholder="ชื่อ"
                          value={user.firstname}
                          onChange={handleChange}
                          disabled={isDisabled}
                        />
                        <label htmlFor="firstname">ชื่อ</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <div className="form-floating mb-4">
                        <input
                          id="lastname"
                          type="text"
                          name="lastname"
                          className="form-control"
                          placeholder="สกุล"
                          value={user.lastname}
                          onChange={handleChange}
                          disabled={isDisabled}
                        />
                        <label htmlFor="lastname">สกุล</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <div className="form-floating mb-4">
                        <input
                          id="email"
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="สกุล"
                          value={user.email}
                          onChange={handleChange}
                          disabled={isDisabled}
                        />
                        <label htmlFor="email">อีเมล</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <div className="form-floating mb-4">
                        <input
                          id="role"
                          type="text"
                          name="role"
                          className="form-control"
                          placeholder="สกุล"
                          value={user.role}
                          onChange={handleChange}
                          disabled={isDisabled}
                        />
                        <label htmlFor="role">Role</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="">
                      <div className="form-floating mb-4">
                        <input
                          id="password"
                          type="text"
                          name="password"
                          className="form-control"
                          placeholder="สกุล"
                          value={user.password}
                          onChange={handleChange}
                          disabled={isDisabled}
                        />
                        <label htmlFor="password">รหัสผ่าน</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-5 text-center">
              <div className="col-md-12 mb-5">
                <button
                  className="btn bg-main border-0 text-light fw-normal w-100"
                  onClick={handleSubmit}
                  disabled={isDisabled}
                >
                  บันทึก
                </button>
              </div>
              <div
                className="text-main fw-normal link hover cursor-pointer"
                onClick={() => router.back()}
              >
                ย้อนกลับ
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
}

export default EditUser;
