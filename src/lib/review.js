// file for adding a review
async function addReview(productId, productName, rating, review) {
  await fetch(
    "http://localhost/review/" +
      productId +
      "/" +
      productName +
      "/" +
      rating +
      "/" +
      review,
    {
      method: "POST",
      credentials: "same-origin",
    }
  );
}

async function addReviewUnknown(productId, productName, rating, review) {
  await fetch(
    "http://localhost/review/" +
      productId +
      "/" +
      productName +
      "/" +
      rating +
      "/" +
      review +
      "/unknown",
    {
      method: "POST",
    }
  );
}

export { addReview, addReviewUnknown };
