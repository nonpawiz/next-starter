import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LoginBtn, LogOutBtn, LogOutBtnFooter } from "./Button";
import Alert from "./Alert";

async function Nav() {
  const session: any = await getServerSession(authOptions);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid py-0 flex-lg-row flex-nowrap">
          <div className="navbar-brand">
            <a href="/" className="nav-img-position">
              <Image
                // className="p-0"
                src="/nonpawiz.png"
                width={40}
                height={40}
                priority={true}
                // style={{
                //   width: "150px",
                //   marginTop: "0px",
                //   marginLeft: "-15px !important",
                // }}
                alt=""
              />
              <span
                className="text-main d-none d-lg-inline-block px-2"
                style={{ fontSize: "18px" }}
              >
                <span></span>
              </span>
            </a>
          </div>
          <div
            className="navbar-collapse offcanvas offcanvas-nav offcanvas-start"
            id="offcanvas"
          >
            <div className="offcanvas-header d-lg-none">
              <h3 className="text-white fs-20 underline-3 style-3 yellow mb-0 fw-normal">
                Nonpawiz
              </h3>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body ms-lg-auto d-flex flex-column h-100 pt-1">
              <ul className="navbar-nav">
                {session?.user ? (
                  <>
                    <div className="d-block d-md-none">
                      {/* {session?.user ? (<>{session.user.name}</>): (<></>)} */}
                      <a href="/">
                        <Image
                          className="rounded-circle rounded"
                          src="/nonpawiz.png"
                          priority={true}
                          alt=""
                          width={40}
                          height={40}
                          style={{
                            objectFit: "cover",
                            width: "40px",
                            height: "40px !important",
                          }}
                        />
                        <p className="d-inline-block d-lg-none fw-normal text-light px-3">
                          {session.user.name}
                        </p>
                        <div
                          className="d-block d-lg-none w-100"
                          style={{
                            borderBottom: "0.1px solid #ddd !important",
                          }}
                        />
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <LoginBtn />
                  </>
                )}

                {session?.user ? (
                  session?.user?.role == "admin" ? (
                    <>
                      <li className="nav-item">
                        <a className="nav-link fw-normal" href="/">
                          <i className="fa fa-home" /> หน้าแรก
                        </a>
                      </li>
                      <li className="nav-item dropdown dropdown-mega">
                        <a
                          className="nav-link dropdown-toggle fw-normal"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fa fa-user" /> Admin
                        </a>
                        <ul className="dropdown-menu mega-menu" id="mynav">
                          <li
                            className="mega-menu-content text-start p-1"
                            style={{ background: "rgba(255,255,255, 0.5)" }}
                          >
                            <div className="row gx-0 gx-lg-1 p-1 ">
                              <div className="col-lg">
                                <ul className="list-unstyled m-0">
                                  <li className="nav-item fw-normal">
                                    <a
                                      className="dropdown-item fw-normal"
                                      href="/admin/users"
                                    >
                                      รายชื่อผู้ใช้
                                    </a>
                                  </li>
                                  <li className="nav-item fw-normal">
                                    <a
                                      className="dropdown-item fw-normal"
                                      href="http://128.199.159.183/track/public/resetpassword"
                                    >
                                      ตั้งรหัสผ่านใหม่
                                    </a>
                                  </li>
                                  <LogOutBtn />
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <a className="nav-link fw-normal" href="/">
                          <i className="fa fa-home" /> หน้าแรก
                        </a>
                      </li>
                      <li className="nav-item dropdown dropdown-mega">
                        <a
                          className="nav-link dropdown-toggle fw-normal"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fa fa-user" /> {session.user.name}
                        </a>
                        <ul className="dropdown-menu mega-menu" id="mynav">
                          <li
                            className="mega-menu-content text-start p-1"
                            style={{ background: "rgba(255,255,255, 0.5)" }}
                          >
                            <div className="row gx-0 gx-lg-1 p-1 ">
                              <div className="col-lg">
                                <ul className="list-unstyled m-0">
                                  <li className="nav-item fw-normal">
                                    <a
                                      className="dropdown-item fw-normal"
                                      href=""
                                    >
                                      โปรไฟล์ของฉัน
                                    </a>
                                  </li>
                                  <LogOutBtn />
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </>
                  )
                ) : (
                  <></>
                )}
              </ul>
              {session?.user ? <LogOutBtnFooter /> : <></>}
            </div>
          </div>
          <div className="navbar-other d-flex ms-auto">
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              <li className="nav-item d-lg-none">
                <button
                  className="hamburger offcanvas-nav-btn"
                  data-bs-toggle="offcanvas"
                  href="#offcanvas"
                >
                  <span />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ borderTop: "1px solid #ddd" }} />
      <Alert data={{ name: session?.user.name }} />
    </>
  );
}

export default Nav;
