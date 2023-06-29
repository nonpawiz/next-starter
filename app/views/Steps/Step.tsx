"use client";
import React, { useState, useRef } from "react";
import { Stepper } from "react-form-stepper";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { InputChangeEventHandler } from "@/types/intefaces";

interface DataItem {
  step_id: number;
  data: string;
}

const Step = () => {
  const setData_: DataItem[] = [
    {
      step_id: 1,
      data: "",
    },
    {
      step_id: 2,
      data: "",
    },
    {
      step_id: 3,
      data: "",
    },
  ];

  const [active, setActive] = useState<number>(0);
  const set_name = useRef<string>("");
  const [data, setData] = useState<DataItem[]>(setData_);
  const [IsDisabled, setIsDisabled] = useState<boolean>(true);

  const steps = [
    { label: "ลงทะเบียน" },
    { label: "ชำระเงิน" },
    { label: "เสร็จสิ้น" },
  ];

  const down = () => {
    if (active >= 1) {
      setActive(active - 1);
      SetPage();
    }
  };

  const up = () => {
    if (active < 2) {
      setActive(active + 1);
      SetPage();
    }
  };

  const handleChange: InputChangeEventHandler = async (e) => {
    let step = e.target.name;
    if (step == "step1") {
      let item = {
        value: e.target.value,
      };
      setData({ ...data, [e.target.name]: e.target.value });
      set_name.current = e.target.value;
    }
  };

  const updateData = (stepId: number, newData: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.step_id === stepId ? { ...item, data: newData } : item
      )
    );
    set_name.current = newData;
  };

  const Step1 = () => {
    return (
      <>
        <div className="card mb-3" style={{ height: "25vh" }}>
          <div className="card-body">
            <div className="form-floating mb-4">
              <input
                value={data[0].data}
                onChange={(e) => updateData(1, e.target.value)}
                type="text"
                name="step1"
                className="form-control"
                placeholder="name"
                required
              />
              <label>ชื่อผู้ใช้</label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const SetPage = () => {
    switch (active) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      default:
        return null;
    }
  };

  const checkSetPage = () => {
    console.log(set_name.current);

    try {
      if (set_name.current != "") {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } catch {}
  };

  return (
    <>
      <div className="container">
        <Stepper steps={steps} activeStep={active} />
        <div className="container">
          {/* {SetPage()} */}

          {active == 0 ? (
            <div className="card mb-3" style={{ height: "50vh" }}>
              <div className="card-body">
                <h5 className="fs-18 fw-normal">ข้อมูล</h5>
                <div className="form-floating mb-4">
                  <input
                    value={data[0].data}
                    onChange={(e) => {
                      updateData(1, e.target.value);
                      checkSetPage();
                    }}
                    type="text"
                    className="form-control"
                    placeholder="name"
                    required
                  />
                  <label>ชื่อผู้ใช้</label>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {active == 1 ? (
            <div className="card mb-3" style={{ height: "50vh" }}>
              <div className="card-body">
                <h5 className="fs-18 fw-normal">ชำระเงิน</h5>
              </div>
            </div>
          ) : (
            <></>
          )}

          {active == 2 ? (
            <div className="card mb-3" style={{ height: "50vh" }}>
              <div className="card-body">
                <h5 className="fs-18 fw-normal">เสร็จสิ้น</h5>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="d-flex justify-content-between">
            {active > 0 ? (
              <>
                <button
                  className="btn bg-main fw-normal border-0 text-light"
                  onClick={() => down()}
                >
                  ก่อนหน้า
                </button>
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
            {active < 2 ? (
              <>
                <button
                  disabled={IsDisabled}
                  className="btn bg-main fw-normal border-0 text-light"
                  onClick={() => up()}
                >
                  ถัดไป
                </button>
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Step;
