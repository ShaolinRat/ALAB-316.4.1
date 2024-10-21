const form = document.getElementById("registration");
//127.0.0.1:3000/index.html
const username = form.elements["username"];
const email = form.elements["email"];
const password = form.elements["password"];
const repeatPassword = form.elements["passwordCheck"];

const login = document.getElementById("login");
const loginUsername = login.elements["username"];
const loginPassword = login.elements["password"];

// Simple email validation.
// Using the event object's "returnValue" property,
// we can prevent form submission if the values are invalid.
function validateRegistration(evt) {
  evt.preventDefault();

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

  const usernameValidated = validateUsername();
  if (usernameValidated === false) {
    evt.returnValue === false;
    return false;
  }

  const emailValidated = validateEmail();
  if (emailValidated === false) {
    evt.returnValue = false;
    return false;
  }

  const passwordValidated = validatePassword();
  if (passwordValidated === false) {
    evt.returnValue = false;
    return false;
  }
  storageUsername = `user-${username.value}`;
  storageEmail = `email-${username.value}`;
  storagePassword = `password-${username.value}`;
  sessionStorage.setItem(storageUsername, username.value);
  sessionStorage.setItem(storageEmail, email.value);
  sessionStorage.setItem(storagePassword, password.value);

  form.reset();
  alert("You have successfully created an account");
}

form.addEventListener("submit", validateRegistration);

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
