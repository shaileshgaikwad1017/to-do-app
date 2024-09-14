import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppointmentContract } from "../contracts/AppointmentContract";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { date } from "yup";

export function ToDoEditAppointment() {
  const [appointments, setAppointments] = useState<AppointmentContract[]>([
    {
      Appointment_Id: 0,
      Title: "",
      Description: "",
      Date: new Date(),
      UserId: "",
    },
  ]);
  const [cookies, setCookie, removeCookie] = useCookies(["Email"]);

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5252/get-appointment/${params.id}`)
      .then((response) => {
        setAppointments(response.data);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      Appointment_Id: appointments[0].Appointment_Id,
      Title: appointments[0].Title,
      Description: appointments[0].Description,
      Date: appointments[0].Date,
      UserId: cookies["Email"],
    },
    onSubmit: (appointment) => {
      axios
        .put(`http://127.0.0.1:5252/edit-appointment/${params.id}`, appointment)
        .then(() => {
          alert("Appointment Edited Successfully..");
          navigate("/user-dashboard");
        });
    },
    enableReinitialize: true,
  });
  return (
    <div className="d-flex justify-content-center">
      <form className="bg-light p-4 m-3 w-20" onSubmit={formik.handleSubmit}>
        <dl>
          <dt className="form-label">Appointment Id</dt>
          <dd>
            <TextField
              type="number"
              disabled
              onChange={formik.handleChange}
              value={formik.values.Appointment_Id}
              className="form-control"
              name="Appointment_Id"
              label="Appoointment Id"
              variant="outlined"
            ></TextField>
          </dd>
          <dt className="form-label">Title</dt>
          <dd>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.Title}
              className="form-control"
              variant="outlined"
              name="Title"
              label="Title"
            >
              Title
            </TextField>
          </dd>
          <dt className="form-label">Description</dt>
          <dd>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.Description}
              className="form-control"
              variant="outlined"
              name="Description"
              label="Description"
              multiline
              rows={5}
            />
          </dd>
          <dt className="form-label">Date</dt>
          <dd>
            <TextField
              type="date"
              name="Date"
              onChange={formik.handleChange}
              value={formik.values.Date}
              className="form-control"
            />
          </dd>
        </dl>
        <Button type="submit" variant="outlined" color="success">
          Save
        </Button>
        <Link to="/user-dashboard" className="ms-3">
          <Button variant="outlined" color="warning">
            Back
          </Button>
        </Link>
      </form>
    </div>
  );
}
