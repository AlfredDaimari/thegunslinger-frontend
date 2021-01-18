import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { signIn, signUsingGoogle } from "../lib/sign";
import "../css/Sign.css";

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
  const [valid, updateValid] = useState(false);
  const classes = useStyles();

  function check() {
    signIn(email, password).then((res) => {
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
      <p className="sign-p">Sign In</p>
      <input
        type="text"
        placeholder="Enter Email"
        onClick={() => updateValid(false)}
        onChange={(event) => setEmail(event.target.value)}
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
      <div className="invalid-p">
        {valid && <p>Invalid user name and password</p>}
      </div>
      <br />
      <Button className={classes.btn} onClick={check}>
        Sign In
      </Button>
    </div>
  );
}

export default function SignIn(props) {
  const history = useHistory();
  return (
    <div className="back">
      <div className="box">
        <Sign reload={props.reload} history={history} />
        <div className="pad">
          <p className="sign-p">
            Dont have an account yet? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        <br />
        <div className="btn2">
          <GoogleLogin
            buttonText="Sign In"
            clientId="--- add google client id ---"
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
