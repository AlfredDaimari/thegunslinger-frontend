/* 
the filter logic starts from here, each small product display component 
will have a link which switches to the item's main product page
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Filter from "./Filter";
import "../../css/DisplayProds.css";

function DisAllProds(props) {
  /*
  creates a box layout display for all the products received
  will make each box display a link that takes to Product
  */
  const disAllProds = () => {
    var prodsToDisplay = [];

    props.products.forEach((prod) => {
      var catBool = false,
        colBool = false,
        typeBool = false,
        priceBool = false;

      if (props.filters.catFilter.length === 0) {
        catBool = true;
      } else {
        catBool = props.filters.catFilter.includes(prod.category)
          ? true
          : false;
      }

      if (props.filters.typeFilter.length === 0) {
        typeBool = true;
      } else {
        typeBool = props.filters.typeFilter.includes(prod.properties.type_)
          ? true
          : false;
      }

      if (props.filters.colFilter.length === 0) {
        colBool = true;
      } else {
        for (let col of prod.properties.colour) {
          if (props.filters.colFilter.includes(col)) {
            colBool = true;
          }
        }
      }

      if (props.filters.priceFilter[0] > prod.price) {
        priceBool = true;
      }

      if (catBool && typeBool && colBool & priceBool) {
        prodsToDisplay.push(<MinProdDis product={prod} key={prod._id} />);
      }
    });

    return prodsToDisplay;
  };

  const prods = props.products.length > 0 ? disAllProds() : <div></div>;
  return <div className="prod-display">{prods}</div>;
}

function MinProdDis(props) {
  //will create a component for displaying a product with minimized details
  const product = props.product;
  return (
    <div className="prod-container">
      <Link className="link-text" to={"/product/" + props.product._id}>
        <div>
          <h1>{product.name.toUpperCase()}</h1>
          <img className="prod-img" src={product.img} alt={product.name} />
          <h2>Price: ${product.price}</h2>
        </div>
      </Link>
    </div>
  );
}

export default function DisplayProds(props) {
  const [filters, changeFilters] = useState({
    catFilter: [],
    colFilter: [],
    priceFilter: [300], //no product will be more exprensive than 200 usd
    typeFilter: [],
  });

  // resetting filters if filters change
  useEffect(() => {
    changeFilters({
      catFilter: [],
      colFilter: [],
      priceFilter: [300],
      typeFilter: [],
    });
  }, [props.category, props.colour, props.type]);

  //function for adding and removing from the category array; filter 0
  const addToCategory = (value, type) => {
    var filter = filters.catFilter;
    if (type === "add") {
      filter.push(value);
    } else {
      filter = filter.filter((item) => item !== value);
    }
    changeFilters({
      catFilter: filter,
      colFilter: filters.colFilter,
      priceFilter: filters.priceFilter,
      typeFilter: filters.typeFilter,
    });
  };

  // function for adding and removing from the color array; filter 2
  const addToColour = (value, type) => {
    var filter = filters.colFilter;
    if (type === "add") {
      filter.push(value);
    } else {
      filter = filter.filter((item) => item !== value);
    }
    changeFilters({
      catFilter: filters.catFilter,
      colFilter: filter,
      priceFilter: filters.priceFilter,
      typeFilter: filters.typeFilter,
    });
  };

  // function for adding and removing from the price array; filter 3
  const addToPrice = (value, type) => {
    var filter = filters.priceFilter;
    if (type === "add") {
      filter = [value];
    } else {
      filter = [300];
    }
    changeFilters({
      catFilter: filters.catFilter,
      colFilter: filters.colFilter,
      priceFilter: filter,
      typeFilter: filters.typeFilter,
    });
  };

  // function for adding and removing from the type array; filter 1
  const addToType = (value, type) => {
    var filter = filters.typeFilter;
    if (type === "add") {
      filter.push(value);
    } else {
      filter = filter.filter((item) => item !== value);
    }
    changeFilters({
      catFilter: filters.catFilter,
      colFilter: filters.colFilter,
      priceFilter: filters.priceFilter,
      typeFilter: filter,
    });
  };
  return (
    <div className="prod-fil-display">
      <Filter
        category={props.category}
        colour={props.colour}
        type={props.type}
        price={props.price}
        addCat={addToCategory}
        addCol={addToColour}
        addPrice={addToPrice}
        addType={addToType}
        filters={filters}
      />
      <DisAllProds products={props.products} filters={filters} />
    </div>
  );
}
