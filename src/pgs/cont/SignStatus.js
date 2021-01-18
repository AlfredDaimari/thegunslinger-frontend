// will receive data from App, the link sent back will depend on the data received

import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../../css/SignStatus.css";

export default function SignStatus(props) {
  return props.user.firstName !== "" ? (
    <Link
      to="/profile/userupdate"
      style={{ textDecoration: "none", color: "navajowhite" }}
    >
      <div className="sign-status-user">
        <h3 style={{ marginRight: "10px" }}>
          {props.user.firstName.toUpperCase()}
        </h3>
        <Avatar src={props.user.img} />
      </div>
    </Link>
  ) : (
    <div style={{ marginRight: "20px" }}>
      <Link to="/sign"> Sign In</Link>
    </div>
  );
}
