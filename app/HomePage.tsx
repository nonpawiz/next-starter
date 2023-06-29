"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";

export default async function HomePage() {
  
  // console.log(status);
  // if (status === "authenticated") {
  //   return <p>Signed in as {session.user.name}</p>;
  // }
  // const session = await getServerSession(authOptions);
  useEffect(() => {
    // if (Cookies.get("login_msg") == "success")
    //   Swal.fire({
    //     title: "ลงทะเบียนสำเร็จ",
    //     // text: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง",
    //     icon: "success",
    //     confirmButtonText: "ตกลง",
    //     // showCancelButton: true,
    //     // cancelButtonText: "ยกเลิก",
    //     cancelButtonColor: "#DD6B55",
    //     confirmButtonColor: "#1F417C",
    //   });
  }, []);

  return (
    <>
      <div className="container py-5">
        <h1 className="text-center">HomePage</h1>
        {/* <button
          className="btn bg-main text-light"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          wow
        </button> */}
        {/* <button className="btn bg-main text-light" onClick={() => signIn()}>
          wow
        </button> */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
