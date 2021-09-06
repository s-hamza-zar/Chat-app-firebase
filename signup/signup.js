let signUpform = document.querySelector("#form");
let image;
let selectedfile;

let picture=document.querySelector("#customFile")
  console.log("picture:",picture)

  picture.addEventListener("change",(event)=>{

    console.log(event)
    
    selectedfile=event.target.files[0];
    
    console.log("selectedfile:",selectedfile)
    })

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
  //creating reference and uploading image to storage//
  let filename=selectedfile.name;
  var storageRef = storage.ref("/images/"+filename);
  console.log("storagref:",storageRef)
  var uploadTask=storageRef.put(selectedfile);
  console.log("upload:",uploadTask)

  //getting url from firebase storage//
  uploadTask.on('state_changed', 
  (snapshot) =>{
  snapshot.ref.getDownloadURL()
  .then((downloadURL) => {
    console.log('File available at', downloadURL);
    image=downloadURL
  //auth user and creating db//  
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
          avatar:image
          
        })
        .then((response) => {
          location.assign("http://google.com/");
        });
    })
    .catch((error) => {
      alert(error.message);
    });
  });
  });

});
