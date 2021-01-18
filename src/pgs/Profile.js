import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import Header from "./cont/Header";
import Categories from "./cont/Categories";

import {
  addUserAddress,
  getUserInfo,
  deleteUserAddress,
  updateUser,
  updateUserPassword,
} from "../lib/user";
import { deleteFromWishlist } from "../lib/wishlist";
import { signOut, signOutAll } from "../lib/sign";
import { deleteOrder } from "../lib/order";

import "../css/Profile.css";
import "../css/Wishlist.css";

//Displaying Addresses of the User (along with delete component)
function DisplayAddress(props) {
  const allAddresses = props.addresses.map((address) => {
    return (
      <div
        style={{ border: "#b81c1c 4px solid", padding: "15px", margin: "5px" }}
        key={address._id}
      >
        <h3>{address.line1}</h3>
        <h3>{address.line2}</h3>
        <h3>{address.landmark}</h3>
        <h3>{address.pincode}</h3>
        <h3>{address.state}</h3>
        <Button
          onClick={() =>
            deleteUserAddress(address._id).then(() => props.reloadComp())
          }
        >
          Delete
        </Button>
      </div>
    );
  });

  return (
    <div>
      <div className="addressdisp">{allAddresses}</div>
    </div>
  );
}

//Adding new Address
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
      changeLine1("");
      changeLine2("");
      changeLandmark("");
      changePincode("");
      changeState("");
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <input
        placeholder="Line 1"
        type="text"
        className="enter-field"
        value={line1}
        onChange={(event) => {
          changeLine1(event.target.value);
        }}
      />
      <input
        placeholder="Line 2"
        type="text"
        className="enter-field"
        value={line2}
        onChange={(event) => {
          changeLine2(event.target.value);
        }}
      />
      <input
        placeholder="Landmark"
        type="text"
        className="enter-field"
        value={landmark}
        onChange={(event) => {
          changeLandmark(event.target.value);
        }}
      />
      <input
        placeholder="Pincode"
        type="text"
        className="enter-field"
        value={pincode}
        onChange={(event) => {
          changePincode(event.target.value);
        }}
      />
      <input
        placeholder="State"
        type="text"
        className="enter-field"
        value={state}
        onChange={(event) => {
          changeState(event.target.value);
        }}
      />
      {line1 && line2 && landmark && pincode && state ? (
        <input className="address-sub-btn" type="submit" />
      ) : (
        <input className="address-sub-btn" type="submit" disabled />
      )}
    </form>
  );
}

