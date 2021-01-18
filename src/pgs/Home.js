import React from "react";

import Categories from "./cont/Categories";
import Header from "./cont/Header";

import "../css/Home.css";

export default function Home(props) {
  return (
    <div>
      <Header user={props.user} />
      <Categories />
      <img
        className="lnd-img"
        src="/img/home.jpg"
        alt="a gang of gunslingers"
      ></img>
    </div>
  );
}
