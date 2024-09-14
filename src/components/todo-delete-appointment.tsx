import { useEffect, useState } from "react";
import { AppointmentContract } from "../contracts/AppointmentContract";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export function ToDoDeleteAppointment() {
  let params = useParams();
  let navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentContract[]>([
    {
      Appointment_Id: 0,
      Title: "",
      Description: "",
      Date: new Date(),
      UserId: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5252/get-appointment/${params.id}`)
      .then((response) => {
        console.log(params.id);
        setAppointments(response.data);
      });
  }, []);

  function handleDeleteClick() {
    axios
      .delete(`http://127.0.0.1:5252/delete-appointment/${params.id}`)
      .then(() => {
        alert(`Appointment Deleted...`);
        navigate("/user-dashboard");
      });
  }

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="mt-4 fs-4 text-bg-dark p-4 rounded-2">
        <h2 className="text-danger">Delete Appointment</h2>
        <dl>
          <dt>Appointment Id</dt>
          <dd>{appointments[0].Appointment_Id}</dd>
          <dt>Appointment Title</dt>
          <dd>{appointments[0].Title}</dd>
          <dt>Description</dt>
          <dd>
            <p>{appointments[0].Description}</p>
          </dd>
        </dl>
        <button onClick={handleDeleteClick} className="btn btn-danger">
          Delete
        </button>
        <Link to="/user-dashboard" className="btn btn-warning  ms-4">
          Back
        </Link>
      </div>
    </div>
  );
}
