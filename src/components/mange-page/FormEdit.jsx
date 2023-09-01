import React, { useEffect, useState } from "react";

export default function FormEdit({
  idEdit,
  listStudent,
  handleCloseEdit,
  loadData,
}) {
  // Khai báo state
  const [student, setStudent] = useState({
    studentsName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  // Tìm kiếm thông tin sinh viên theo id được truyền từ component cha
  const findStudent = () => {
    const student = listStudent.find((st) => st.studentId === idEdit);
    setStudent(student);
  };

  useEffect(() => {
    findStudent();
  }, []);

  // Hàm lắng nghr và lấy dữ liệu từ các ô input
  const handleChange = (e) => {
    // Lấy value và name của từng ô input khi nhập
    // Cách 1:
    const name = e.target.name;
    const value = e.target.value;
    // Cách 2:
    // const { name, value } = e.target;
    // set state cho student
    setStudent({ ...student, [name]: value });
  };

  // Hàm cập nhật giá trị
  const handleSubmit = (e) => {
    // Ngăn chặn sự kiện mặc định của form
    e.preventDefault();
    // Tạo một bản sao mới của danh sách sinh viên để không ảnh hưởng đến danh sách gốc
    const updatedList = [...listStudent];

    // Tìm kiếm student theo index
    const studentIndex = updatedList.findIndex((st) => st.studentId === idEdit);

    // Nếu như index > -1 tức là tồn tại
    if (studentIndex !== -1) {
      // Tiến hành gán lại giá trị
      updatedList[studentIndex] = { ...updatedList[studentIndex], ...student };
    }

    // Lưu lại dữ liệu lên local
    localStorage.setItem("students", JSON.stringify(updatedList));
    // Đóng form
    handleCloseEdit();
    // Load lại dữ liệu
    loadData(updatedList);
  };
  return (
    <>
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Cập nhật sinh viên</h4>
                <button onClick={handleCloseEdit} type="button" className="close">
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Tên sinh viên</label>
                  <input
                    type="text"
                    value={student.studentsName}
                    className="form-control"
                    onChange={handleChange}
                    name="studentsName"
                    required=""
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    onChange={handleChange}
                    value={student.email}
                    name="email"
                    type="email"
                    className="form-control"
                    required=""
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <textarea
                    value={student.address}
                    className="form-control"
                    required=""
                    onChange={handleChange}
                    name="address"
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    onChange={handleChange}
                    name="phoneNumber"
                    value={student.phoneNumber}
                    type="text"
                    className="form-control"
                    required=""
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleCloseEdit} type="button" className="btn btn-default">
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}