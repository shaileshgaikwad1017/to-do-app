import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoUserLogin() {
  const [cookies, setCookies, removeCookies] = useCookies(["Email"]);

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: (user) => {
      axios.get(`http://127.0.0.1:5252/users`).then((response) => {
        var client = response.data.find(
          (item: any) => item.Email === user.Email
        );
        if (client) {
          if (client.Password === user.Password) {
            setCookies("Email", client.Email);
            navigate("/user-dashboard");
          } else {
            alert(`User Id or Password is Incorrect`);
          }
        } else {
          alert(`User Not Found`);
        }
        console.log(client);
        //navigate('/userdashboard');
      });
    },
  });

  return (
    // <div className="d-flex justify-content-center text-start ">
    //     <form className="form-control w-25 mt-3" onSubmit={formik.handleSubmit}>
    //         <h3 className="display-6 text-center text-primary mb-3">User Login</h3>
    //         <dl>
    //             {/* <dt className="mt-4 form-label">Login Id</dt> */}
    //             <dd>
    //                 {/* <input type="email" name="Email" onChange={formik.handleChange} placeholder="Email" className="form-control" /> */}

    //                 <TextField variant="outlined" className="w-100 mt-3" name="Email" onChange={formik.handleChange} label="Email">Email</TextField>
    //             </dd>
    //             {/* <dt className="mt-3 form-label">Password</dt> */}
    //             <dd>
    //                 {/* <input type="password" name="Password" onChange={formik.handleChange} placeholder="Password" className="form-control" /> */}
    //                 <TextField variant="outlined" className="w-100 mt-3" type="password" name="Password" onChange={formik.handleChange} label="Password">Password</TextField>
    //             </dd>
    //         </dl>
    //         <Button type="submit" variant="outlined" className="text-center ms-4 mb-3 w-50">Login</Button>
    //         <Link to="/register"><Button variant="contained" className="ms-3 mb-3">New User</Button></Link>
    //     </form>
    // </div>

    <div className="conatiner justify-content-center text-start d-flex">
      <div className="row">
        <div className="col-12 bg-light text-dark m-3 border border-secondary rounded-4">
          <div className="h2 text-center rounded mt-4">User Login</div>
          <form onSubmit={formik.handleSubmit}>
            <dl>
              <dt className="form-label">User Name</dt>
              <dd>
                <input
                  type="email"
                  onChange={formik.handleChange}
                  placeholder="Email"
                  className="form-control"
                  name="Email"
                />
              </dd>
              <dt className="form-label">Password</dt>
              <dd>
                <input
                  type="password"
                  onChange={formik.handleChange}
                  placeholder="Password"
                  className="form-control"
                  name="Password"
                />
              </dd>
            </dl>
            <button type="submit" className="btn btn-info mb-2  w-100">
              Login
            </button>
          </form>
          <div className="d-flex justify-content-center mb-3 mt-2 p-3 bg-dark text-white rounded-2">
            <Link to="/" className="btn btn-primary ms-3 ms-4">
              Home
            </Link>
            <Link to="/register" className="btn btn-warning ms-3">
              New User Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
