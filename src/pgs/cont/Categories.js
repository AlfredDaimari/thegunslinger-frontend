import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import getAutoRecom from "../../lib/getAutoRecom";

import "../../css/Categories.css";

const useStyles = makeStyles({
  category: {
    fontFamily: "'Special Elite', cursive",
    fontSize: "25px",
    fontStyle: "bold",
    color: "#2f2f2f",

    padding: "0px 60px 0px 60px",

    "&:hover": {
      color: "#b81c1c",
      textDecoration: "underline",
    },
  },
});

function Recommendations(props) {
  const recoms = props.recoms.map((item) => (
    <h2
      className="recoms"
      key={item}
      onClick={() => {
        props.history.push("/product?search=" + item);
        props.showSearch();
      }}
    >
      {item}
    </h2>
  ));
  return props.recoms.length !== 0 && <div id="recommendations">{recoms}</div>;
}

function SearchBar(props) {
  const [search, changeSearch] = useState({
    link: "",
    autoRecom: [],
  });

  const searchInput = (e) => {
    const link = e.target.value;
    if (link.length > 0) {
      getAutoRecom(link).then((response) => {
        changeSearch({
          link: link,
          autoRecom: response,
        });
      });
    } else {
      changeSearch({
        link: link,
        autoRecom: [],
      });
      console.log(search.autoRecom);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      props.showSearch();
      props.history.push("/product?search=" + search.link);
    }
  };

  return (
    <div>
      {props.search && (
        <div id="searchbar">
          <input
            type="search"
            placeholder="SEARCH ONLINE CATALOGUE"
            onChange={searchInput}
            onKeyPress={handleEnter}
            defaultValue={search.link}
          ></input>
          <Recommendations
            recoms={search.autoRecom}
            history={props.history}
            showSearch={props.showSearch}
          />
        </div>
      )}
    </div>
  );
}

// categories
export default function Categories() {
  const history = useHistory();
  const classes = useStyles();
  var [search, changeSearch] = useState(false);

  const changePage = (uri) => {
    history.push(uri);
  };

  const showSearch = () => {
    changeSearch(!search);
  };

  return (
    <div>
      <div className="categories">
        <Button
          className={classes.category}
          onClick={() => {
            changePage("/");
          }}
        >
          Home
        </Button>
        <Button
          className={classes.category}
          onClick={() => {
            changePage("/product?category=guns");
          }}
        >
          Guns
        </Button>
        <Button
          className={classes.category}
          onClick={() => {
            changePage("/product?category=outfits");
          }}
        >
          Outfits
        </Button>
        <Button
          className={classes.category}
          onClick={() => {
            changePage("/product?category=horses");
          }}
        >
          Horses
        </Button>
        <Button className={classes.category} onClick={showSearch}>
          Search
        </Button>
      </div>
      <SearchBar search={search} history={history} showSearch={showSearch} />
    </div>
  );
}
