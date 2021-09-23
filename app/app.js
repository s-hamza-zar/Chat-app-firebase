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
let htmldiv=``

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
    if(defultUser.id.charAt(0)>loginUserId.charAt(0)){

    selectedChat = defultUser.id + loginUserId;
    }
    else{
      selectedChat =loginUserId + defultUser.id;
    }
    console.log(">>>>>",selectedChat)
    filtersUsers.forEach((doc) => {
      allUsers.push(doc.data());
      renderUsers(doc);
      
    });
    setCurrentUser(defultUser.id)
    displayChat()
  });

function renderUsers(doc) {

  let table = ``;
  table = `
   <tr class="inner-drawer" onclick="chatPerson('${doc.data().id}')">
   <td><img class="imgBx" src="${doc.data().avatar}"></td>
   <td class="inner-profile"><h4>${doc.data().name.toUpperCase()}</h4><p>${
    doc.data().shortBio
  }</p></td>
   <td class="inner-date"><i class="fa fa-user-circle" aria-hidden="true"></i></td>
 </tr>`;

  document.querySelector("#table-body").innerHTML += table;
}
function chatPerson(currentSenderId) {
  setCurrentUser(currentSenderId)
  console.log("reciver",currentSenderId)
  if(currentSenderId.charAt(0)>loginUserId.charAt(0)){
    selectedChat = currentSenderId + loginUserId;
  }
  else{
    selectedChat =  loginUserId +currentSenderId;
  }
  
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
      date: Date.now()
  })
  message.value=""
});

function  displayChat (){
  console.log("help")
  db.collection("chats").doc(selectedChat).collection("messages").orderBy('date').onSnapshot((change=>{
    console.log("lllllll",change)
    change.forEach((doc)=>{
      console.log(doc.data())
      let position;
      if(doc.data().sender.id==loginUserData.id)
      {    console.log("sender")
           position='d-flex justify-content-end mb-4'
           htmldiv+= `
           <div class="${position}">
           </div>
           <div class="${position}">
               <div class="img_cont">
                   <img src="${doc.data().sender.avatar}" class="rounded-circle user_img_msg">
               </div>
               <div class="msg_cotainer" style="background:#EAF3FF;">
               <h6>${doc.data().userMessage}</h6>   
              
               </div>     
           </div>`;
      
           document.getElementById('chat').innerHTML= htmldiv
      }
      else if(doc.data().reciver.id=personToChat.id){
        position='d-flex justify-content-start mb-4'
        console.log("reciver")
        htmldiv+= `
           <div class="${position} style="margin-left:10px;">
               <div class="img_cont">
                   <img src="${doc.data().sender.avatar}" class="rounded-circle user_img_msg">
               </div>
               <div class="msg_cotainer" style="background: #F9F9F9;">
               <h6>${doc.data().userMessage}</h6>
                   
               </div>     
           </div>`;
      
           document.getElementById('chat').innerHTML= htmldiv
      }
     
    })
  }))


}

