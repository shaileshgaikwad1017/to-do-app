import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export function ToDoRegister() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    onSubmit: (user) => {
      axios.post(`http://127.0.0.1:5252/register-user`, user).then(() => {
        alert("Registration Successful...");
        navigate("/login");
      });
    },
  });

  return (
    <div className="d-flex justify-content-center">
      <form className="bg-light p-3 mt-4" onSubmit={formik.handleSubmit}>
        <h2 className="text-start">Register User</h2>
        <dl>
          {/* <dt className="form-label text-start">User Id</dt>
          <dd>
            <input
              type="text"
              placeholder="User Id"
              name="UserId"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd> */}
          <dt className="form-label text-start">User Name</dt>
          <dd>
            <input
              type="text"
              name="UserName"
              placeholder="User Name"
              onChange={formik.handleChange}
              className="form-control "
            />
          </dd>
          <dt className="form-label text-start">Password</dt>
          <dd>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dt className="text-start form-label">Email</dt>
          <dd>
            <input
              type="email"
              name="Email"
              placeholder="john_k@gmail.com"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dt className="text-start form-label">Mobile</dt>
          <dd>
            <input
              type="text"
              onChange={formik.handleChange}
              name="Mobile"
              placeholder="+91 9999999999"
              className="form-control"
            />
          </dd>
        </dl>
        <Button type="submit" className="w-100 fw-bold" variant="contained">
          Register
        </Button>
        <div className="text-center m-3">
          <Button variant="outlined" className="m-2">
            <Link to="/" className="mx-3">
              Home
            </Link>
          </Button>
          <Button variant="outlined" className="m-2">
            <Link to="/login">Already Have Account?</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
