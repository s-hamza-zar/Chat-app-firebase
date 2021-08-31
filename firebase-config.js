const firebaseConfig = {
  apiKey: "AIzaSyAeeo-Y58JbtyiWlG28ms_-T0z8TMrQpng",
  authDomain: "chat-app-a2d39.firebaseapp.com",
  projectId: "chat-app-a2d39",
  storageBucket: "chat-app-a2d39.appspot.com",
  messagingSenderId: "733188901312",
  appId: "1:733188901312:web:7334fd5181c763cec6e025"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)    
var db = app.firestore();
var auth = app.auth();