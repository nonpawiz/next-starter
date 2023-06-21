"use client";
import { signIn } from "next-auth/react";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";
import Cookies from 'js-cookie';

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const userName = useRef("");
  const pass = useRef("");
  const [isDisabled, setIsDisabled] = useState(true);

  const getUser = (e) => {
    userName.current = e.target.value;
    AllowBtn();
  };
  const getPassword = (e) => {
    pass.current = e.target.value;
    AllowBtn();
  };

  const AllowBtn = () => {
    if (userName.current != "" && pass.current != "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    if (searchParams) {
      if (Cookies.get('register_msg') == "success")
        Swal.fire({
          title: "ลงทะเบียนสำเร็จ",
          // text: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง",
          icon: "success",
          confirmButtonText: "ตกลง",
          // showCancelButton: true,
          // cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DD6B55",
          confirmButtonColor: "#1F417C",
        });
      if (searchParams.error == "CredentialsSignin")
        Swal.fire({
          title: "ขออภัย",
          text: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง",
          icon: "error",
          confirmButtonText: "ตกลง",
          // showCancelButton: true,
          // cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DD6B55",
          confirmButtonColor: "#1F417C",
        });
    }
  }, []);
  return (
    <div
      className="d-flex align-items-center wrapper bg-gradient-primary"
      style={{ height: "90vh" }}
    >
      <div className="container w-100">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="mb-4 card">
              <div className="card-body">
                <div className="contact-form">
                  {/* <div className="p-0 text-center">
                    <Image
                      className="rounded-circle rounded mb-4"
                      src="/nonpawiz.png"
                      alt=""
                      width={60}
                      height={60}
                      // style={{
                      //   objectFit: "cover",
                      //   width: "40px",
                      //   height: "40px !important",
                      // }}
                    />
                  </div> */}
                  <div className="text-center mb-4">
                    <h4 className="mb-0 fw-normal my-0 text-main">
                      เข้าสู่ระบบ
                    </h4>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      // onChange={(e) => (userName.current = e.target.value)}
                      onChange={(e) => {
                        userName.current = e.target.value;
                        AllowBtn();
                      }}
                      id="username"
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="username"
                      required
                    />
                    <label>ชื่อผู้ใช้</label>
                  </div>
                  <div className="form-floating password-field mb-4">
                    <input
                      // onChange={(e) => (pass.current = e.target.value)}
                      onChange={(e) => {
                        pass.current = e.target.value;
                        AllowBtn();
                      }}
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
                    className="btn bg-main text-light border-0 w-100 fw-normal fs-16 mb-2"
                    onClick={onSubmit}
                    disabled={isDisabled}
                  >
                    เข้าสู่ระบบ
                  </button>
                  <div className="text-center mb-3">
                    {/* <span className="">ยังไม่มีบัญชีใช่หรือไม่? </span> */}
                    <Link href="/auth/register" className="link hover">ลงทะเบียน</Link>
                  </div>
                  {/* <p class="mb-0 text-center"><a href="#" data-bs-target="#modal-signup" data-bs-toggle="modal" class="hover">ลงทะเบียน</a></p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
