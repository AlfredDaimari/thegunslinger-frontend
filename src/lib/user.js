// file for various user fetch requests

async function addUserAddress(line1, line2, landmark, pincode, state) {
  await fetch(
    "http://localhost/user/" +
      line1 +
      "/" +
      line2 +
      "/" +
      landmark +
      "/" +
      pincode +
      "/" +
      state +
      "/address",
    {
      method: "PATCH",
      credentials: "same-origin",
    }
  );
}

async function checkUserToken() {
  var user = await fetch("http://localhost/user", {
    method: "POST",
  });
  if (user.status !== 401) {
    user = await user.json();
    return user;
  } else {
    return false;
  }
}

async function getUserInfo() {
  var user = await fetch("http://localhost/user", {
    method: "GET",
  });
  user = await user.json();
  return user;
}

async function getUserAddresses() {
  const { address } = await getUserInfo();
  return address;
}

async function deleteUserAddress(addressId) {
  await fetch("http://localhost/user/" + addressId + "/address", {
    method: "DELETE",
    credentials: "same-origin",
  });
  await getUserAddresses();
}

async function updateUser(email, firstName, lastName) {
  const response = await fetch(
    "http://localhost/user/" + email + "/" + firstName + "/" + lastName,
    {
      method: "PATCH",
      credentials: "same-origin",
    }
  );
  if (response.status === 400) {
    return false;
  } else {
    return true;
  }
}

async function updateUserPassword(password) {
  await fetch("http://localhost/user/" + password + "/ps", {
    method: "PATCH",
    credentials: "same-origin",
  });
}

export {
  addUserAddress,
  checkUserToken,
  getUserInfo,
  getUserAddresses,
  deleteUserAddress,
  updateUser,
  updateUserPassword,
};
