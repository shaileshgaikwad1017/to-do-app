import { Link } from "react-router-dom";

export function ToDoIndex() {
  return (
    <div className="container-fluid">
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
      <footer className="text-start ms-4 mb-3 fs-3">
        Design & Developed By Shailesh Gaikwad
      </footer>
    </div>
  );
}
