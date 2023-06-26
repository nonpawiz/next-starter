"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Link from "next/link";

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
    { name: "id", label: "ลำดับ" },
    { name: "firstname", label: "ชื่อ" },
    { name: "lastname", label: "สกุล" },
    { name: "role", label: "ประเภท" },
    {
      name: "status",
      label: "จัดการ",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const rowData = tableMeta.rowData;
          const id = rowData[0];
          // console.log("id = "+ id);

          return (
            <>
              <div className="d-flex">
                <Link
                  href={"/admin/user/" + parseInt(id)}
                  className="btn bg-info text-light border-0 fw-normal p-1 px-3 m-1"
                >
                  <i className="uil uil-eye fs-18"></i>
                </Link>
                <Link
                  href=""
                  className="btn bg-success text-light border-0 fw-normal p-1 px-3 m-1"
                >
                  <i className="uil uil-pen fs-18"></i>
                </Link>
                <Link
                  href=""
                  className="btn bg-danger text-light border-0 fw-normal p-1 px-3 m-1"
                >
                  <i className="uil uil-trash-alt fs-18"></i>
                </Link>
              </div>
            </>
            // <div className="px-5">
            //   {/* <span className="badge bg-danger p-1">{value}</span> */}
            //   <span className="badge bg-danger p-1">New</span>
            //   {/* <span>งานใหม่</span> */}
            // </div>
          );
        },
        setCellProps: () => ({
          style: {
            width: "15%", // Set the width of the last column
          },
        }),
      },
    },
    // { name: "method", label: "Method" },
    // { name: "total", label: "Total" },
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

  // const [selectedRows, setSelectedRows] = useState([]);

  // const handleRowSelection = (currentRowsSelected, allRowsSelected) => {
  //   // console.log("Row Selected: ", currentRowsSelected);
  //   // console.log("All Selected: ", allRowsSelected);

  //   // setSelectedRows(allRowsSelected);
  //   const get = allRowsSelected.map((index) => ({
  //     id: index.dataIndex,
  //     // rowId: data[index.dataIndex].orderNo,
  //   }));
  //   console.log(get);
  // };

  // const handleSelected = () => {
  //   // const selectedIds = selectedRows.map(index => index.id);
  //   console.log(selectedRows);
  //   // Perform your action using the selected IDs
  // };

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
    // onRowSelectionChange: handleRowSelection,
    // selectableRowsHideCheckboxes: true,
    // selectableRowsOnClick: true,
    // customBodyRender: () => null,
    // sr
  };

  // const [users, setUsers] = useState<User>();

  // const fetchUserProfile = async () => {
  //   console.log({session});

  //   const res = await fetch(`/user/${session?.user.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${session?.user.id}`,
  //     },
  //   });
  //   const data = await res.json();
  //   setUserData(data);
  // };

  return (
    <div className="container py-4">
      {!isLoading ? (
        <>
          <MUIDataTable
            className="p-2 rounded"
            title={<h3 className="text-main fw-normal">รายชื่อผู้ใช้</h3>}
            data={users}
            columns={colums}
            options={options}
          />
        </>
      ) : (
        <>
          <div className="card w-100">
            <div className="p-2 d-flex align-items-center justify-content-center">
              <div className="spinner-border m-5 text-main" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
