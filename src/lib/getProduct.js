export default async function getProduct(productId) {
  var prdInfo = await fetch("http://localhost/products/" + productId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  prdInfo = await prdInfo.json();

  return prdInfo;
}
