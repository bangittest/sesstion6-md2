import React, { useState } from "react";
import { v4 as uuid } from "uuid";


export default function Form(props) {
    const handleCloseForm=props.handleCloseForm
    const listStudent=props.listStudent
    const loadData=props.loadData


    //dong form
    function handleClose() {
    handleCloseForm();
  }

    // khai bao state 
    const [student,setStudent]=useState({
      studentsName:"",
      email:"",
      address:"",
      phoneNumber:""
    })

    //ham lang nghe tu cac o input 

    const handleOnChange=(e)=>{
      const name=e.target.name
      const value=e.target.value
      // const{name,value}=e.target
      // console.log(name,value);
      setStudent({...student,[name]:value})

    }

    //ham submit lay dl form
    const handleSubmit = (e) => {
      e.preventDefault();

      //tao doi tuong student moi
      const newStudent={...student,studentId: uuid()}

      //bao luu cac gia tri trong mang cu va them mang moi
      const newListStudent=[...listStudent,newStudent]

      // day len local stogest
      localStorage.setItem("students",JSON.stringify(newListStudent))
      //dong form
      handleClose()

      loadData(newListStudent)
    }
    
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
                  <input name="studentsName" onChange={handleOnChange} type="text" className="form-control" required="" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" onChange={handleOnChange} type="email" className="form-control" required="" />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <textarea onChange={handleOnChange} name="address"
                    className="form-control"
                    required=""
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input onChange={handleOnChange} name="phoneNumber" type="text" className="form-control" required="" />
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
