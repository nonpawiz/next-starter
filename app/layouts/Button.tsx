"use client";
import { signIn, signOut } from "next-auth/react";

export function LoginBtn() {
  return (
    <>
      <div className="">
        <li className="nav-item">
          <div
            className="nav-link fw-normal cursor-pointer"
            onClick={() => signIn()}
          >
            <i className="fa fa-home" /> เข้าสู่ระบบ
          </div>
        </li>
      </div>
    </>
  );
}

export function LogOutBtn() {
  return (
    <>
      <div className="">
        <li className="nav-item fw-normal border-top">
          <div
            className="dropdown-item fw-normal cursor-pointer"
            onClick={() =>
              signOut({
                callbackUrl: "/auth/login",
              })
            }
          >
            ออกจากระบบ
          </div>
        </li>
      </div>
    </>
  );
}

export function LogOutBtnFooter() {
  return (
    <>
      <div className="offcanvas-footer flex-column d-block d-md-none cursor-pointer">
        <div
          className="nav-item fw-normal py-3 text-light"
          onClick={() =>
            signOut({
              callbackUrl: "/auth/login",
            })
          }
        >
          <i className="uil uil-signin" /> ออกจากระบบ
        </div>
      </div>
    </>
  );
}
