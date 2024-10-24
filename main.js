const form = document.getElementById("registration");
const username = form.elements["username"];
const email = form.elements["email"];
const password = form.elements["password"];
const repeatPassword = form.elements["passwordCheck"];

const login = document.getElementById("login");
const loginUsername = login.elements["username"];
const loginPassword = login.elements["password"];

function validateUsername() {
  if (sessionStorage.getItem(`user-${username.value}`)) {
    alert(`username ${username.value} already taken`);
    username.focus();
    return false;
  }
  return username.value;
}

function validateEmail() {
  let emailVal = email.value;
  const atpos = emailVal.indexOf("@");
  const dotpos = emailVal.lastIndexOf(".");

  if (atpos < 1) {
    alert(
      "Your email must include an @ symbol, which must not be at the beginning of the email."
    );
    email.focus();
    return false;
  }

  if (dotpos - atpos < 2) {
    alert(
      "Invalid structure: @.\nYou must include a domain name after the @ symbol."
    );
    email.focus();
    return false;
  }

  if (
    emailVal.includes("@example.com") &&
    emailVal.indexOf("@example.com") === emailVal.lastIndexOf("@example.com")
  ) {
    console.log(emailVal);
    console.log(emailVal.indexOf("@example.com"));
    alert("example.com is not a valid domain name");
    email.focus();
    return false;
  }

  return emailVal;
}

function validatePassword() {
  let usernameVal = username.value;
  let passwordVal = password.value;
  let passwordVerify = repeatPassword.value;
  let regex = /^(?=.*[pP])(?=.*[aA])(?=.*[sS])(?=.*[sS])(?=.*[wW])(?=.*[oO])(?=.*[rR])(?=.*[dD])[a-zA-Z]{8}$/;

  if (passwordVal !== passwordVerify) {
    alert("The passwords do not match");
    repeatPassword.focus();
    return false;
  } else if (passwordVal.includes(usernameVal)) {
    alert("The password cannot contain the username");
    password.focus();
    return false;
  } else if (regex.test(passwordVal)) {
    alert("you cannot use the word 'password' in your password");
    password.focus();
    return false;
  }

  return passwordVal;
}

// This event handler deals with the account registration
form.addEventListener("submit", (e) => {
  e.preventDefault();

  usernameValidated = validateUsername();
  emailValidated = validateEmail();
  passwordValidated = validatePassword();

  if (usernameValidated && emailValidated && passwordValidated) {
    let usernameInStorage = sessionStorage.getItem(usernameValidated);
    if (usernameInStorage == true) {
      alert("Username already taken");
      username.focus();
    } else {
      storageUsername = `user-${username.value}`;
      storageEmail = `email-${username.value}`;
      storagePassword = `password-${username.value}`;
      sessionStorage.setItem(storageUsername, username.value);
      sessionStorage.setItem(storageEmail, email.value);
      sessionStorage.setItem(storagePassword, password.value);

      form.reset();
      alert("You have successfully created an account");
    }
  }
});

function validateLogin(evt) {
  evt.preventDefault();

  const loginPasswordVal = loginPassword.value;
  const loginUsernameVal = loginUsername.value;

  function validateLoginUsername() {
    const storageLoginUsername = `user-${loginUsernameVal}`.toLowerCase();
    if (!(loginUsernameVal == sessionStorage.getItem(storageLoginUsername))) {
      alert("No account found with the provided username");
      loginUsername.focus();
      return false;
    }
    return loginUsernameVal;
  }

  function validateLoginPassword() {
    storageLoginPassword = `password-${loginUsernameVal}`;
    if (!(loginPasswordVal == sessionStorage.getItem(storageLoginPassword))) {
      console.log(loginPasswordVal + " " + sessionStorage.getItem["password"]);
      alert("Incorrect password");
      loginPassword.focus();
      return false;
    }
    return loginPasswordVal;
  }

  let loginUsernameValidated = validateLoginUsername();
  if (loginUsernameValidated === false) {
    evt.returnValue = false;
    return false;
  }

  let loginPasswordValidated = validateLoginPassword();
  if (loginPasswordValidated === false) {
    evt.returnValue = false;
    return false;
  }

  if (document.querySelector("#login > div > input:first-child").checked) {
    alert("login successful, you will remain logged in to the account");
  } else {
    alert("login successful");
  }
  login.reset();
}

login.addEventListener("submit", validateLogin);
