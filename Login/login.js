var form = document.querySelector("#form");

form.addEventListener("submit", (e)=>{
  e.preventDefault();

let email = document.querySelector("#emailId").value;
let password = document.querySelector("#passwordId").value;


auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    location.assign("file:///C:/Users/d/Desktop/Chat%20app/app/Index.html")
    // ...
  })
  .catch((error) => {
      console.log("--->",error)
    
  });


});
