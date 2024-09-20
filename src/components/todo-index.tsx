import { Link } from "react-router-dom";

export function ToDoIndex() {
  return (
    <div className="d-flex container-fluid">
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Link className="m-2 btn btn-dark" to="/register">
          New User Register
        </Link>
        <Link className="m-2 btn btn-primary" to="/login">
          Existing User Login
        </Link>
      </div>
    </div>
  );
}
