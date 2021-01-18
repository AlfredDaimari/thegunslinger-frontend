// file for order fetch requests

async function createOrder(selectedAddressIndex, paymentMethod) {
  await fetch(
    "http://localhost/order/" + selectedAddressIndex + "/" + paymentMethod,
    {
      method: "POST",
      credentials: "same-origin",
    }
  );
}

async function deleteOrder(orderId) {
  await fetch("http://localhost/order/" + orderId, {
    method: "DELETE",
    credentials: "same-origin",
  });
}

export { createOrder, deleteOrder };
