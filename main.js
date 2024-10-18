const form = document.getElementById("registration");
//127.0.0.1:3000/index.html
http: const username = form.elements["username"];
const email = form.elements["email"];
const password = form.elements["password"];
const repeatPassword = form.elements["passwordCheck"];

// Simple email validation.
// Using the event object's "returnValue" property,
// we can prevent form submission if the values are invalid.dd
function validateRegistration(evt) {
  evt.preventDefault();
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
    let regex =
      "^(?=.*[pP])(?=.*[aA])(?=.*[sS])(?=.*[sS])(?=.*[wW])(?=.*[oO])(?=.*[rR])(?=.*[dD])[a-zA-Z]{8}$";

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

  sessionStorage.setItem("username", username.value);
  sessionStorage.setItem("email", emailValidated);
  sessionStorage.setItem("password", passwordValidated);
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  validateRegistration();
});
