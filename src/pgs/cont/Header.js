import React from "react";

import SignStatus from "./SignStatus";
import CartStatus from "./CartStatus";
import "../../css/Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <div style={{ display: "flex"}}>
        <img className="heading-icon" src="/img/cowboy.png" alt="cowboy" />
        <h1 className="heading"> theGunslinger.com </h1>
      </div>
      <div className="sign-cart-status-container">
        <SignStatus user={props.user} />
        <CartStatus cart={props.user.cart} />
      </div>
    </div>
  );
}
