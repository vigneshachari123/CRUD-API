import React from "react";
import { Link } from "react-router-dom";
import "../style/Style.css";
export const Links = () => {
  return (
    <>
      <nav>
        <Link to="/">
          <h3>Designation List</h3>
        </Link>
        <Link to="/addData">
          <h3>Add New</h3>{" "}
        </Link>
        {/* <Link to="/editData">
          <h3>Edit</h3>
        </Link> */}
      </nav>
    </>
  );
};
