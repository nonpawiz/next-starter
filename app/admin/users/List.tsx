"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
// import { User } from "../../../../types/user";

interface ContextProviderProps {
  children: ReactNode;
}

const List = () => {
  const { data: session } = useSession();
//   const [users, setUsers] = useState<User>();
  const [isShow, setShow] = useState(false);

  const users = [
    {
      id: "1",
      firstname: "Minhaz",
      lastname: "Bit Bass Headphone",
      role: "03 Feb, 2021",
    },
  ];

//   const getUsers = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `bearer ${session?.user.id}`,
//       },
//     };
//     try {
//       await axios.get("/api/user/list").then(({ data }) => {
//         setUsers(data);
//         // console.log(data);
//       });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

  useEffect(() => {
    // console.log({ session });
    // getUsers();
    setShow(true);
  }, []);

  const colums = [
    { name: "id", label: "ลำดับ" },
    { name: "firstname", label: "ชื่อ" },
    { name: "lastname", label: "สกุล" },
    { name: "role", label: "ประเภท" },
    // {
    //   name: "status",
    //   label: "Status",
    //   options: {
    //     filter: true,
    //     customBodyRender: (value) => {
    //       return (
    //         <div className="px-5">
    //           {/* <span className="badge bg-danger p-1">{value}</span> */}
    //           <span className="badge bg-danger p-1">New</span>
    //           {/* <span>งานใหม่</span> */}
    //         </div>
    //       );
    //     },
    //   },
    // },
    // { name: "method", label: "Method" },
    // { name: "total", label: "Total" },
  ];

  const customTextLabels = {
    body: {
      noMatch: "ไม่พบข้อมูล",
      toolTip: "จัดเรียง",
      columnHeaderTooltip: (column) => `จัดเรียงโดย ${column.label}`,
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
    selectableRows: "multiple",
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
    <div className="container-fluid py-4">
      {isShow ? (
        <>
          <MUIDataTable
            className="p-2"
            title={<h3 className="text-main fw-normal">รายชื่อผู้ใช้</h3>}
            data={users}
            columns={colums}
            options={options}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default List;
