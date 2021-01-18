import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { checkUserToken } from "./lib/user";

import Cart from "./pgs/Cart";
import Checkout from "./pgs/Checkout";
import Product from "./pgs/product/Product";
import Products from "./pgs/product/Products";
import Profile from "./pgs/Profile";
import Home from "./pgs/Home";
import SignIn from "./pgs/SignIn";
import SignUp from "./pgs/SignUp";
import "./css/App.css";

export default function App() {
  /* 
  this portion will create the cart state, userState and 
  pass the data down to lower level containers, 
  */

  const [user, updateUser] = useState({
    firstName: "",
    img: "",
    cart: [],
    wishlist: [],
    reload: false,
  });

  useEffect(() => {
    checkUserToken().then((response) => {
      if (response) {
        updateUser({
          firstName: response.firstName,
          img: response.profilePic,
          cart: response.cart,
          wishlist: response.wishlist,
          reload: false,
        });
      } else {
        updateUser({
          firstName: "",
          img: "",
          cart: [],
          wishlist: [],
          reload: false,
        });
      }
    });
  }, [user.reload]);

  function reload() {
    updateUser({
      firstName: user.firstName,
      img: user.img,
      cart: user.cart,
      wishlist: user.wishlist,
      reload: true,
    });
  }

  function updateCart(cart) {
    updateUser({
      firstName: user.firstName,
      img: user.img,
      cart: cart,
      wishlist: user.wishlist,
      reload: user.reload,
    });
  }

  return (
    <div className="master">
      <Router>
        <Switch>
          <Route path="/mycart" exact>
            <Cart user={user} reload={reload} updateCart={updateCart} />
          </Route>
          <Route path="/checkout" exact>
            <Checkout user={user} reload={reload} />
          </Route>
          <Route path="/profile/:section" exact>
            <Profile user={user} reload={reload} />
          </Route>
          <Route path="/sign" exact>
            <SignIn reload={reload} />
          </Route>
          <Route path="/signup" exact>
            <SignUp reload={reload} />
          </Route>
          <Route path="/product/:productId" exact>
            <Product user={user} reload={reload} updateCart={updateCart} />
          </Route>
          <Route path="/product" exact>
            <Products user={user} />
          </Route>
          <Route path="/">
            <Home user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
