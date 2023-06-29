import React from "react";

function Loader() {
  return (
    <>
      <div className="w-100">
        <div className="p-2 d-flex align-items-center justify-content-center">
          <div
            className="spinner-border m-5 mx-1 text-main fs-25"
            style={{ width: "25px", height: "25px" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>กำลังโหลด</span>
        </div>
      </div>
    </>
  );
}

export default Loader;
