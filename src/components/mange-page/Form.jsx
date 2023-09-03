import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Form(props) {
  const handleCloseForm = props.handleCloseForm;
  const listStudent = props.listStudent;
  const loadData = props.loadData;

  //dong form
  function handleClose() {
    handleCloseForm();
  }

  // khai bao state
  const [student, setStudent] = useState({
    studentsName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [error, setError] = useState({
    studentsName: "",
    email: "",
    phoneNumber: "",
  });

  //ham lang nghe tu cac o input

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // const{name,value}=e.target
    // console.log(name,value);
    setStudent({ ...student, [name]: value });

    setError({ ...error, [name]: "" });
  };

  //ham submit lay dl form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra giá trị của các ô input
    const newError = {};
    if (!student.studentsName) {
      newError.studentsName = "Vui lòng nhập tên sinh viên.";
    }
    if (!student.email) {
      newError.email = "Vui lòng nhập địa chỉ email.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(student.email)) {
        newError.email = "Địa chỉ email không hợp lệ.";
      }
    }
    if (!student.phoneNumber) {
      newError.phoneNumber = "Vui lòng nhập số điện thoại.";
    } else {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(student.phoneNumber)) {
        newError.phoneNumber = "Số điện thoại không hợp lệ.";
      }
    }

    // Kiểm tra email có trùng lặp trong danh sách hiện tại không
    const isEmail = listStudent.some(
      (e) => e.email === student.email
    );
    if (isEmail) {
      newError.email = "Email đã tồn tại trong danh sách.";
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    //tao doi tuong student moi
    const newStudent = { ...student, studentId: uuid() };

    //bao luu cac gia tri trong mang cu va them mang moi
    const newListStudent = [...listStudent, newStudent];

    // day len local stogest
    localStorage.setItem("students", JSON.stringify(newListStudent));
    //dong form
    handleClose();
    alert("them thanh cong");

    loadData(newListStudent);
  };

  return (
    <>
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Thêm mới sinh viên</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={handleClose}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Tên sinh viên</label>
                  <input
                    name="studentsName"
                    onChange={handleOnChange}
                    type="text"
                    className="form-control"
                    required=""
                  />
                  {error.studentsName && (
                    <div className="text-danger">{error.studentsName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    onChange={handleOnChange}
                    type="email"
                    className="form-control"
                    required=""
                  />
                  {error.email && (
                    <div className="text-danger">{error.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <textarea
                    onChange={handleOnChange}
                    name="address"
                    className="form-control"
                    required=""
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    onChange={handleOnChange}
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    required=""
                  />
                  {error.phoneNumber && (
                    <div className="text-danger">{error.phoneNumber}</div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Cancel"
                  onClick={handleClose}
                />
                <input
                  type="submit"
                  className="btn btn-success"
                  defaultValue="Add"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
