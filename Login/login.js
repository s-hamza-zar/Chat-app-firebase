var form = document.querySelector("#form");

form.addEventListener("submit", (e)=>{
  e.preventDefault();

let email = document.querySelector("#emailId").value;
let password = document.querySelector("#passwordId").value;


auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    location.assign("https://github.com/")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


});
