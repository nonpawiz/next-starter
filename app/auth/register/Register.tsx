"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import { InputChangeEventHandler } from "@/types/intefaces";
import Swal from "sweetalert2";

function Register() {
  const [state, setState] = React.useState({
    name: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
  });

  // function handleChange(e: React.FormEvent<EventTarget>) {
  //   let target = e.target as HTMLInputElement;
  //   if (target.files) {
  //     setState({ ...state, [target.name]: target.files[0] });
  //   } else {
  //     setState({ ...state, [target.name]: target.value });
  //   }
  //   console.log(state);
  // }

  const handleChange: InputChangeEventHandler = async (e) => {
    if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
    console.log(state);
  };

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    let target = e.target as HTMLInputElement;
    await axios.post("/api/user/0", state).then(({ data }) => {
      console.log("success !!!!!");
      console.log(data);
      if (typeof data[0] === "number") {
        Cookies.set("register_msg", "success", { expires: 5 / (24 * 60 * 60) });
        window.location.href = "/auth/login";
      } else {
        Swal.fire({
          title: "ขออภัย",
          text: "ลงทะเบียนไม่สำเร็จ",
          icon: "error",
          confirmButtonText: "ตกลง",
          // showCancelButton: true,
          // cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DD6B55",
          confirmButtonColor: "#1F417C",
        });
      }

      // let redirect = data.redirect;
      // Cookies.set("register_msg", "success", { expires: 5 / (24 * 60 * 60) });
      // //   // Redirect used for reCAPTCHA and/or thank you page
      // window.location.href = redirect;
    });

    // return "wow !";
  }

  // const checkAPI = async () => {
  //   await axios.get("/api/user/0").then(({ data }) => {
  //     console.log("success !!!!!");
  //     console.log(data);
  //   });
  // };

  // useEffect(() => {
  //   checkAPI();
  // }, []);

  return (
    <div
      className="d-flex align-items-center wrapper bg-gradient-primary"
      style={{ height: "90vh" }}
    >
      <div className="container w-100">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="mb-4 card">
              <div className="card-body">
                <div className="contact-form">
                  <div className="text-center mb-4">
                    <h4 className="mb-0 fw-normal my-0 text-main">ลงทะเบียน</h4>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      onChange={handleChange}
                      id="name"
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="name"
                      required
                    />
                    <label>ชื่อผู้ใช้</label>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating mb-4">
                        <input
                          onChange={handleChange}
                          id="firstname"
                          type="text"
                          name="firstname"
                          className="form-control"
                          placeholder="firstname"
                          required
                        />
                        <label>ชื่อ</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-4">
                        <input
                          onChange={handleChange}
                          id="lastname"
                          type="text"
                          name="lastname"
                          className="form-control"
                          placeholder="lastname"
                          required
                        />
                        <label>สกุล</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      onChange={handleChange}
                      id="email"
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="email"
                      required
                    />
                    <label>อีเมล</label>
                  </div>

                  <div className="form-floating password-field mb-4">
                    <input
                      onChange={handleChange}
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="password"
                      required
                    />
                    <span className="password-toggle">
                      <i className="uil uil-eye" />
                    </span>
                    <label>รหัสผ่าน</label>
                  </div>
                  {/* <div class="btn bg-main text-light border-0 w-100 fw-normal fs-16 mb-4" onclick="$('#login_form').submit()">เข้าสู่ระบบ&nbsp;<i class="uil uil-sign-out-alt"></i></div> */}
                  <button
                    //   type="submit"
                    onClick={handleSubmit}
                    className="btn bg-main text-light border-0 w-100 fw-normal fs-16 mb-2"
                    //   disabled={true}
                  >
                    ลงทะเบียน
                  </button>
                  <div className="text-center fs-15">
                    <span className="px-1">มีบัญชีอยู่แล้ว?</span>
                    <a
                      className="text-main link hover cursor-pointer"
                      onClick={() => signIn()}
                    >
                      เข้าสู่ระบบ
                    </a>
                  </div>
                  <div className="text-center mb-3">
                    {/* <span className="">ยังไม่มีบัญชีใช่หรือไม่? </span> */}
                    {/* <Link href="/auth/register" className="link hover">
                        ลงทะเบียน
                      </Link> */}
                  </div>
                  {/* <p class="mb-0 text-center"><a href="#" data-bs-target="#modal-signup" data-bs-toggle="modal" class="hover">ลงทะเบียน</a></p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
