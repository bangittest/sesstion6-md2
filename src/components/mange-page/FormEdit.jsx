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
  const[error,setError]=useState({
    studentsName:"",
    email:"",
    phoneNumber:"",
  })

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


    //xoa thong bao loi khi nguoi dung cap nhat gia tri input
    setError({...error, [name]:""})
  };

  // Hàm cập nhật giá trị
  const handleSubmit = (e) => {
    // Ngăn chặn sự kiện mặc định của form
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
    const isEmail = listStudent.some((e) => e.email === student.email);
    if (isEmail) {
      newError.email = "Email đã tồn tại trong danh sách.";
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }



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
                  {error.studentsName && <div className="text-danger">{error.studentsName}</div>}
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
                  {error.email && <div className="text-danger">{error.email}</div>}
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
                  {error.phoneNumber && <div className="text-danger">{error.phoneNumber}</div>}
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