// will contain logic for handling wishlist

function checkForWishlistRedundancy(wishlist, productId) {
  const index = wishlist.findIndex((item) => item._id === productId);
  if (index === -1) {
    return false;
  } else {
    return true;
  }
}

async function addToWishlist(productId) {
  await fetch("http://localhost/user/" + productId, {
    credentials: "same-origin",
    method: "PATCH",
  });
}

async function deleteFromWishlist(productId) {
  await fetch("http://localhost/user/" + productId, {
    credentials: "same-origin",
    method: "DELETE",
  });
}

export { checkForWishlistRedundancy, addToWishlist, deleteFromWishlist };
