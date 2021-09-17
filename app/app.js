let profile = ``;
let loginUserId;
let selectedChat;
let filtersUsers;
let defultUser;
let reciverId;
let loginUserData;
let reciverUsers = [];
let reciverData;
let i = 0;
let allUsers = [];
let personToChat;
auth.onAuthStateChanged((user) => {
  loginUserId = user.uid;

  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        loginUserData = snapshot.data();
        profile = `
        <span class="profile-details"><img src="${
          loginUserData.avatar
        }" alt="" class="profile-img">
        <span class="profile-content">
          <h3>${loginUserData.name.toUpperCase()}</h3>
          <p>${loginUserData.shortBio}</p>
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
    filtersUsers = snapshot.docs.filter((details) => {
      return details.id != loginUserId;
    });
    defultUser = filtersUsers[0];
    console.log("defulatuser", defultUser.id);
    selectedChat = defultUser.id + loginUserId;
    filtersUsers.forEach((doc) => {
      allUsers.push(doc.data());
      renderUsers(doc);
    });
    setCurrentUser(defultUser.id)

  });

function renderUsers(doc) {

  let table = ``;
  table = `
   <tr class="inner-drawer" onclick="chatPerson('${doc.data().id}')">
   <td><img class="imgBx" src="${doc.data().avatar}"></td>
   <td class="inner-profile"><h4>${doc.data().name.toUpperCase()}</h4><p>${
    doc.data().shortBio
  }</p></td>
   <td class="inner-date">Date<br><i class="fa fa-check-circle" aria-hidden="true"></i></td>
 </tr>`;

  document.querySelector("#table-body").innerHTML += table;
}
function chatPerson(currentSenderId) {
  setCurrentUser(currentSenderId)
  console.log("reciver",currentSenderId)
  selectedChat = currentSenderId + loginUserId;
}

function setCurrentUser(currentSenderId){
  personToChat=allUsers.find((item)=>item.id===currentSenderId)
  let topBar=``
  topBar=`
  <img src="${personToChat.avatar}" alt="" />
  <h4>${personToChat.name.toUpperCase()}</h4>
  <i class="fa fa-circle" aria-hidden="true"></i>
  `
  document.querySelector(".top-bar").innerHTML = topBar;
}


let messageSubmit = document.querySelector("#form");
let message = document.querySelector("#message");
messageSubmit.addEventListener("submit", (e) => {
  e.preventDefault();


  
 db.collection("chats").doc(selectedChat).collection("messages").doc().set({
      userMessage: message.value,
      sender: loginUserData,
      reciver: personToChat,
      date: new Date()
  })
  message.value=""
});
