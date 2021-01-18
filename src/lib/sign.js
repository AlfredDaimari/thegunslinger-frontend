async function signUsingGoogle(response) {
  const id_token = response.getAuthResponse().id_token; // getting user sign in token and sending it to the backend
  await fetch("http://localhost/user/" + id_token + "/google", {
    method: "POST",
  });
}

async function signIn(email, password) {
  var res = await fetch("http://localhost/user/" + email + "/" + password, {
    method: "POST",
  });

  if (res.status === 200) {
    return true;
  }
  return false;
}

async function signUp(email, firstName, lastName, password) {
  var res = await fetch(
    "http://localhost/user/" +
      email +
      "/" +
      firstName +
      "/" +
      lastName +
      "/" +
      password,
    {
      method: "POST",
    }
  );
  if (res.status === 201) {
    return true;
  }
  return false;
}

async function signOut() {
  await fetch("http://localhost/user/out", {
    method: "POST",
    credentials: "same-origin",
  });
}

async function signOutAll() {
  await fetch("http://localhost/user/all", {
    method: "POST",
    credentials: "same-origin",
  });
}

export { signUsingGoogle, signIn, signOut, signOutAll, signUp };
