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
          // location.assign("https://www.w3schools.com");
          console.log("hamza")
        });
    })
    .catch((error) => {
      alert(error.message);
    });
    
  let selectedfile;
  let picture=document.querySelector("#customFile")
  console.log("picture:",picture)

  picture.addEventListener("change",(event)=>{

    console.log(event)
    
    selectedfile=event.target.files[0];
    
    console.log("selectedfile:",selectedfile)
    
    
    })
  var storageRef = storage.ref("/images/")
  console.log("storagref:",storageRef)
  var uploadTask=storageRef.put(selectedfile);
  console.log("upload:",uploadTask)

});
