// cart creation, will receive data from App

import React from "react";
import { Link } from "react-router-dom";
import { calcTotalProdAmt } from "../../lib/cart";
import "../../css/CartStatus.css";

export default function CartStatus(props) {
  return (
    <div>
      <Link to="/mycart" className="cartStatus">
        <img className="cart-icon" src="/img/cart.png" alt="cart" />
        <p>{calcTotalProdAmt(props.cart)}</p>
      </Link>
    </div>
  );
}
