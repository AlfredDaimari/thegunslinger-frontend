/* 
file to make the api call to the backend and receive product list data and passes it as props
to its child components to render it
*/

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DisplayProds from "./DisplayProds";

import Footer from "../cont/Footer";
import Header from "../cont/Header";
import Categories from "../cont/Categories";
import "../../css/Products.css";

import getProdsAndFilters from "../../lib/getProdsAndFilters";

// memoizing the prop to avoid re-rendering
const Prods = React.memo((props) => {
  const [filAndProd, changeFilAndProd] = useState({
    category: [],
    colour: [],
    price: [],
    products: [],
    type: [],
  });

  useEffect(() => {
    const query = props.search
      ? "search=" + props.search
      : "category=" + props.category;

    getProdsAndFilters(query).then((response) => {
      changeFilAndProd({
        category: response.filters.category,
        colour: response.filters.colour,
        price: response.filters.price,
        products: response.products,
        type: response.filters.type,
      });
    });
  }, [props.search, props.category]);

  return (
    <div className="products">
      <img
        className="cat-img"
        alt="cateogry-header"
        src={
          props.category ? "/img/" + props.category + ".jpg" : "/img/search.jpg"
        }
      />

      {props.search && <h1>{props.search}</h1>}

      <DisplayProds
        category={filAndProd.category}
        colour={filAndProd.colour}
        price={filAndProd.price}
        products={filAndProd.products}
        type={filAndProd.type}
      />
      <Footer />
    </div>
  );
});

export default function Products(props) {
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const category = query.get("category");
  const search = query.get("search");

  // error checking the url, if error exists route to 404
  const cat =
    category === "guns" || category === "outfits" || category === "horses";
  if (!cat & !search) {
    history.push("/");
  }

  return (
    <div>
      <Header user={props.user} />
      <Categories />
      <Prods category={category} search={search} />
    </div>
  );
}
