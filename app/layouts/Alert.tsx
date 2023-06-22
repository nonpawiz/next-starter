"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Alert(props: any) {
  const [IsWelcome, setIsWelcome] = useState(false);

  useEffect(() => {
    if (Cookies.get("login_msg") === "success") {
      setIsWelcome(true);
    }
  }, []);

  return (
    <>
      <div>
        {IsWelcome ? (
          <>
            <div className="alert alert-success alert-dismissible fade show rounded-0">
              <i className="uil uil-user"></i> ยินดีต้อนรับ คุณ {props.data.name}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Alert;
