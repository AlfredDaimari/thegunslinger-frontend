// file for creating the entire filter for the page

import React from "react";

import "../../css/Filter.css";

function FilCreate(props) {
  // creates the filters required under the current category

  const filOps = props.filterOps.map((value) => {
    const addBtn = (
      <button
        className="fil-btn"
        onClick={() => {
          props.filAddFunc(value, "add");
        }}
      >
        + {value}
      </button>
    );
    const remBtn = (
      <button
        className="fil-btn-active"
        onClick={() => {
          props.filAddFunc(value, "remove");
        }}
      >
        x {value}
      </button>
    );
    const btn = props.filArr.includes(value) ? remBtn : addBtn;
    return (
      <div className="fil-btn-cont" key={value}>
        {btn}
      </div>
    );
  });

  return <div>{filOps}</div>;
}

export default function Filter(props) {
  /*
  the props will contain filterArrays -> an array that contains all the items category wise that needs to be filtered
  will contain functions such as catadd, typeadd, coloradd, priceadd to add to the respective filter arrays
  */

  let catFilDis = "",
    colFilDis,
    priceFilDis,
    typeFilDis; // displays of each specific filter

  if (props.category.length > 1) {
    catFilDis = (
      <div className="filcat">
        <h3 className="fil-header">Category</h3>
        <FilCreate
          filterOps={props.category}
          filAddFunc={props.addCat}
          filArr={props.filters.catFilter}
        />
      </div>
    );
  }
  typeFilDis = (
    <div className="filcat">
      <h3 className="fil-header">Types</h3>
      <FilCreate
        filterOps={props.type}
        filAddFunc={props.addType}
        filArr={props.filters.typeFilter}
      />
    </div>
  );
  colFilDis = (
    <div className="filcat">
      <h3 className="fil-header">Color</h3>
      <FilCreate
        filterOps={props.colour}
        filAddFunc={props.addCol}
        filArr={props.filters.colFilter}
      />
    </div>
  );
  priceFilDis = (
    <div className="filcat">
      <h3 className="fil-header">Price</h3>
      <FilCreate
        filterOps={props.price}
        filAddFunc={props.addPrice}
        filArr={props.filters.priceFilter}
      />
    </div>
  );

  return (
    <div className="filter">
      <h2 className="filheading">Filters</h2>
      {catFilDis}
      {typeFilDis}
      {colFilDis}
      {priceFilDis}
    </div>
  );
}
