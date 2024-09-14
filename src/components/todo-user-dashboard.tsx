import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AppointmentContract } from "../contracts/AppointmentContract";
import axios from "axios";
import { response } from "express";
import {
  Delete,
  DeleteForever,
  EditTwoTone,
  ModeEdit,
} from "@mui/icons-material";

export function ToDoUserDashboard() {
  const [cookies, setCookies, removeCookies] = useCookies(["Email"]);

  const [appointments, setAppointments] = useState<AppointmentContract[]>();

  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies["Email"]) {
      navigate("/login", { replace: true });
      window.location.reload();
      return;
    }

    axios
      .get(`http://127.0.0.1:5252/appointment/${cookies["Email"]}`)
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      });
  }, []);

  useEffect(() => {
    // Prevent caching of this page
    window.history.replaceState(null, "", window.location.href);
    window.onpopstate = () => {
      navigate("/login", { replace: true });
    };
  }, [navigate]);

  function handleSignOut() {
    removeCookies("Email");
    navigate("/login", { replace: true });
    window.location.reload();
    return;
  }
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <nav className="mt-4 bg-light p-3 rounded-2">
          <span className="h5 text-dark ">{cookies["Email"]} - Dashboard</span>
          <span className="ms-3">
            <Button onClick={handleSignOut} variant="contained" color="error">
              Sign Out
            </Button>
          </span>
          {/* <div className="mt-4 bg-dark text-white w-25 m-2 p-3 rounded-2 d-flex justify-content-center">
                            <h4 className="text-warning">
                                Welcome <br /> {cookies['Email']} 
                            </h4>
                        </div> */}
        </nav>
      </div>
      <div className="d-flex justify-content-center">
        <h2 className="bg-dark text-warning w-50 fw-normal text-uppercase p-1 mt-2 rounded">
          To Do List Dashboard
        </h2>
      </div>

      <section className="text-start" style={{ height: "100vh" }}>
        <div>
          <Link to="/add-appointment">
            <Button variant="contained" color="warning">
              <span className="me-2 bi bi-calendar-date"></span>
              Add Appointment
            </Button>
          </Link>
        </div>

        <div className="mt-2 w-25">
          <div className="container d-flex">
            <div className="row">
              <div className="col-12 mb-4">
                {appointments?.map((appointment) => (
                  <div
                    className="alert alert-danger"
                    key={appointment.Appointment_Id}
                  >
                    <h3>{appointment.Title}</h3>
                    <p>{appointment.Description}</p>
                    <div className="bi bi-calendar-date me-3">
                      {appointment.Date.toString()}
                    </div>
                    <div className="mt-3 d-flex">
                      <Link
                        className="me-2"
                        to={`/delete-appointment/${appointment.Appointment_Id}`}
                      >
                        <Button variant="contained">Delete</Button>
                      </Link>

                      <Link
                        to={`/edit-appointment/${appointment.Appointment_Id}`}
                      >
                        <Button variant="contained">
                          <EditTwoTone />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
