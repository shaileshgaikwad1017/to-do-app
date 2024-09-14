import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function AddAppointment() {
  let navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["Email"]);
  const formik = useFormik({
    initialValues: {
      Appointment_Id: 0,
      Title: "",
      Description: "",
      Date: "",
      UserName: cookies["Email"],
    },
    onSubmit: (appointment) => {
      axios
        .post(`http://127.0.0.1:5252/add-appointment`, appointment)
        .then(() => {
          alert(`Appointment Added...`);
          navigate("/user-dashboard");
        });
    },
  });

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <form
          className="bg-light p-4 mt-3 rounded-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="h5 mt-1 text-center text-info p-2 rounded-2">
            Add New Appointment
          </div>
          <dl>
            <dt className="text-start form-label">Appointment Id</dt>
            <dd>
              {/* <input type="text" className="form-control" name="Appointment_Id" /> */}
              <TextField
                onChange={formik.handleChange}
                name="Appointment_Id"
                label="Appoointment Id"
                variant="outlined"
              ></TextField>
            </dd>
            <dt className="form-label text-start ">Title</dt>
            <dd>
              {/* <input type="text" className="form-control" name="Title" /> */}
              <TextField
                variant="outlined"
                onChange={formik.handleChange}
                name="Title"
                label="Title"
              >
                Title
              </TextField>
            </dd>
            <dt className="form-label text-start">Description</dt>
            <dd>
              <TextField
                variant="outlined"
                onChange={formik.handleChange}
                name="Description"
                label="Description"
                multiline
                rows={5}
              />
            </dd>
            <dt className="text-start form-label">Date</dt>
            <dd>
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                type="date"
                name="Date"
              >
                Date
              </TextField>
            </dd>
          </dl>
          <Button type="submit" variant="outlined" className="form-control">
            Add Appointment
          </Button>
          <Link
          to="/user-dashboard"
          className="d-flex flex-column justify-content-center mt-3"
        >
          <Button variant="contained" className="">
            Back To Dashboard
          </Button>
        </Link>
        </form>
        
      </div>
    </div>
  );
}
