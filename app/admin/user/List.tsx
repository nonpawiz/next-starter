"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Link from "next/link";
import Loader from "@/app/Loader";
import Swal from "sweetalert2";

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

interface setDelete {
  id: string | number;
  firstname: string;
  lastname: string;
}
const List = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User>();
  const [isLoading, setLoading] = useState(true);
  // const users = [
  //   {
  //     id: "1",
  //     firstname: "Minhaz",
  //     lastname: "Bit Bass Headphone",
  //     role: "03 Feb, 2021",
  //   },
  // ];

  const DeleteUser = (data: setDelete) => {
    Swal.fire({
      title: "ลบบ่อ้าย?",
      text: `ต้องการลบ ${data.firstname} ${data.lastname} หรือไม่?`,
      icon: "warning",
      confirmButtonText: "ตกลง",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#1F417C",
    }).then(function (isConfirm) {
      if (isConfirm.value == true) {
        DeleteIt(data);
      }
    });
  };

  const DeleteIt = async (data: setDelete) => {
    await axios.post("/api/user", data).then(({ data }) => {
      if (data.status === "success") {
        Swal.fire({
          title: "Successfully",
          text: "ลบผู้ใช้สำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
          // showCancelButton: true,
          // cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DD6B55",
          confirmButtonColor: "#1F417C",
        });
        getUsers();
      } else {
        Swal.fire({
          title: "ขออภัย",
          text: "ลบไม่สำเร็จ โปรดลองอีกครั้ง",
          icon: "error",
          confirmButtonText: "ตกลง",
          // showCancelButton: true,
          // cancelButtonText: "ยกเลิก",
          cancelButtonColor: "#DD6B55",
          confirmButtonColor: "#1F417C",
        });
      }
    });
  };

  const getUsers = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${session?.user.id}`,
      },
    };
    try {
      await axios.get("/api/user").then(({ data }) => {
        setUsers(data);
        setLoading(false);
        // console.log(data);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // console.log({ session });
    getUsers();
  }, []);

  const colums = [
    {
      name: "id",
      label: "ลำดับ",
      options: {
        customBodyRender: (value: any, tableMeta: any) => (
          <>{tableMeta.rowIndex + 1}</>
        ),
      },
    },
    { name: "firstname", label: "ชื่อ" },
    { name: "lastname", label: "สกุล" },
    {
      name: "role",
      label: "ประเภท",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const rowData = tableMeta.rowData;
          const role = rowData[3];
          return role == "admin" ? (
            <>
              <div className="px-5">
                <span className="badge border fw-normal text-dark p-1">
                  Admin
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="px-5">
                <span className="badge border fw-normal text-success p-1">
                  User
                </span>
              </div>
            </>
          );
        },
        setCellProps: () => ({
          style: {
            width: "15%", // Set the width of the last column
          },
        }),
      },
    },
    {
      name: "status",
      label: "จัดการ",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const rowData = tableMeta.rowData;
          const id = rowData[0];
          // const _firstname = rowData[1];
          // const _lastname = rowData[1];
          const setDelete = {
            id: rowData[0],
            firstname: rowData[1],
            lastname: rowData[2],
            delete: true,
          };
          // console.log("id = "+ id);
          return (
            <>
              <div className="d-flex">
                <Link
                  href={"/admin/user/" + parseInt(id)}
                  className="btn btn-circle bg-info text-light border-0 fw-normal mx-1"
                >
                  <i className="uil uil-eye fs-18"></i>
                </Link>
                {/* <Link
                  href=""
                  className="btn btn-circle bg-success text-light border-0 fw-normal mx-1"
                >
                  <i className="uil uil-pen fs-18"></i>
                </Link> */}
                <button
                  onClick={() => DeleteUser(setDelete)}
                  className="btn btn-circle bg-danger text-light border-0 fw-normal mx-1"
                >
                  <i className="uil uil-trash-alt fs-18"></i>
                </button>
              </div>
            </>
          );
        },
        setCellProps: () => ({
          style: {
            width: "15%",
          },
        }),
      },
    },
  ];

  const customTextLabels = {
    body: {
      noMatch: "ไม่พบข้อมูล",
      toolTip: "จัดเรียง",
      columnHeaderTooltip: (column: any) => `จัดเรียงโดย ${column.label}`,
    },
    pagination: {
      next: "ถัดไป",
      previous: "ก่อนหน้า",
      rowsPerPage: "แสดงจำนวนแถว :",
      displayRows: "จาก",
    },
    toolbar: {
      search: "ค้นหา",
      downloadCsv: "ดาวน์โหลด CSV",
      print: "ปริ้นท์",
      viewColumns: "แสดงคอลัมน์",
      filterTable: "ฟิลเตอร์",
    },
    selectedRows: {
      text: "เลือกแล้ว", // Edit the selected rows text here
      delete: "Delete",
      deleteAria: "Delete Selected Rows",
    },
    filter: {
      all: "ทั้งหมด",
      title: "ฟิลเตอร์",
      reset: "รีเซ็ต",
    },
    textLabels: {
      body: {
        noMatch: (
          <>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ),
      },
    },
    setTableProps: () => {
      return {
        style: {
          fontSize: "14px", // Set the desired font size for the filter table
        },
      };
    },
  };

  const options = {
    search: true,
    searchOpen: false,
    filter: true,
    print: false,
    download: false,
    textLabels: customTextLabels,
    responsive: "standard",
    fixedHeader: false,
    fixedSelectColumn: false,
    rowHover: false,

    filterType: "dropdown",
    selectableRows: "none",
  };

  return (
    <div className="container my-5">
      {!isLoading ? (
        <>
          <MUIDataTable
            style={{ boxShadow: "0 !important" }}
            className="p-2 rounded border-0"
            title={
              <>
                <div className="d-flex align-items-center">
                  <h3 className="text-main fw-normal mb-0">สมาชิก</h3>
                  <div>
                    <Link
                      href="/admin/user/0"
                      className="btn btn-sm bg-success text-light border-0 fw-normal mx-2 p-1"
                    >
                      + เพิ่มสมาชิก
                    </Link>
                  </div>
                </div>
              </>
            }
            data={users}
            columns={colums}
            options={options}
          />
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default List;
