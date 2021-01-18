// file for displaying all products in cart
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import {
  addToCart,
  addToWishlistAndDeleteFromCart,
  deleteFromCart,
  calcTotalPrice,
} from "../lib/cart";

import Header from "./cont/Header";
import Categories from "./cont/Categories";
import "../css/Cart.css";

const useStyles = makeStyles({
  "cart-bt-headings": {
    fontFamily: "'Special Elite', cursive",
    fontSize: "20px",
    fontStyle: "bold",
    color: "#2f2f2f",

    "&:hover": {
      color: "#b81c1c",
      textDecoration: "underline",
    },
  },
  "cart-table-btn": {
    fontFamily: "'Special Elite', cursive",
  },
});

function CartItemsDisplay(props) {
  const classes = useStyles();

  const allCartItems = props.cart.map((item) => {
    return (
      <tr key={item._id}>
        <td>
          <img
            className="cart-table-img"
            src={
              // checking if the product is grizzlies outlaw male or not
              item._id !== "5f6dae02770ad82c447e0f5e"
                ? "/img/" +
                  item.productName.split(" ").join("").toLowerCase() +
                  "2.jpg"
                : "/img/thegrizzliesoutlawm2.jpg"
            }
            alt="product"
          ></img>
        </td>
        <td>
          <div>
            <h3>{item.productName.toUpperCase()}</h3>
            <br />
            <Button
              color="primary"
              onClick={() => {
                addToWishlistAndDeleteFromCart(
                  item._id,
                  item.quantity,
                  props.wishlist
                ).then((cartInfo) => props.updateCart(cartInfo));
              }}
            >
              add to wishlist
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                deleteFromCart(item._id, item.quantity).then((cartInfo) =>
                  props.updateCart(cartInfo)
                );
              }}
            >
              remove from cart
            </Button>
          </div>
        </td>
        <td>
          <Button
            color="primary"
            className={classes["cart-table-btn"]}
            onClick={() => {
              addToCart(item._id, 1).then((cartInfo) =>
                props.updateCart(cartInfo)
              );
            }}
          >
            +
          </Button>
          {item.quantity}
          <Button
            color="primary"
            className={classes["cart-table-btn"]}
            onClick={() => {
              deleteFromCart(item._id, 1).then((cartInfo) =>
                props.updateCart(cartInfo)
              );
            }}
          >
            -
          </Button>
        </td>
        <td>{item.price}</td>
      </tr>
    );
  });
  return (
    <table>
      <tr>
        <th className="cart-table-header">Image</th>
        <th className="cart-table-header">Name</th>
        <th className="cart-table-header">Quantity</th>
        <th className="cart-table-header">Price</th>
      </tr>
      {allCartItems}
    </table>
  );
}

export default function Cart(props) {
  const classes = useStyles();
  var totalPrice = calcTotalPrice(props.user.cart);
  const history = useHistory();

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header user={props.user} />
      <Categories />

      <div>
        <h1 className="cart-header">Gunslinger Cart</h1>
        <CartItemsDisplay
          cart={props.user.cart}
          updateCart={props.updateCart}
          reload={props.reload}
          wishlist={props.user.wishlist}
        />
      </div>
      <div className="cart-bt-heads">
        <h2>Total: ${totalPrice}</h2>
        {props.user.firstName !== "" && props.user.cart.length !== 0 ? (
          <Button
            className={classes["cart-bt-headings"]}
            onClick={() => {
              history.push("/checkout");
            }}
          >
            <h2>Checkout</h2>
          </Button>
        ) : (
          <div>
            <Button disabled className={classes["cart-bt-headings"]}>
              <h2>Checkout</h2>
            </Button>
            <p>Sign in too see your cart and checkout</p>
          </div>
        )}
      </div>
    </div>
  );
}
