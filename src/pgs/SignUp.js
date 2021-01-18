import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { signUp, signUsingGoogle } from "../lib/sign";

const useStyles = makeStyles({
  btn: {
    background: "#b81c1c",
    width: "270px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "white",
    borderRadius: "4px",
    border: "#27ae60 1px solid",
    textAlign: "center",
    marginLeft: "60px",
    marginTop: "20px",
    marginBottom: "5px",
    fontWeight: "800",
    fontSize: "1em",
    "&:hover": {
      background: "#8a1616",
    },
  },
});

function Sign(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [valid, updateValid] = useState(false);
  const classes = useStyles();

  function check() {
    signUp(email, firstname, lastname, password).then((res) => {
      if (res) {
        props.reload();
        props.history.push("/");
      } else {
        updateValid(true);
      }
    });
  }

  return (
    <div>
      <p className="sign-p">Sign Up</p>
      <input
        type="text"
        placeholder="Enter Email"
        onClick={() => updateValid(false)}
        onChange={(event) => setEmail(event.target.value)}
        className="field"
      ></input>
      <br />
      <input
        type="text"
        placeholder="Enter First Name"
        onClick={() => updateValid(false)}
        onChange={(event) => setFirstname(event.target.value)}
        className="field"
      ></input>
      <br />
      <input
        type="text"
        placeholder="Enter Last Name"
        onClick={() => updateValid(false)}
        onChange={(event) => setLastname(event.target.value)}
        className="field"
      ></input>
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        onClick={() => updateValid(false)}
        onChange={(event) => setPassword(event.target.value)}
        className="field"
      ></input>
      <br />
      {valid && <p className="sign-p">Invalid Email</p>}
      <br />
      {email && firstname && lastname && password ? (
        <Button onClick={check} className={classes.btn}>
          Sign Up
        </Button>
      ) : (
        <div>
          <p className="sign-p">Enter all fields</p>
          <Button onClick={check} className={classes.btn} disabled>
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SignUp(props) {
  const history = useHistory();

  return (
    <div className="back">
      <div className="box">
        <Sign reload={props.reload} history={history} />
        <div className="pad">
          <p className="sign-p">
            Have an account yet? <Link to="/sign">Sign In</Link>
          </p>
        </div>
        <div className="btn2">
          <GoogleLogin
            buttonText="Sign Up"
            clientId="--- add google client id here ---"
            onSuccess={(response) => {
              signUsingGoogle(response).then(() => {
                props.reload();
                history.push("/");
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
