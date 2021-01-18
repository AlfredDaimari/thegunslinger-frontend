// file for creating a display for a product with full info and description

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import getProduct from "../../lib/getProduct";
import Button from "@material-ui/core/Button";
import { addToCart } from "../../lib/cart";
import Header from "../cont/Header";
import Categories from "../cont/Categories";
import "../../css/Product.css";
import "../../css/SimProds.css";
import { checkForWishlistRedundancy, addToWishlist } from "../../lib/wishlist";
import { addReview, addReviewUnknown } from "../../lib/review";

const useStyles = makeStyles({
  "cart-bt-headings": {
    fontFamily: "'Special Elite', cursive",
    fontSize: "20px",
    fontStyle: "bold",
    color: "#b81c1c",

    "&:hover": {
      color: "#2f2f2",
      textDecoration: "underline",
    },
  },
  "cart-table-btn": {
    fontFamily: "'Special Elite', cursive",
  },
});
function Reviews(props) {
  const [review, changeReview] = useState("");
  const [rating, changeRating] = useState(0);
  const classes = useStyles();
  const allreviews = props.review.map((review) => {
    return (
      <div key={review._id}>
        <Avatar src={review.profilePic} />
        <div style={{ display: "flex" }}>
          <h1 style={{ marginLeft: "5px" }}>{review.reviewedBy}</h1>
          {review.verifiedBuyer ? (
            <Avatar src="/img/verified_badge.png" />
          ) : (
            <Avatar src="/img/bandit.png" />
          )}
        </div>
        <p>RATING:{review.rating}</p>

        <p>{review.review}</p>
        <p>
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        </p>
      </div>
    );
  });
  const avgSentiment = (senti) => {
    if (senti < -3) {
      return "Very Negative";
    } else if (senti < -1) {
      return "Mostly Negative";
    } else if (senti < 1) {
      return "Neutral";
    } else if (senti < 3) {
      return "Mostly Positive";
    } else {
      return "Very Positive";
    }
  };
  return (
    <div className="product-review">
      <span>Product review</span>
      <p>AVERAGE RATING: {props.rating.avgRating}</p>
      <p>AVERAGE SENTIMENT: {avgSentiment(props.rating.avgSentiment)}</p>
      <br />
      <span for="enterPrdReview">Enter product review: </span>
      <input
        type="text"
        id="enterPrdReview"
        name="enterPrdReview"
        onChange={(event) => {
          changeReview(event.target.value);
        }}
      ></input>
      <br />
      <span> Rating (between 1 and 5):</span>
      <div style={{ display: "flex" }}>
        <label for="1">1</label>
        <input
          type="radio"
          id="1"
          name="revAnswer"
          value="1"
          onChange={(event) => {
            changeRating(event.target.value);
          }}
        />
        <label for="2">2</label>
        <input
          type="radio"
          id="2"
          name="revAnswer"
          value="2"
          onChange={(event) => {
            changeRating(event.target.value);
          }}
        />
        <label for="3">3</label>
        <input
          type="radio"
          id="3"
          name="revAnswer"
          value="3"
          onChange={(event) => {
            changeRating(event.target.value);
          }}
        />
        <label for="4">4</label>
        <input
          type="radio"
          id="4"
          name="revAnswer"
          value="4"
          onChange={(event) => {
            changeRating(event.target.value);
          }}
        />
        <label for="5">5</label>
        <input
          type="radio"
          id="5"
          name="revAnswer"
          value="5"
          onChange={(event) => {
            changeRating(event.target.value);
          }}
        />
      </div>

      <div>
        {props.user.firstName !== "" ? (
          <Button
            className={classes["cart-bt-headings"]}
            onClick={() => {
              addReview(
                props.product._id,
                props.product.name,
                rating,
                review
              ).then(() => {
                props.reload();
              });
            }}
          >
            {" "}
            Submit{" "}
          </Button>
        ) : (
          <div>
            <Button
              className={classes["cart-bt-headings"]}
              onClick={() => {
                addReviewUnknown(
                  props.product._id,
                  props.product.name,
                  rating,
                  review
                ).then(() => {
                  props.reload();
                });
              }}
            >
              Submit your review and rating
            </Button>
          </div>
        )}
      </div>
      {allreviews}
    </div>
  );
}

