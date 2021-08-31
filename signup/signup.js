let signUpform = document.querySelector("#form");
signUpform.addEventListener("submit", (e) => {
  e.preventDefault();

  //user info
  let email = document.querySelector("#emailId").value;
  let userName = document.querySelector("#userNameId").value;
  let password = document.querySelector("#passwordId").value;
  let confirmPassword = document.querySelector("#ConfirmPasswordId").value;
  console.log(email, userName, password);

  if (!(password.trim() === confirmPassword.trim())) {
    alert("Password donot match");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((credentials) => {
      console.log(credentials.user);

      db.collection("users")
        .doc(credentials.user.uid)
        .set({
          email: email,
          name: userName,
          id: credentials.user.uid,
        })
        .then((response) => {
          location.assign("https://www.w3schools.com");
        });
    })
    .catch((error) => {
      alert(error.message);
    });
});
