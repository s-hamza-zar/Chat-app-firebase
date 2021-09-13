let profile = ``;
let userId;
let selectedChat;
let filtersUsers;
let defultUser;

auth.onAuthStateChanged((user) => {
  userId = user.uid;
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        var userData = snapshot.data();
        profile = `
        <span class="profile-details"><img src="${
          userData.avatar
        }" alt="" class="profile-img">
        <span class="profile-content">
          <h3>${userData.name.toUpperCase()}</h3>
          <p>${userData.shortBio}</p>
         </span>
              </span>
    <span class="setting-tray-right float-right"><i class="fa fa-pencil" aria-hidden="true"></i></span>`;
        document.querySelector(".settings-tray").innerHTML = profile;
      });
  } else {
    location.href = "../auth-screens/login/login.html";
  }
});

db.collection("users")
  .get()
  .then((snapshot) => {
    filtersUsers=snapshot.docs.filter((details) =>{
        return details.id!=userId
        })
         defultUser=filtersUsers[0].id
         selectedChat=defultUser+userId
         console.log("defult",selectedChat)
         filtersUsers.forEach((doc) => {
         renderUsers(doc);
    });

  });

function renderUsers(doc) {
  let currentId = doc.data().id;
  let table = ``;
  table = `
   <tr class="inner-drawer" onclick="chatPerson('${currentId}')">
   <td><img class="imgBx" src="${doc.data().avatar}"></td>
   <td class="inner-profile"><h4>${doc.data().name.toUpperCase()}</h4><p>${
    doc.data().shortBio
  }</p></td>
   <td class="inner-date">Date<br><i class="fa fa-check-circle" aria-hidden="true"></i></td>
 </tr>`;

  document.querySelector("#table-body").innerHTML += table;
  //   let innerDrawer=document.querySelector(".inner-drawer")
  // innerDrawer.addEventListener("onclick",(response)=>{
  //        console.log(response)
  // })
}
function chatPerson(currentId) {
  selectedChat = currentId + userId;
}

let messageSubmit = document.querySelector("#form");
let message = document.querySelector("#message");

messageSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
//   console.log(message);
//   console.log(message.value)

  db.collection("chats").doc(selectedChat).set({
      userMessage: message.value,

  })
});



