// will use cart data to create the page

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { addUserAddress, getUserAddresses } from "../lib/user";
import { createOrder } from "../lib/order";
import { calcTotalPrice } from "../lib/cart";

import Header from "./cont/Header";
import Categories from "./cont/Categories";
import "../css/Checkout.css";

const useStyles = makeStyles({
  "checkout-bt-headings": {
    fontFamily: "'Special Elite', cursive",
    fontSize: "20px",
    fontStyle: "bold",
    color: "#2f2f2f",

    "&:hover": {
      color: "#b81c1c",
      textDecoration: "underline",
    },
  },
});

function SelectAddress(props) {
  const allAddresses = props.addresses.map((item, index) => {
    return (
      <div
        className={
          index !== props.selected ? "address-box" : "address-box-selected"
        }
        key={item._id}
        onClick={() => {
          props.changeSelectedAddressIndex(index);
        }}
      >
        <h3>{item.line1}</h3>
        <h3>{item.line1}</h3>
        <h3>{item.landmark}</h3>
        <h3>{item.pincode}</h3>
        <h3>{item.state}</h3>
      </div>
    );
  });

  return (
    <div>
      <h2 className="enter-cont-header">Select an address for delivery</h2>
      <div className="address-cont">{allAddresses}</div>
    </div>
  );
}

function EnterAddress(props) {
  const [line1, changeLine1] = useState("");
  const [line2, changeLine2] = useState("");
  const [landmark, changeLandmark] = useState("");
  const [pincode, changePincode] = useState("");
  const [state, changeState] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addUserAddress(line1, line2, landmark, pincode, state).then(() => {
      props.reloadComp();
    });
  }

  return (
    <div className="enter-cont-header">
      <h2>Enter an address for delivery</h2>
      <form className="address-form" onSubmit={handleSubmit}>
        <label className="address-label">Line1:</label> <br />
        <input
          type="text"
          className="add-input"
          value={line1}
          onChange={(event) => {
            changeLine1(event.target.value);
          }}
        />
        <br />
        <label className="address-label">Line2:</label> <br />
        <input
          type="text"
          className="add-input"
          value={line2}
          onChange={(event) => {
            changeLine2(event.target.value);
          }}
        />
        <br />
        <label className="address-label">Landmark:</label> <br />
        <input
          type="text"
          className="add-input"
          value={landmark}
          onChange={(event) => {
            changeLandmark(event.target.value);
          }}
        />
        <br />
        <label className="address-label">Pincode:</label> <br />
        <input
          type="text"
          className="add-input"
          value={pincode}
          onChange={(event) => {
            changePincode(event.target.value);
          }}
        />
        <br />
        <label className="address-label">State:</label> <br />
        <input
          type="text"
          className="add-input"
          value={state}
          onChange={(event) => {
            changeState(event.target.value);
          }}
        />
        <br />
        <input className="address-sub-btn" type="submit" value="Add address" />
      </form>
    </div>
  );
}

function SelectPaymentMethod(props) {
  return (
    <div className="payment-cont">
      <h2>Select Method Of Payment</h2>
      <form>
        <input
          type="radio"
          name="payment"
          onClick={() => {
            props.changePaymentMethod("Cash On Delivery");
          }}
        />
        <label>Cash On Delivery</label>
        <br />
        <input
          type="radio"
          name="payment"
          onClick={() => {
            props.changePaymentMethod("Debit-Credit");
          }}
        />
        <label>Debit/Credit</label>
        <br />
        <input
          type="radio"
          name="payment"
          onClick={() => {
            props.changePaymentMethod("ROB");
          }}
        />
        <label>ROB</label>
      </form>
    </div>
  );
}

export default function Checkout(props) {
  // routing back to home page if user is not signed in
  const history = useHistory();

  if (props.user.firstName === "" || props.user.cart.length === 0) {
    history.push("/");
  }

  //call function for total value
  const [address, changeAddress] = useState({
    addresses: [],
    reload: false,
  });

  const [selectedAddressIndex, changeSelectedAddressIndex] = useState(-1);

  const [paymentMethod, changePaymentMethod] = useState("");

  useEffect(() => {
    getUserAddresses().then((address) => {
      changeAddress({
        addresses: address,
        reload: false,
      });
    });
  }, [address.reload]);

  function reloadComp() {
    changeAddress({
      addresses: address.addresses,
      reload: true,
    });
  }

  const classes = useStyles();

  return (
    <div>
      <Header user={props.user} />
      <Categories />
      <h1 className="checkout-header">Checkout</h1>
      {address.addresses.length !== 0 ? (
        <SelectAddress
          addresses={address.addresses}
          changeSelectedAddressIndex={changeSelectedAddressIndex}
          selected={selectedAddressIndex}
        />
      ) : (
        <EnterAddress reloadComp={reloadComp} />
      )}
      <SelectPaymentMethod changePaymentMethod={changePaymentMethod} />
      <h1 style={{ textAlign: "right", marginRight: "10%" }}>
        Total: ${calcTotalPrice(props.user.cart)}
      </h1>
      <div className="order-bt">
        {selectedAddressIndex !== -1 && paymentMethod ? (
          <Button
            className={classes["checkout-bt-headings"]}
            onClick={() => {
              createOrder(selectedAddressIndex, paymentMethod).then(() => {
                props.reload();
                history.push("/");
              });
            }}
          >
            <h2>Order</h2>
          </Button>
        ) : (
          <div>
            <Button disabled className={classes["checkout-bt-headings"]}>
              <h2>Order</h2>
            </Button>
            <p>Enter Address or Select Address to Order</p>
          </div>
        )}
      </div>
    </div>
  );
}