function PrdImg(props) {
  const [imgs, changeImgs] = useState({
    1: true,
    2: false,
  });
  return (
    <div className="left-column">
      <img src={imgs[1] ? props.imgs[1] : props.imgs[2]} alt="product" />
      <div style={{ textAlign: "center" }}>
        <input
          type="radio"
          name="image"
          style={{ margin: "3px" }}
          onClick={() => {
            changeImgs({ 1: true, 2: false });
          }}
        ></input>
        <input
          type="radio"
          name="image"
          style={{ margin: "3px" }}
          onClick={() => {
            changeImgs({ 1: false, 2: true });
          }}
        ></input>
      </div>
    </div>
  );
}

function SimProds(props) {
  const allSimProds = props.simProds.map((product) => {
    return (
      <div className="simprod-container">
        <Link className="simlink-text" to={"/product/" + product._id}>
          <div>
            <h5>{product.name.toUpperCase()}</h5>
            <img className="simprod-img" src={product.img} alt={product.name} />
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <h1>Similar Products</h1>
      <div style={{ display: "flex", alignContent: "center" }}>
        {allSimProds}
      </div>
    </div>
  );
}

function RecomProds(props) {
  const allRecomProds = props.recomProds.map((product) => {
    return (
      <div className="simprod-container">
        <Link className="simlink-text" to={"/product/" + product._id}>
          <div>
            <h5>{product.name.toUpperCase()}</h5>
            <img className="simprod-img" src={product.img} alt={product.name} />
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <h1>What other Gunslingers bought!</h1>
      <div style={{ display: "flex", alignContent: "center" }}>
        {allRecomProds}
      </div>
    </div>
  );
}

export default function Product(props) {
  const [reload, changeReload] = useState(false);

  function reloadComponent() {
    changeReload(true);
  }

  const [prodInfo, changeprodInfo] = useState({
    product: {
      _id: "",
      category: "",
      description: "",
      imgs: [],
      name: "",
      price: 0,
      properties: {
        colour: [],
        type_: "",
      },
      wishlistCounter: 0,
    },
    review: [],
    rating: {},
    simProds: [],
    recomProds: [],
  });
  const obj = useParams();

  useEffect(() => {
    getProduct(obj.productId).then((response) => {
      changeprodInfo(response);
      changeReload(false);
    });
  }, [obj.productId, reload]);

  const getRating = () => {
    if (prodInfo.rating.avgRating !== undefined) {
      return prodInfo.rating;
    } else {
      return { avgRating: 0, avgSentiment: 0 };
    }
  };

  return (
    <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Header user={props.user} />
      <Categories />
      <div className="containerproduct">
        <PrdImg imgs={prodInfo.product.imgs} />
        <div className="right-column">
          {/*Product Description */}
          <div className="product-description">
            <h1>{prodInfo.product.name}</h1>
            <p>{prodInfo.product.description}</p>
          </div>

          <div className="product-configuration">
            <h2>Type: {prodInfo.product.properties.type_}</h2>
            <h2>Colour: {prodInfo.product.properties.colour.join(", ")}</h2>
            <h2>Price: ${prodInfo.product.price}</h2>
            <p>
              Number of people who liked this product:{" "}
              {prodInfo.product.wishlistCounter}
            </p>
            <div className="product-price">
              {props.user.firstName ? (
                <Button
                  onClick={() => {
                    addToCart(prodInfo.product._id, 1).then((cartInfo) => {
                      props.updateCart(cartInfo);
                    });
                  }}
                >
                  Add to Gunslinger cart
                </Button>
              ) : (
                <Button disabled>Add to Cart</Button>
              )}
              {!checkForWishlistRedundancy(
                props.user.wishlist,
                prodInfo.product._id
              ) && props.user.firstName ? (
                <div>
                  <Button
                    onClick={() => {
                      addToWishlist(prodInfo.product._id).then(() => {
                        props.reload();
                        reloadComponent();
                      });
                    }}
                  >
                    Add to wishlist
                  </Button>
                </div>
              ) : (
                <Button disabled>Add to wishlist</Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <SimProds simProds={prodInfo.simProds} />
      <RecomProds recomProds={prodInfo.recomProds} />

      <Reviews
        user={props.user}
        review={prodInfo.review}
        rating={getRating()}
        product={prodInfo.product}
        reload={reloadComponent}
      />
    </div>
  );
}