//Wishlist Display
function DisplayWishlist(props) {
  const useStyles = makeStyles({
    "wishlist-bt-headings": {
      fontFamily: "'Special Elite', cursive",
      fontSize: "20px",
      fontStyle: "bold",
      color: "#2f2f2f",

      "&:hover": {
        color: "#b81c1c",
        textDecoration: "underline",
      },
    },
    "wishlist-table-btn": {
      fontFamily: "'Special Elite', cursive",
    },
  });

  const classes = useStyles();

  const allWishlistItems = props.wishlist.map((item) => {
    return (
      <tr key={item._id}>
        <td>
          <img
            className="wishlist-table-img"
            src={
              item._id !== "5f6dae02770ad82c447e0f5e"
                ? "/img/" +
                  item.productName.split(" ").join("").toLowerCase() +
                  "2.jpg"
                : "/img/thegrizzliesoutlawm2.jpg"
            }
            alt="profile"
          ></img>
        </td>
        <td>
          <div>
            <h3>{item.productName.toUpperCase()}</h3>
            <br />
            <Button
              className={classes["wishlist-bt-headings"]}
              color="primary"
              onClick={() => {
                deleteFromWishlist(item._id).then(() => {
                  props.reloadComp();
                  props.reload();
                });
              }}
            >
              Delete From Wishlist
            </Button>
          </div>
        </td>
        <td>{item.price}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th className="wishlist-table-header">Image</th>
          <th className="wishlist-table-header">Name</th>
          <th className="wishlist-table-header">Price</th>
        </tr>
      </thead>
      <tbody>{allWishlistItems}</tbody>
    </table>
  );
}

//Displaying all orders
function DisplayOrders(props) {
  var orderrem = [];
  props.orders.forEach((order) => {
    if (order.currentStatus !== "order delivered") {
      orderrem.push(order);
    }
  });

  orderrem = orderrem.map((order) => {
    return (
      <tr key={order._id}>
        <td>
          <img
            className="wishlist-table-img"
            src={
              order._id !== "5f6dae02770ad82c447e0f5e"
                ? "/img/" +
                  order.productName.split(" ").join("").toLowerCase() +
                  "2.jpg"
                : "/img/thegrizzliesoutlawm2.jpg"
            }
            alt="product"
          ></img>
        </td>
        <td>
          <div>
            <h3>
              {order._id} - {order.productName.toUpperCase()}
            </h3>
            <br />
            <Button
              color="primary"
              onClick={() => {
                deleteOrder(order._id).then(() => {
                  props.reloadComp();
                });
              }}
            >
              Delete Order
            </Button>
          </div>
        </td>
        <td>{order.quantity}</td>
        <td>{order.totalPrice}</td>
        <td>{order.currentStatus}</td>
      </tr>
    );
  });

  return (
    <div>
      <h3 style={{ marginLeft: "5%" }}>Orders To be delivered:</h3>
      <table>
        <thead>
          <tr>
            <th className="wishlist-table-header">Image</th>
            <th className="wishlist-table-header ">Name</th>
            <th className="wishlist-table-header">Quantity</th>
            <th className="wishlist-table-header">Total Price</th>
            <th className="wishlist-table-header">Order Status</th>
          </tr>
        </thead>
        <tbody>{orderrem}</tbody>
      </table>
    </div>
  );
}

function DisplayDeliveredOrders(props) {
  var orderdel = [];
  props.orders.forEach((order) => {
    if (order.currentStatus === "order delivered") {
      orderdel.push(order);
    }
  });
  orderdel = orderdel.map((order1) => {
    return (
      <tr key={order1._id}>
        <td>
          <img
            className="wishlist-table-img"
            src={
              order1._id !== "5f6dae02770ad82c447e0f5e"
                ? "/img/" +
                  order1.productName.split(" ").join("").toLowerCase() +
                  "2.jpg"
                : "/img/thegrizzliesoutlawm2.jpg"
            }
            alt="product"
          ></img>
        </td>
        <td>
          <div>
            <h3>
              {order1._id} - {order1.productName.toUpperCase()}
            </h3>
          </div>
        </td>
        <td>{order1.quantity}</td>
        <td>{order1.totalPrice}</td>
      </tr>
    );
  });
  return (
    <div>
      <h3 style={{ marginLeft: "5%" }}>Orders delivered:</h3>
      <table>
        <thead>
          <tr>
            <th className="wishlist-table-header">Image</th>
            <th className="wishlist-table-header">Name</th>
            <th className="wishlist-table-header">Quantity</th>
            <th className="wishlist-table-header">Total Price</th>
          </tr>
        </thead>
        <tbody>{orderdel}</tbody>
      </table>
    </div>
  );
}

function UpdateProfile(props) {
  const [email, changeEmail] = useState(props.userData.email);
  const [firstName, changeFirstName] = useState(props.userData.firstName);
  const [lastName, changeLastName] = useState(props.userData.lastName);
  const [newPassword, changeNewPassword] = useState("");
  const [valid, updateValid] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    updateUser(email, firstName, lastName).then((res) => {
      if (res) {
        props.reload();
        props.reloadComp();
      } else {
        updateValid(true);
      }
    });
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    updateUserPassword(newPassword).then(() => {
      props.reload();
      props.reloadComp();
      changeNewPassword("");
    });
  }

  return (
    <div>
      <form
        className="address-form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          placeholder="email"
          type="text"
          className="enter-field"
          value={email}
          onChange={(event) => {
            changeEmail(event.target.value);
          }}
          onClick={() => {
            updateValid(false);
          }}
        />
        <input
          placeholder="first name"
          type="text"
          className="enter-field"
          value={firstName}
          onChange={(event) => {
            changeFirstName(event.target.value);
          }}
          onClick={() => {
            updateValid(false);
          }}
        />
        <input
          placeholder="last name"
          type="text"
          className="enter-field"
          value={lastName}
          onChange={(event) => {
            changeLastName(event.target.value);
          }}
          onClick={() => {
            updateValid(false);
          }}
        />
        {valid && <p>email already taken</p>}
        {email && firstName && lastName ? (
          <input className="address-sub-btn" type="submit" />
        ) : (
          <input className="address-sub-btn" type="submit" disabled />
        )}
      </form>

      <form
        className="address-form"
        onSubmit={handlePasswordSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          placeholder="new password"
          type="text"
          className="enter-field"
          value={newPassword}
          onChange={(event) => {
            changeNewPassword(event.target.value);
          }}
        />
        {newPassword ? (
          <input className="address-sub-btn" type="submit" />
        ) : (
          <input className="address-sub-btn" type="submit" disabled />
        )}
      </form>
    </div>
  );
}

function ProfileInfoDisplay(props) {
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
    btn: {
      height: "40px",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <h1 style={{ margin: "2% 0% 1% 5%" }}>Profile</h1>
      <div
        style={{ display: "flex", margin: "2% 0% 2% 5%", alignItems: "center" }}
      >
        <Avatar src={props.userData.profilePic} className={classes.large} />
        <Button
          className={classes.btn}
          onClick={() => {
            signOut().then(() => {
              props.reload();
              props.history.push("/");
            });
          }}
        >
          Sign Out
        </Button>
        <Button
          className={classes.btn}
          onClick={() => {
            signOutAll().then(() => {
              props.reload();
              props.history.push("/");
            });
          }}
        >
          Sign Out All
        </Button>
      </div>
      <div style={{ marginLeft: "5%" }}>
        <p>Email Id: {props.userData.email}</p>
        <p>First Name: {props.userData.firstName}</p>
        <p>Last Name: {props.userData.lastName}</p>
      </div>
    </div>
  );
}

export default function Profile(props) {
  const useStyles = makeStyles({
    subcategory: {
      fontFamily: "'Special Elite', cursive",
      fontSize: "20px",
      fontStyle: "bold",
      color: "#2f2f2f",
      marginLeft: "20px",
      marginRight: "20px",

      "&:hover": {
        color: "#b81c1c",
        textDecoration: "underline",
      },
    },
  });

  const [reload, changeReload] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const [userData, changeUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    profilePic: "",
    address: [],
    cart: [],
    orders: [],
    reviews: [],
    wishlist: [],
  });

  useEffect(() => {
    getUserInfo().then((userInfo) => {
      changeUserData(userInfo);
      changeReload(false);
    });
  }, [reload]);

  function reloadComp() {
    changeReload(true);
  }

  return (
    <div style={{ minHeight: "120vh" }}>
      <Header user={props.user} />
      <Categories />
      <ProfileInfoDisplay
        userData={userData}
        reload={props.reload}
        history={history}
      />
      <Router>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/profile/userupdate" style={{ textDecoration: "none" }}>
            <Button className={classes.subcategory}> UpdateProfile</Button>
          </Link>
          <Link to="/profile/addresses" style={{ textDecoration: "none" }}>
            <Button className={classes.subcategory}>Addresses</Button>
          </Link>
          <Link to="/profile/addaddress" style={{ textDecoration: "none" }}>
            <Button className={classes.subcategory}>Add Address</Button>
          </Link>
          <Link to="/profile/wishlist" style={{ textDecoration: "none" }}>
            <Button className={classes.subcategory}>Wishlist</Button>
          </Link>
          <Link to="/profile/orders" style={{ textDecoration: "none" }}>
            <Button className={classes.subcategory}>Orders</Button>
          </Link>
          <Link to="/profile/delorders" style={{ textDecoration: "none" }}>
            <Button className={classes.subcategory}>Delivered</Button>
          </Link>
        </div>
        <Switch>
          <Route path="/profile/userupdate" exact>
            <UpdateProfile
              userData={userData}
              reloadComp={reloadComp}
              reload={props.reload}
            />
          </Route>
          <Route path="/profile/addresses" exact>
            <DisplayAddress
              addresses={userData.address}
              reloadComp={reloadComp}
            />
          </Route>
          <Route path="/profile/addaddress" exact>
            <EnterAddress reloadComp={reloadComp} />
          </Route>
          <Route path="/profile/wishlist" exact>
            <DisplayWishlist
              wishlist={userData.wishlist}
              reloadComp={reloadComp}
              reload={props.reload}
            />
          </Route>
          <Route path="/profile/orders" exact>
            <DisplayOrders orders={userData.orders} reloadComp={reloadComp} />
          </Route>
          <Route path="/profile/delorders" exact>
            <DisplayDeliveredOrders
              orders={userData.orders}
              reloadComp={reloadComp}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
