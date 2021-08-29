var db = firebase.firestore();

//for session on bottom

let signup = (e) => {
    console.log('event:', e)
    e.preventDefault()

    const username = document.getElementById('username').value
    const email = document.getElementById('inputEmail').value
    const password = document.getElementById('inputPassword').value

    const userData = {
        email,
        password,
        username
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        // ...

        var usersData = db.collection("user");

        usersData.doc(userCredential.user.uid).set({
          username: username, 
          email: email,
          uid: userCredential.user.uid
        });
        swal({
            title: "AWESOME!",
            text: "You have successfully created an account!",
            icon: "success",
        }).then((value) => {
            location.href = '../../dashboard/dashboard.html'
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal(`ERROR`, errorMessage, "error");
        // ..
      });
}

//for session
const user = firebase.auth().currentUser;
if (user !== null) {
  location.href = '../../dashboard/dashboard.html'
}