// will contain http requests, and functions for updating the cart
import { checkForWishlistRedundancy, addToWishlist } from "./wishlist";

async function getCart() {
  var cartInfo = await fetch("http://localhost/cart", {
    method: "GET",
    credentials: "same-origin",
  });
  cartInfo = await cartInfo.json();
  return cartInfo;
}

async function addToCart(productId, quantity, updateCart) {
  await fetch("http://localhost/cart/" + productId + "/" + quantity, {
    method: "PATCH",
    credentials: "same-origin",
  });

  return await getCart();
}

async function deleteFromCart(productId, quantity, updateCart) {
  await fetch("http://localhost/cart/" + productId + "/" + quantity, {
    method: "DELETE",
    credentials: "same-origin",
  });
  return await getCart();
}

async function addToWishlistAndDeleteFromCart(productId, quantity, wishlist) {
  const bool = checkForWishlistRedundancy(wishlist, productId);
  if (!bool) {
    await addToWishlist(productId);
  }
  return await deleteFromCart(productId, quantity);
}

function calcTotalPrice(cart) {
  var totalPrice = 0;
  cart.forEach((item) => {
    totalPrice = item.totalPrice + totalPrice;
  });
  return totalPrice;
}

function calcTotalProdAmt(cart) {
  var totalProducts = 0;
  cart.forEach((item) => {
    totalProducts = totalProducts + item.quantity;
  });
  return totalProducts;
}

export {
  addToCart,
  addToWishlistAndDeleteFromCart,
  deleteFromCart,
  calcTotalPrice,
  calcTotalProdAmt,
};
