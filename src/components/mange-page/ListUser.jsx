import React, { useState } from "react";
import Form from "./Form";
import FormEdit from "./FormEdit";

export default function ListUser() {
  const [show, setShow] = useState(false);
  const[showEdit,setShowEdit]=useState(false);
  const[idEdit,setIdEdit]=useState("")

  //lay danh sach tu localstogest
  const [listStudent, setListStudent] = useState(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    return students;
  });

  // hàm hiện form
  const handleShowForm = () => {
    setShow(true);
  };

  const handleCloseForm = () => {
    setShow(false);
  };

  //hàm ẩn form

  // hàm load dữ liệu
  const loadData = (newStudent) => {
    setListStudent(newStudent);
  };


  //ham xoa
  const handleDelete=(id)=>{
    if(!confirm("Are you sure you want to delete")){
      return
    }
    // B1. Lọc ra mảng mới có các student có id khác với id cần xóa
    const newListStudent=listStudent.filter((st)=>st.studentId !== id)
    localStorage.setItem("students",JSON.stringify(newListStudent))

    //load lai du lieu
    setListStudent(newListStudent);
  }
  //ham edit

  const handleShowEdit =(id)=>{
    //tao ra mot satate de luu tru id can cap nhat
    setShowEdit(true)
    setIdEdit(id)
  }

   // Hàm đóng form edit
   const handleCloseEdit = () => {
    setShowEdit(false);
  };


  return (
    //form add
    <>
      {show ? (
        <Form handleCloseForm={handleCloseForm} listStudent={listStudent} loadData={loadData} />
      ) : (
        <></>
      )}
      {/*
      *form edit
      */}
      {showEdit?(<FormEdit
          idEdit={idEdit}
          listStudent={listStudent}
          handleCloseEdit={handleCloseEdit}
          loadData={loadData}
        />):<></>}
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Quản lý <b>sinh viên</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href="#addEmployeeModal"
                    className="btn
                              btn-success"
                    data-toggle="modal"
                    onClick={handleShowForm}
                  >
                    <i className="material-icons"></i>
                    <span>Thêm mới sinh viên</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Tên sinh viên</th>
                  <th>Email</th>
                  <th>Địc chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                {listStudent.length === 0 ? (
                  <tr>
                    <td colSpan="5">Khong co du lieu</td>
                  </tr>
                ) : (
                  <>
                    {listStudent.map((st, index) => (
                      <tr key={index}>
                        <td>{st.studentsName}</td>
                        <td>{st.email}</td>
                        <td>{st.address}</td>
                        <td>{st.phoneNumber}</td>
                        <td>
                          <a
                          onClick={()=>handleShowEdit(st.studentId)}
                            href="#editEmployeeModal"
                            className="edit"
                            data-toggle="modal"
                          >
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              
                            </i>
                          </a>
                          <a
                          onClick={()=>handleDelete(st.studentId)}
                            href="#deleteEmployeeModal"
                            className="delete"
                            data-toggle="modal"
                          >
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="Delete"
                            >
                              
                            </i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
