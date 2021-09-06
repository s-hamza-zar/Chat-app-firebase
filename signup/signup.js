let signUpform = document.querySelector("#form");
let image;
let selectedfile;

let picture = document.querySelector("#customFile");
console.log("picture:", picture);

picture.addEventListener("change", (event) => {
  console.log(event);

  selectedfile = event.target.files[0];

  console.log("selectedfile:", selectedfile);
});

signUpform.addEventListener("submit", async (e) => {
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
  //creating reference and uploading image to storage//
  let filename = selectedfile.name;
  var storageRef = storage.ref("/images/" + filename);
  console.log("storagref:", storageRef);

  let url = "";

  try {
    var uploadTask = await storageRef.put(selectedfile);
    url = await uploadTask.ref.getDownloadURL();
  } catch (error) {
    alert(error);
    return;
  }
  auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
    console.log(credentials.user);

    db.collection("users")
      .doc(credentials.user.uid)
      .set({
        email: email,
        name: userName,
        id: credentials.user.uid,
        avatar: url,
      })
      .then((response) => {
        location.assign("http://google.com/");
      })
      .catch((error) => {
        alert(error.message);
      });
  });
});
